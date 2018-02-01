import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {observer} from 'mobx-react/native';
import { Body , Sprite} from 'react-game-kit/native';
import SeaLord from './SeaLord';
import Matter from 'matter-js';
import {topToBottom} from '../../utils/converter'
import {GLOBALS} from '../../globals'
@observer
class Player extends Component {
  constructor(props){
    super(props);
    store = this.props.store;
  }
  render() {
    {
      switch(GLOBALS.player.type){
        case 'SEA_LORD':
          return (
            <SeaLord
              store={store}
              />
          )
        default:
          return (
            <SeaLord
              store={store}
              />
          )
      }
    }
  }
}

module.exports = Player;
