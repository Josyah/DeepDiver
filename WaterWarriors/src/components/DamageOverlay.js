import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';
import {GLOBALS} from '../globals'
class DamageOverlay extends Component {
  constructor(props){
    super(props)
    this.state = {
      opacity: new Animated.Value(0.6),
    }
  }
  componentDidMount() {
    this.flyIn()
  }
  flyIn() {
    this.state.opacity.setValue(0.6)
    Animated.timing(
      this.state.opacity,
      {
        toValue: 0,
        duration: 500
      }
    ).start(() => this.props.store.takingDamage = false)
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
    position: 'absolute',
    height: GLOBALS.dimensions.height,
    width: GLOBALS.dimensions.width,
    backgroundColor: 'red'
  },
});

module.exports = DamageOverlay;
