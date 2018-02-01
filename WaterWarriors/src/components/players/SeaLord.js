import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PropTypes
} from 'react-native';
import {observer} from 'mobx-react/native';
import { Sprite, Loop} from 'react-game-kit/native';
import {GLOBALS} from '../../globals'
@observer
class SeaLord extends Component {
  constructor(props){
    super(props)
    this.state = {
      mounted: false,
      scale: this.getScale()
    }
  }
  getPlayerStyles() {
    if(this.state.mounted){
      return {
        position: 'absolute',
        left: this.props.store.absPlayerPosition.x,
        bottom: this.props.store.absPlayerPosition.y,
        transform: [
          { rotate: (90+this.props.store.player.angle+'deg') },
          { translateY: this.props.store.player.offset },
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
  onLoadEnd(x){
    this.props.store.player.loaded = true
  }
  render() {
    return (
      <Loop>
        <Sprite
          repeat={(this.props.store.player.repeat) ? (true) : (false)}
          move={false}
          src={require('../../images/SeaLord.png')}
          tileHeight={GLOBALS.SeaLord.tiles[this.props.store.player.animationState].tileHeight}
          tileWidth={GLOBALS.SeaLord.tiles[this.props.store.player.animationState].tileWidth}
          steps={GLOBALS.SeaLord.steps}
          state={this.props.store.player.animationState}
          scale={this.state.scale}
          offset={[0, GLOBALS.SeaLord.offsetY]}
          ticksPerFrame={(this.props.store.player.boosted) ? (this.props.store.player.boostAnimationSpeed) : (this.props.store.player.normalAnimationSpeed)}
          style={this.getPlayerStyles()}
          onLoad={this.onLoadEnd()}
          onLastFrame={() => {
            if(this.props.store.player.animationState === GLOBALS.SeaLord.attackingAnimation){
              this.props.store.stopAnimation('HARPOON');
              console.log('stopped harpoon animation');
            } else if (this.props.store.player.animationState === GLOBALS.SeaLord.damageAnimation){

              this.props.store.stopAnimation('DAMAGE');
              console.log('stopped damage animation');
            } else if (this.props.store.player.animationState === GLOBALS.SeaLord.eelDamageAnimation){

              this.props.store.stopAnimation('DAMAGE');
              console.log('stopped eel damage animation');
            }
          }}
          />
      </Loop>
    );
  }
}

module.exports = SeaLord;
