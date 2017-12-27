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
      mounted: false,
      scale: this.getScale(),
    }
  }
  getPlayerStyles() {
    if(this.state.mounted){
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
  }

  getScale(){
      var currentHeight = GLOBALS.SeaLord.tiles[this.props.store.player.animationState].tileHeight;
      var neededHeight = GLOBALS.playerHeightInMeters * GLOBALS.pixelsInAMeter;
      var scale = (neededHeight/currentHeight);
      return scale

  }
  componentWillUnmount(){
    this.setState({mounted: false})
  }

  componentDidMount(){
    this.setState({mounted: true})
  }
  render() {
    return (
      <Sprite
        repeat={true}
        src={require('../../images/SeaLord.png')}
        tileHeight={GLOBALS.SeaLord.tiles[this.props.store.player.animationState].tileHeight}
        tileWidth={GLOBALS.SeaLord.tiles[this.props.store.player.animationState].tileWidth}
        steps={GLOBALS.SeaLord.steps}
        state={this.props.store.player.animationState}
        scale={this.state.scale}
        offset={[0, GLOBALS.SeaLord.offsetY]}
        ticksPerFrame={2}
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

module.exports = SeaLord;
