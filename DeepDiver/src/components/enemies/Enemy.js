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
      opacity: getOpacity(this.props.distanceAway),
      mounted: false,
    }
  }
  componentWillUnmount(){
    this.setState({mounted: false})
  }

  componentDidMount(){
    this.setState({mounted: true})
  }
  getPosition() {
    if(this.state.mounted){
      return {
        left: this.props.store.enemies[this.props.index].position.x,
        bottom: this.props.store.enemies[this.props.index].position.y,
        opacity: this.props.store.enemies[this.props.index].opacity,
        transform: [
          {translateY: this.props.store.background.position.y},
          {rotate: (-this.props.store.enemies[this.props.index].angle+'deg') },
        ],
      }
    }
}

  getState(){
    if(this.state.mounted){
      this.props.store.enemies[this.props.index].loaded = true
      if(this.props.store.enemies[this.props.index].health <= 0 && this.state.mounted){
        return 1
      } else {
        return 0
      }
    }
  }
  render() {
    return (
      <Sprite
        repeat={true}
        src={this.props.src}
        tileHeight={this.props.tileHeight}
        tileWidth={this.props.tileWidth}
        steps={this.props.steps}
        state={this.getState()}
        scale={1}
        offset={[0, 0]}
        ticksPerFrame={5}
        style={this.getPosition()}
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
