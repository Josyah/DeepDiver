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
import CommanderTurtle from './players/CommanderTurtle';
import Aquaria from './players/Aquaria';
import Matter from 'matter-js';
import {topToBottom} from '../utils/converter'
import {GLOBALS} from '../globals'
@observer
class Player extends Component {
  render() {
    {
      console.log('Type'+this.props.store.player.type)
      switch(this.props.store.player.type){
        case 'SEA_LORD':
          return (
            <SeaLord
              store={this.props.store}
              />
          )
        case 'COMMANDER_TURTLE':
          return (
            <CommanderTurtle
              store={this.props.store}
              />
          )
        default:
          return (
            <SeaLord
              store={this.props.store}
              />
          )
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {

  },
});

module.exports = Player;
