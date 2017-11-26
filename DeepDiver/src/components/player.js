import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {observer} from 'mobx-react/native';
import { Body } from 'react-game-kit/native';
import Matter from 'matter-js';
@observer
class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gravity: 1,
      playerPosition: {
        x: 0,
        y: 0,
      },
      playerAngle: 0,
    };
  }


  getPlayerStyles() {
    return {
      height: 75,
      width: 75,
      position: 'absolute',
      top: 0,
      left: 50,
      transform: [
        { translateX: this.props.store.player.position.x },
        { translateY: this.props.store.player.position.y },
      ],
    };
  }
  render() {
    return (
      <View style={[this.getPlayerStyles(), styles.container]}>
        <Text>Player</Text>
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
    borderColor: 'blue',
  },
});

module.exports = Player;
