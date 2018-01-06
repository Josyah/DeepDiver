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
import {Sprite, Loop} from 'react-game-kit/native';
import {getOpacity} from '../../utils/getOpacity';
import {ifBetween} from '../../utils/ifBetween';
@observer
class Enemy extends Component {
  constructor(props){
    super(props)
    store = this.props.store
    enemy = this.props.position
    this.state = {
      opacity: getOpacity(this.props.store.enemies[this.props.index].distanceAway),
    }
  }
  componentWillUnmount(){
  }

  componentDidMount(){
    this.props.store.enemies[this.props.index].mounted = true
  }
  getPosition() {
    if(this.props.store.enemies[this.props.index].mounted){
      return {
        position: 'absolute',
        left: this.props.store.enemies[this.props.index].position.x,
        bottom: this.props.store.enemies[this.props.index].position.y,
        opacity: this.props.store.enemies[this.props.index].opacity,
        width: this.props.store.enemies[this.props.index].dimensions.width,
        height: this.props.store.enemies[this.props.index].dimensions.height,
        transform: [
          {translateY: this.props.store.background.position.y},
          {rotate: (-this.props.store.enemies[this.props.index].angle+'deg') },
          {scaleX: ((this.props.store.enemies[this.props.index].widthInMeters*GLOBALS.pixelsInAMeter)/(this.props.store.enemies[this.props.index].dimensions.width))},
          {scaleY: ((this.props.store.enemies[this.props.index].widthInMeters*GLOBALS.pixelsInAMeter)/(this.props.store.enemies[this.props.index].dimensions.width))}
        ],
      }
    }

}

  getState(){
    if(this.props.store.enemies[this.props.index].mounted){
      this.props.store.enemies[this.props.index].loaded = true
      if(this.props.store.enemies[this.props.index].health <= 0){
        return 1
      } else {
        return 0
      }
    }
  }
  render() {
    return (
      <Loop>

        <Sprite
          repeat={this.props.store.enemies[this.props.index].mounted}
          src={this.props.store.enemies[this.props.index].src}
          tileHeight={this.props.store.enemies[this.props.index].dimensions.height}
          tileWidth={this.props.store.enemies[this.props.index].dimensions.width}
          steps={this.props.store.enemies[this.props.index].steps}
          state={0}
          scale={1}
          offset={[0, 0]}
          ticksPerFrame={5}
          style={this.getPosition()}
          />
      </Loop>
    );
  }
}

module.exports = Enemy;
