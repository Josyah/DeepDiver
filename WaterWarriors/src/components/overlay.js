import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';
import {GLOBALS} from '../globals'
class Overlay extends Component {
  constructor(props){
    super(props)
    this.state = {
      opacity: new Animated.Value(0),
    }
  }
  componentDidMount() {
    this.fadeIn()
  }
  fadeIn() {
    this.state.opacity.setValue(0)
    Animated.timing(
      this.state.opacity,
      {
        toValue: .6,
        duration: 200
      }
    ).start(() => console.log('done'))
  }

  getOpacity(){
    console.log(this.state.opacity)
    return{
      opacity: this.state.opacity
    }
  }
  render() {
    return (
      <Animated.View style={[styles.container, {opacity: this.state.opacity}]}>

      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top: 0,
    left: 0,
    height: GLOBALS.dimensions.height,
    width: GLOBALS.dimensions.width,
    backgroundColor: 'black',
  },
});

module.exports = Overlay;
