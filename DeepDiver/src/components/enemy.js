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
      index: this.props.index,
      doneLoading: false
    }
  }
  getPosition() {
    // console.log('POSs',this.props.position.x)
      return {
        left: this.props.store.enemies[this.props.index].position.x,
        bottom: this.props.store.enemies[this.props.index].position.y,
        height: this.props.store.enemies[this.props.index].dimensions.height,
        width: this.props.store.enemies[this.props.index].dimensions.width,
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
    // var bodyX = this.props.left + this.props.store.background.position.x
    // var bodyY = -this.props.store.background.position.y


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
            Fish
          </Text>
        </View>
      );
    }

}

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'red',
    position: 'absolute',
    backgroundColor: 'red',
    zIndex: 4
  },
});

module.exports = Enemy;
