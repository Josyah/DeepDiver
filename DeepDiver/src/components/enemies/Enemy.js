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
    this.enemy = this.props.store.enemies.find((eachEnemy) => {
      return (eachEnemy.uniqueIdentifier == this.props.uniqueIdentifier)
    })
    this.state = {
      opacity: getOpacity(this.enemy.distanceAway),
    }
  }
  componentWillUnmount(){
  }

  componentDidMount(){
    this.enemy.mounted = true;
  }
  getPosition() {
    if(this.enemy.mounted){
      return {
        position: 'absolute',
        left: this.enemy.position.x,
        bottom: this.enemy.position.y,
        opacity: this.enemy.opacity,
        width: this.enemy.dimensions.width,
        height: this.enemy.dimensions.height,
        transform: [
          {translateY: this.props.store.background.position.y},
          {rotate: (-this.enemy.angle+'deg') },
          {scaleX: ((this.enemy.widthInMeters*GLOBALS.pixelsInAMeter)/(this.enemy.dimensions.width))},
          {scaleY: ((this.enemy.widthInMeters*GLOBALS.pixelsInAMeter)/(this.enemy.dimensions.width))}
        ],
      }
    }

}

  getState(){
    if(this.enemy.mounted){
      this.enemy.loaded = true
      if(this.enemy.health <= 0){
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
          repeat={this.enemy.mounted}
          src={this.enemy.src}
          tileHeight={this.enemy.dimensions.height}
          tileWidth={this.enemy.dimensions.width}
          steps={this.enemy.steps}
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
