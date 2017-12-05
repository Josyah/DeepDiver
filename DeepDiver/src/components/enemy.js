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
    this.x = 0
    this.y = 0
  }
  getPosition() {
    return {
      left: this.x,
      top: this.y,
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
    Matter.Body.translate(this.enemy.body,
      {
        x: this.props.store.background.position.x,
        y: -this.props.store.background.position.y
      }

    )
    this.x = this.enemy.body.position.x
    this.y = this.enemy.body.position.y
}
  componentDidMount() {
    this.context.loop.subscribe(this.update);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }
  render() {
    return (
      <Body
        shape="rectangle"
        args={[this.props.position.left, this.props.position.top, 75, 75]}
        isStatic={true}
        ref={(b) => { this.enemy = b; }}
        >
        <View style={[this.getPosition(), styles.container]}>
          <Text>
            Enemy
          </Text>
        </View>
      </Body>
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
