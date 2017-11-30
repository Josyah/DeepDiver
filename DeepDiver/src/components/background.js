import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {observer} from 'mobx-react/native';
import {GLOBALS} from '../globals'
@observer
class Background extends Component {
  getPosition(){
    return{
      height: GLOBALS.dimensions.height*20,
      width: GLOBALS.dimensions.width*20,
      justifyContent: 'center',
      alignItems: 'center',
      left: this.props.store.background.position.x,
      bottom: this.props.store.background.position.y,
    }
  }
  render() {
    return (
      <Image
        source={require('../utils/water.jpg')}
        style={this.getPosition()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: GLOBALS.dimensions.height,
    width: GLOBALS.dimensions.width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = Background;
