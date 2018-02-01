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
class Torpedo extends Component {
  constructor(props){
    super(props)
    this.state = {
      mounted: false
    }
    store = this.props.store;
  }
  getProjectileStyles() {
    if(this.state.mounted){
      return {
        position: 'absolute',
        bottom: store.projectiles[this.props.index].position.y,
        left: store.projectiles[this.props.index].position.x,
        opacity: .75,
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
        source={require('../../images/Torpedo.png')}
        style={this.getProjectileStyles()}
        onLoadEnd={this.onLoadEnd()}
        />
    )
  }
}

module.exports = Torpedo;
