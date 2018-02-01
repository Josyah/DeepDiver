import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PropTypes,
  Image
} from 'react-native';
import {observer} from 'mobx-react/native';
import { Body , Sprite} from 'react-game-kit/native';
import {GLOBALS} from '../../globals'
@observer
class Projectile extends Component {
  constructor(props){
    super(props)
    store = this.props.store
    this.state = {
      mounted: false
    }
  }
  getProjectileStyles() {
    if(this.state.mounted){
      return {
        position: 'absolute',
        bottom: store.projectiles[this.props.index].position.y,
        left: store.projectiles[this.props.index].position.x,
        height: 23/1.5,
        width: 67/1.5,
        opacity: .75,
        transform: [
          {rotate: (store.projectiles[this.props.index].angle + 'deg')}
        ]
      };
    }
  }
  onLoadEnd(){
    store.projectiles[this.props.index].loaded = true
  }
  componentWillUnmount(){
    this.setState({mounted: false})
  }

  componentDidMount(){
    this.setState({mounted: true})
  }
  render() {
    return(
      <Image
        source={require('../../images/Harpoon.png')}
        style={this.getProjectileStyles()}
        onLoadEnd={this.onLoadEnd()}
        />
    )
  }
}

module.exports = Projectile;
