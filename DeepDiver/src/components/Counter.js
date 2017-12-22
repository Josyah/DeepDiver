import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';
import {GLOBALS} from '../globals';
class Counter extends Component {
  constructor(props){
    super(props)

    this.state ={
      secondsRemaining: 3
    };
  }

  tick(secondsRemaining) {
    // var secondsRemaining = this.state.secondsRemaining
    // secondsRemaining -= 1
    // console.log(secondsRemaining)
    // if (this.state.secondsRemaining <= 0) {
    //   clearInterval(this.interval);
    // }
    this.props.store.unPausing = false
  }
  componentDidMount() {
    this.setState({ secondsRemaining: this.state.secondsRemaining });
    this.interval = setInterval(() => this.tick(this.state.secondsRemaining), 3000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.number}>
          {this.state.secondsRemaining}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: GLOBALS.dimensions.height/2,
    left: GLOBALS.dimensions.width/2,
    transform: [
      {translateX: -(75/2)},
      {translateY: -25},
    ],
    width: 75,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  number: {
    fontSize: 50
  }
});

module.exports = Counter;
