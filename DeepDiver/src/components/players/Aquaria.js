import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {observer} from 'mobx-react/native';
import { Body , Sprite} from 'react-game-kit/native';
import {GLOBALS} from '../../globals'
@observer
class Aquaria extends Component {
  getPlayerStyles() {
    var angle = this.props.store.player.angle;
    return {
      position: 'absolute',
      bottom: this.props.store.player.position.y,
      left: this.props.store.player.position.x,
      transform: [
        { rotate: (this.props.store.player.angle+'deg') },
        { scaleX: this.props.store.scale },
        { scaleY: this.props.store.scale },
      ],
    };
  }
  render() {
    return (
      <Sprite
        repeat={this.props.store.paused ? true : false}
        src={require('../../images/Aquaria.png')}
        tileHeight={GLOBALS.Aquaria.tileHeight}
        tileWidth={GLOBALS.Aquaria.tileWidth}
        steps={[1, 4, 5, 5, 5, 3, 3, 4]}
        state={0}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = Aquaria;
