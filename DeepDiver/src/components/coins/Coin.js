import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {observer} from 'mobx-react/native';
import {GLOBALS} from '../../globals';
import PropTypes from 'prop-types';
import Matter from 'matter-js'
import {Sprite} from 'react-game-kit/native';
import {getOpacity} from '../../utils/getOpacity'
@observer
class Coin extends Component {
  constructor(props){
    super(props)
    store = this.props.store
    this.state = {
      index: this.props.index,
      mounted: false
    }
  }
  getPosition() {
    if(this.state.mounted){
      return {
        position: 'absolute',
        left: this.props.position.x*GLOBALS.coins.multiplier,
        bottom: this.props.position.y*GLOBALS.coins.multiplier,
        opacity: this.state.opacity,
        height: GLOBALS.coins.height,
        width: GLOBALS.coins.width,
      }
    }
  }
  componentWillUnmount(){
    this.setState({mounted: false})
  }

  componentDidMount(){
    this.setState({mounted: true})
  }
  render() {
    return (
      <Image
        source={require('../../images/Coin.png')}
        style={this.getPosition()}
        />
    );
  }
}

module.exports = Coin;
