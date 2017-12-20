import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {observer} from 'mobx-react/native';
import { Body , Sprite} from 'react-game-kit/native';
import SeaLord from './players/SeaLord';
import Aquaria from './players/Aquaria';
import Matter from 'matter-js';
import {topToBottom} from '../utils/converter'
import {GLOBALS} from '../globals'
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
  componentWillUnmount(){
    this.props.store.player.repeat = false
  }
  componentWillMount(){
    this.props.store.player.repeat = true
  }
  render() {
    return (
      <SeaLord
        store={this.props.store}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: GLOBALS.playerHeightInMeters * GLOBALS.pixelsInAMeter,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: 'white'
  },
});

module.exports = Player;
