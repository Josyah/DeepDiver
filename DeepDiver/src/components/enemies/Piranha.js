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
class Piranha extends Component {
  constructor(props){
    super(props)
    store = this.props.store
    enemy = this.props.position
    this.state = {
      index: this.props.index,
      collided: enemy.collided,
      opacity: getOpacity(this.props.distanceAway)
    }
  }
  getPosition() {
    // console.log('POSs',this.props.position.x)
      return {
        left: enemy.x,
        bottom: enemy.y,
        opacity: this.state.opacity,
        transform: [
          {translateY: this.props.store.background.position.y},
        ],
        backgroundColor: this.state.collided ? 'red' : 'transparent'
      }

      //.1 to 1
  }
  render() {
    return (
      <Sprite
        repeat={this.props.store.paused ? true : false}
        src={require('../../images/PiranaCropped.png')}
        tileHeight={GLOBALS.Piranha.tileHeight}
        tileWidth={GLOBALS.Piranha.tileWidth}
        steps={GLOBALS.Piranha.steps}
        state={0}
        scale={1}
        offset={[0, 0]}
        ticksPerFrame={10}
        style={this.getPosition()}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = Piranha;
