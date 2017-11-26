import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {observer} from 'mobx-react/native';
import {Body} from 'react-game-kit/native';
import {GLOBALS} from '../globals';
@observer
class Enemy extends Component {
  getPosition() {
    // this.posLeft = this.props.store.backgroundPosition - this.props.index;
    // console.log(this.props.index)
    // console.log(this.props.position.bottom)
    this.props.store.background.position.x+this.props.position.left;
    this.props.store.background.position.y-this.props.position.bottom
    return {
      left: this.props.store.background.position.x,
      bottom: this.props.store.background.position.y,
      transform: [
        {
          translateX: this.props.position.left
        },
        {
          translateY: -this.props.position.bottom
        }
      ]
    }
  }
  render() {
    return (
      <Body
        shape="rectangle"
        args={[
          this.props.store.background.position.x-this.props.position.left,
          this.props.store.background.position.y,
          100,
          100
        ]}
        friction={0}
        frictionStatic={0}
        restitution={0}
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
  },
});

module.exports = Enemy;
