import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PropTypes
} from 'react-native';
import {observer} from 'mobx-react/native';
import { Body , Sprite} from 'react-game-kit/native';
import {GLOBALS} from '../../globals'
@observer
class SeaLord extends Component {
  constructor(props){
    super(props)
    this.state = {
      scale: this.getScale()
    }
  }
  getPlayerStyles() {
    return {
      position: 'absolute',
      bottom: GLOBALS.initCharacterPosition.y,
      left: GLOBALS.initCharacterPosition.x,
      opacity: .75,
      transform: [
        { rotate: (90+this.props.store.player.angle+'deg') },
        { scaleX: this.state.scale },
        { scaleY: this.state.scale },
      ],
    };
  }

  getScale(){
    var currentHeight = GLOBALS.SeaLord.tiles[this.props.store.player.animationState].tileHeight;
    var neededHeight = GLOBALS.playerHeightInMeters * GLOBALS.pixelsInAMeter;
    var scale = (neededHeight/currentHeight);
    this.setState({
      scale
    })
    return scale
  }
  onLoadEnd(){
  }
  render() {
    return (
        <Sprite
          repeat={true}
          src={require('../../images/AquariaStatic.png')}
          tileHeight={GLOBALS.Aquaria.tileHeight}
          tileWidth={GLOBALS.Aquaria.tileWidth}
          steps={GLOBALS.Aquaria.steps}
          state={this.props.store.player.animationState}
          scale={this.state.scale}
          offset={[88, 0]}
          ticksPerFrame={5}
          style={this.getPlayerStyles()}
          onLoadEnd={this.onLoadEnd()}
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

module.exports = SeaLord;
