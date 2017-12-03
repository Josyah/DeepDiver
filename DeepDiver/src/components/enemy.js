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
  getPosition() {
    return {
      left: this.props.position.left,
      top: this.props.position.top,
      transform: [
        {translateX: this.props.store.background.position.x},
        {translateY: -this.props.store.background.position.y}
      ]
    }
  }
//   static contextTypes = {
//     loop: PropTypes.object,
//   };
//
//   update = () => {
//     // this.props.store.enemy.position.x = this.props.bottom + this.props.store.background.position.x
//     // this.props.store.enemy.position.y = this.props.bottom + this.props.store.background.position.y
// }
//   componentDidMount() {
//     this.context.loop.subscribe(this.update);
//   }
//
//   componentWillUnmount() {
//     this.context.loop.unsubscribe(this.update);
//   }
  render() {
    return (
        <View style={[this.getPosition(), styles.container]}>
          <Text>
            Enemy
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
    backgroundColor: 'white'
  },
});

module.exports = Enemy;
