import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';
import {GLOBALS} from '../../globals'
class Bubble extends Component {
  constructor(props){
    super(props)
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
      this.props.store.bubbles.splice(this.props.index, 1)
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
          borderColor: 'white',
          borderRadius: 500,
          height: 20,
          width: 20,
          borderWidth: 1,
          transform: [
            {translateY: this.state.offset}
          ]
        }]}>
        <Text></Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    backgroundColor: 'red',
  },
});

module.exports = Bubble;
