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
class Missiles extends Component {
  constructor(props){
    super(props)
    this.state = {
      mounted: false,
      index: 0
    }
  }
  getProjectileStyles(index) {
    if(this.state.mounted){
      return {
        position: 'absolute',
        bottom: this.props.store.missiles[index].y,
        left: this.props.store.missiles[index].x,
        height: 100,
        width: 100,
        transform: [
          {translateY: this.props.store.background.position.y}
        ]
      };
    }
  }
  getAlertStyles(index) {
    if(this.state.mounted){
      return {
        position: 'absolute',
        bottom: this.props.store.missiles[index].y,
        right: 20,
        height: 50,
        width: 50,
        backgroundColor: 'red',
        transform: [
          {translateY: this.props.store.background.position.y}
        ]
      };
    }
  }
  onLoadEnd(){
    this.props.store.projectiles[this.props.index].loaded = true
  }
  componentWillUnmount(){
    this.setState({mounted: false})
  }

  componentDidMount(){
    this.setState({mounted: true})
  }
  render() {
    return(
      <View>
        {
          this.props.store.missiles.map((eachMissile, index) => {
            return(
              <View key={index}>
                <Sprite
                  src={require('../../images/Torpedo.png')}
                  tileHeight={88}
                  tileWidth={150}
                  steps={[2]}
                  state={0}
                  style={this.getProjectileStyles(index)}
                  />
                <Text style={this.getAlertStyles(index)}>!</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}

module.exports = Missiles;
