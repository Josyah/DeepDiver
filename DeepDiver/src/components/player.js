import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {observer} from 'mobx-react/native';
import { Body , Sprite} from 'react-game-kit/native';
import Matter from 'matter-js';
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


  getPlayerStyles() {
    var angle = this.props.store.player.angle;
    // console.log('${this.props.store.player.angle}')
    return {
      position: 'absolute',
      top: 0,
      left: 50,
      transform: [
        { translateX: this.props.store.player.position.x },
        { translateY: this.props.store.player.position.y },
        { rotate: (this.props.store.player.angle+'deg') },
        { scaleX: this.props.store.scale },
        { scaleY: this.props.store.scale },
      ],

    };
  }
  render() {
    return (
        <Sprite
          repeat={true}
          src={require('../images/SeaLord.png')}
          tileHeight={GLOBALS.tileHeight}
          tileWidth={GLOBALS.tileWidth}
          steps={[1, 6, 10, 5, 5, 4]}
          state={this.props.store.player.animationState}
          scale={this.props.store.scale}
          offset={[0, 0]}
          ticksPerFrame={10}
          style={this.getPlayerStyles()}
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
