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
    this.enemyStats = GLOBALS.enemies.find((eachEnemy) => {
      return (eachEnemy.type == this.props.type)
    })
    // this.props.store.enemies[this.props.index] = this.props.store.enemies[this.props.index]
    this.state = {
      opacity: getOpacity(this.props.store.enemies[this.props.index].distanceAway),
      index: this.props.index
    }
  }
  componentWillUnmount(){
    // this.props.store.enemies[this.props.index].mounted = false;
  }

  componentDidMount(){
    this.props.store.enemies[this.state.index].mounted = true;
  }
  getPosition() {
    if(!this.props.store.enemies[this.props.index].isDeleting){
      // console.log(this.props.store.enemies[this.state.index].position.x, this.props.store.enemies[this.state.index].position.y)
      return {
        position: 'absolute',
        left: this.props.store.enemies[this.state.index].position.x,
        bottom: this.props.store.enemies[this.state.index].position.y,
        opacity: this.props.store.enemies[this.state.index].opacity,
        width: this.enemyStats.dimensions.width,
        height: this.enemyStats.dimensions.height,
        transform: [
          {translateY: this.props.store.background.position.y},
          {rotate: (-this.props.store.enemies[this.state.index].angle+'deg') },
          {scaleX: ((this.props.store.enemies[this.state.index].widthInMeters*GLOBALS.pixelsInAMeter)/(this.props.store.enemies[this.state.index].dimensions.width))},
          {scaleY: ((this.props.store.enemies[this.state.index].widthInMeters*GLOBALS.pixelsInAMeter)/(this.props.store.enemies[this.state.index].dimensions.width))}
        ],
      }
    }

}

  getState(){
    if(this.props.store.enemies[this.state.index].mounted){
      this.props.store.enemies[this.state.index].loaded = true
      if(this.props.store.enemies[this.state.index].health <= 0){
        return 1
      } else {
        return 0
      }
    }
  }
  render() {
    var renderEnemy = () => {
      if(!this.props.store.enemies[this.state.index].isDeleting){
          return (
            <Loop>
              <Sprite
                repeat={this.props.store.enemies[this.state.index].mounted}
                src={this.enemyStats.src}
                tileHeight={this.props.store.enemies[this.state.index].dimensions.height}
                tileWidth={this.props.store.enemies[this.state.index].dimensions.width}
                steps={this.enemyStats.steps}
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
