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
    // this.enemy = this.enemy
    this.enemy = store.enemies[this.props.index]
    this.state = {
      index: this.props.index
    }
  }
  componentWillUnmount(){
    // this.enemy.mounted = false;
  }

  componentDidMount(){
    this.enemy.mounted = true;
  }
  getPosition() {
      // console.log(this.enemy.position.x, this.enemy.position.y)
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

  render() {
    var renderEnemy = () => {
      if(this.enemy.isDeleting != true){
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
