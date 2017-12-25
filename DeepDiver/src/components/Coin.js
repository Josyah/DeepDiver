import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {observer} from 'mobx-react/native';
import {GLOBALS} from '../globals';
import PropTypes from 'prop-types';
import Matter from 'matter-js'
import {Sprite} from 'react-game-kit/native';
import {getOpacity} from '../utils/getOpacity'
@observer
class Coin extends Component {
  constructor(props){
    super(props)
    store = this.props.store
    this.state = {
      index: this.props.index,
    }
  }
  getPosition() {
    return {
      position: 'absolute',
      left: this.props.store.coinArray[this.props.index].x*GLOBALS.coins.multiplier,
      bottom: this.props.store.coinArray[this.props.index].y*GLOBALS.coins.multiplier,
      opacity: this.state.opacity,
      height: GLOBALS.coins.height,
      width: GLOBALS.coins.width,
    }
  }
  render() {
    return (
      <Image
        source={require('../images/Coin.png')}
        style={this.getPosition()}
        />
    );
  }
}

module.exports = Coin;
