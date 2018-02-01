import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';
import {GLOBALS} from '../../globals'
class Point extends Component {
  constructor(props){
    super(props)
    store = this.props.store;
    this.state = {
      opacity: new Animated.Value(1),
      offset: new Animated.Value(0),
    }
  }
  componentDidMount() {
    this.fadeOut();
    this.slideUp();
  }
  fadeOut() {
    this.state.opacity.setValue(1)
    Animated.timing(
      this.state.opacity,
      {
        toValue: 0,
        duration: 500
      }
    ).start(() => {
      store.points.splice(this.props.index, 1)
    })
  }
  slideUp() {
    this.state.offset.setValue(0)
    Animated.timing(
      this.state.offset,
      {
        toValue: -40,
        duration: 1000
      }
    ).start()
  }

  render() {
    return (
      <Animated.View style={[styles.container, {
          opacity: this.state.opacity,
          left: this.props.position.x,
          bottom: this.props.position.y,
          transform: [
            {translateY: this.state.offset}
          ]
        }]}>
        <Text style={styles.text}>{this.props.text}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 20
  }
});

module.exports = Point;
