import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';
import {GLOBALS} from '../../globals'
class Paused extends Component {
  constructor(props){
    super(props)
    this.state = {
      offset: new Animated.Value(-GLOBALS.dimensions.width/2),
      opacity: new Animated.Value(0.95),

    }
  }
  componentDidMount() {
    this.flyIn()
  }
  flyIn() {
    this.state.offset.setValue(-GLOBALS.dimensions.width/2)
    Animated.timing(
      this.state.offset,
      {
        toValue: 10,
        duration: 750
      }
    ).start(() => {
      setTimeout(() => this.flyOut(), 1000)
    })
  }

  flyOut() {
    this.fadeOpacity();
    Animated.timing(
      this.state.offset,
      {
        toValue: (-100),
        duration: 900
      }
    ).start()
  }
  fadeOpacity() {
    this.state.opacity.setValue(.95)
    Animated.timing(
      this.state.opacity,
      {
        toValue: 0,
        duration: 300
      }
    ).start(() => this.props.store.info = '')

  }


  render() {
    return (
      <Animated.View style={[styles.container, {right: this.state.offset, opacity: this.state.opacity}]}>
        <Text style={styles.text}>
          {this.props.store.info}
        </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 200,
    transform: [
      {translateY: -25},
    ],
    height: 50,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 1
  },
  text: {
    margin: 10,
    fontSize: 20,
    fontFamily: GLOBALS.font,
    color: 'white',
    padding: 5,
  }
});

module.exports = Paused;
