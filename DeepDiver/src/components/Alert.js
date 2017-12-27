import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';
import {GLOBALS} from '../globals'
class Alert extends Component {
  constructor(props){
    super(props)
    this.state = {
      offset: new Animated.Value(GLOBALS.dimensions.height+100),
      opacity: new Animated.Value(1),
    }
  }
  componentDidMount() {
    this.flyIn();
  }
  flyIn() {
    this.state.offset.setValue(GLOBALS.dimensions.height+100)
    Animated.timing(
      this.state.offset,
      {
        toValue: ((GLOBALS.dimensions.height-200)),
        duration: 1500
      }
    ).start(() => {
      setTimeout(() => this.flyOut(), 500)
    })
  }
  flyOut() {
    this.fadeOpacity();
    this.state.offset.setValue(GLOBALS.dimensions.height-200)
    Animated.timing(
      this.state.offset,
      {
        toValue: (GLOBALS.dimensions.height+100),
        duration: 900
      }
    ).start()
  }
  fadeOpacity() {
    this.state.opacity.setValue(1)
    Animated.timing(
      this.state.opacity,
      {
        toValue: 0,
        duration: 300
      }
    ).start(() => this.props.store.alert = '')

  }
  getOffset(){
    return{
      transform: [
        {translateY: this.state.offset}
      ]
    }
  }
  render() {
    return (
      <Animated.View style={[styles.container, {bottom: this.state.offset, opacity: this.state.opacity}]}>
        <Text style={styles.text}>{this.props.store.alert}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: GLOBALS.dimensions.width/2,
    transform: [
      {translateX: -25},
      {translateY: -25},
    ],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    margin: 10,
    fontSize: 50,
    fontFamily: GLOBALS.font,
    color: 'white'
  }
});

module.exports = Alert;
