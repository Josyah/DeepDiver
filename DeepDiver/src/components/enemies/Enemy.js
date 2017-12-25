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
import {getOpacity} from '../../utils/getOpacity';
import {ifBetween} from '../../utils/ifBetween';
@observer
class Enemy extends Component {
  constructor(props){
    super(props)
    store = this.props.store
    enemy = this.props.position
    this.state = {
      index: this.props.index,
      collided: enemy.collided,
      opacity: getOpacity(this.props.distanceAway),
      background: this.props.background,
      mounted: true,
      angle: this.props.store.enemies[this.props.index].angle
    }
  }
  componentWillUnmount(){
    this.setState({mounted: false})
  }

  componentWillMount(){
    this.setState({mounted: true})
  }
  getPosition() {
      return {
        left: this.props.store.enemies[this.props.index].position.x,
        bottom: this.props.store.enemies[this.props.index].position.y,
        opacity: this.props.store.enemies[this.props.index].opacity,
        transform: [
          {translateY: this.state.mounted ? this.state.background.position.y : 0},
          {rotate: (-this.props.store.enemies[this.props.index].angle+'deg') },
        ],
      }
  }
  onLoadEnd(){
    this.props.store.enemies[this.props.index].loaded = true
  }
  render() {
    return (
      <Sprite
        repeat={true}
        src={this.props.src}
        tileHeight={this.props.tileHeight}
        tileWidth={this.props.tileWidth}
        steps={this.props.steps}
        state={(this.props.store.enemies[this.props.index].health <= 0) ? 1 : 0}
        scale={1}
        offset={[0, 0]}
        ticksPerFrame={5}
        style={this.state.mounted ? this.getPosition() : console.log('false')}
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

module.exports = Enemy;
