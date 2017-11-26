import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {observer} from 'mobx-react/native';
import { Body } from 'react-game-kit/native';
import Matter from 'matter-js';

class Player extends Component {
  render() {
    return (
        <Body
          shape="rectangle"
          args={[0,0, 50, 75]}
          frictionStatic={0}
          friction={1}
          restitution={0}
          frictionAir={0.01}
          mass={50}
          ref={(b) => { this.body = b; }}
        >
          <View style={[styles.container]}>
            <Text>Player</Text>
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
    borderColor: 'blue',
  },
});

module.exports = Player;
