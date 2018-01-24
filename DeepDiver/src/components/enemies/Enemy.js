import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated
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
    this.enemy = store.enemies[this.props.index]
    this.state = {
      index: this.props.index,
      opacity: new Animated.Value(1),
    }
  }
  fadeOut() {
    this.state.opacity.setValue(1)
    Animated.timing(
      this.state.opacity,
      {
        toValue: 0,
        duration: 500
      }
    ).start(() => {
      console.log('DONE')
      this.enemy.isDeleting = false
    })
  }
  componentDidUpdate(){
    if(this.enemy.isDeleting == true){
      console.log('FADE OUT')
      this.fadeOut()
    }
  }
  getPosition() {
      // console.log(this.enemy.position.x, this.enemy.position.y)
      if(this.props.store.checkExists(this.props.store.enemies[this.props.index])){
        return {
          position: 'absolute',
          left: this.enemy.position.x,
          bottom: this.enemy.position.y,
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

  render() {
    var renderEnemy = () => {
          return (
            <Loop>
              <Animated.View
                style={{opacity: this.state.opacity}}>
                <Sprite
                  repeat={(this.enemy.animationState == 0) ? (true) : (false)}
                  src={this.enemy.src}
                  tileHeight={this.enemy.dimensions.height}
                  tileWidth={this.enemy.dimensions.width}
                  steps={this.enemy.steps}
                  state={this.enemy.animationState}
                  scale={1}
                  offset={[0, 0]}
                  ticksPerFrame={5}
                  style={this.getPosition()}
                  />
              </Animated.View>
            </Loop>
          );

    }
    return(
      <View>
        {
          renderEnemy()
        }
      </View>
    )
  }
}

module.exports = Enemy;
