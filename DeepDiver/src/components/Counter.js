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
      secondsRemaining: 3,
      mounted: false
    };
  }

  tick() {
    // var secondsRemaining = this.state.secondsRemaining
    // secondsRemaining -= 1
    // console.log(secondsRemaining)
    // if (this.state.secondsRemaining <= 0) {
    //   clearInterval(this.interval);
    // }
      setTimeout(() => {
        var secondsRemaining = this.state.secondsRemaining -1
        this.setState({secondsRemaining})
      }, 1000);


  }
  componentDidUpdate() {
    // this.tick()

    if(this.state.secondsRemaining > 0 && this.state.mounted){
      this.tick()
      console.log(this.state.secondsRemaining)
    } else {
      this.props.store.unPausing = false
    }
  }
  componentWillUnmount() {

    this.state.mounted = false
  }
  componentDidMount() {
    console.log('COUNTER MOUNTED')
    this.state.mounted = true
    this.tick()
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
    fontSize: 100,
    fontFamily: GLOBALS.font,
    color: 'white'
  }
});

module.exports = Counter;
