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
    // var angle = this.props.store.player.angle;
    // // console.log('${this.props.store.player.angle}')
    // var angleInRads = angle * Math.PI / 180
    return {
      position: 'absolute',
      bottom: GLOBALS.initCharacterPosition.y,
      left: GLOBALS.initCharacterPosition.x,
      opacity: .75,
      transform: [
        { rotate: (this.props.store.player.angle+'deg') },
        { scaleX: this.state.scale },
        { scaleY: this.state.scale },
      ],
    };
  }

  getScale(){
    var neededHeight = GLOBALS.playerHeightInMeters * GLOBALS.pixelsInAMeter
    var currentHeight = GLOBALS.SeaLord.tileHeight
    var scale = (neededHeight/currentHeight)
    this.setState({
      scale
    })
    return scale
  }
  onLoadEnd(){
    console.log('LOADING SEA LORD FINISHED')
  }
  render() {
    return (
        <Sprite
          repeat={true}
          src={require('../../images/SeaLord.png')}
          tileHeight={GLOBALS.SeaLord.tileHeight}
          tileWidth={GLOBALS.SeaLord.tileWidth}
          steps={GLOBALS.SeaLord.steps}
          state={this.props.store.player.animationState}
          scale={this.state.scale}
          offset={[0, 0]}
          ticksPerFrame={7}
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
