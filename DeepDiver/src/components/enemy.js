import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {observer} from 'mobx-react/native';
import {Body} from 'react-game-kit/native';
import {GLOBALS} from '../globals';
import PropTypes from 'prop-types';
import Matter from 'matter-js'
@observer
class Enemy extends Component {
  constructor(props){
    super(props)
    this.state = {
      x: 0,
      y: 0,
      index: this.props.index,
      doneLoading: false
    }
  }
  getPosition() {

      return {
        left: this.state.doneLoading ? this.props.store.enemies[this.props.index].x : 0,
        top: this.state.doneLoading ? this.props.store.enemies[this.props.index].y : 0,
      }

  }
  static contextTypes = {
    loop: PropTypes.object,
  };
  update = () => {
    // this.props.store.enemy.position.x = this.props.bottom + this.props.store.background.position.x
    // this.props.store.enemy.position.y = this.props.bottom + this.props.store.background.position.y
    // this.props.store.enemies.length = this.props.index+1;
    // this.props.store.enemies[this.props.index] = this.enemy.body.position;
    var bodyX = this.props.left + this.props.store.background.position.x
    var bodyY = -this.props.store.background.position.y
    var trying = false;
      trying = true
      while(trying){
        try{
          if(this.props.store.enemies.length != 0){
            // console.log('there')
            this.props.store.enemies[this.props.index].x -= 4
            this.props.store.enemies[this.props.index].y = (this.props.store.background.position.y)
          } else{
            // console.log('not there')
            this.props.store.enemies.push({
              x: this.props.position.left,
              y: this.props.position.top
            })
            console.log(this.props.store.enemies[this.props.index].x)
            this.setState({
              doneLoading: true
            })
          }
          trying = false
        } catch(e) {
          trying = true
        }
      }

}
  componentDidMount() {
    this.context.loop.subscribe(this.update);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }
  render() {
      return (
        <View style={[this.getPosition(), styles.container]}>
          <Text>
            Enemyy
          </Text>
        </View>
      );
    }

}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'red',
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 1
  },
});

module.exports = Enemy;
