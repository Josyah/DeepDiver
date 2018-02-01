import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  Image
} from 'react-native';
import {GLOBALS} from '../globals'
class Paused extends Component {
  constructor(props){
    super(props)
    this.state = {
      offset: new Animated.Value(-100),
    }
  }
  componentDidMount() {
    this.flyIn()
  }
  flyIn() {
    this.state.offset.setValue(GLOBALS.dimensions.height)
    Animated.timing(
      this.state.offset,
      {
        toValue: ((GLOBALS.dimensions.height/2)),
        duration: 100
      }
    ).start(() => console.log('done'))
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
      <View style={{position: 'absolute'}}>
      {this.props.children}
      <Animated.View style={[styles.container, {top: this.state.offset}]}>
        <Image
          source={require('../images/PausedBkgrnd.png')}
          style={{
            width: 300,
            height: 300,
            position: 'absolute',
            resizeMode: 'cover',
            borderRadius: 35
          }}
          />
          <TouchableWithoutFeedback onPress={() => {
              this.props.store.navigationState = 'LEVEL'
              this.props.store.paused = false
              // this.props.store.unPausing = true
              this.props.store.unPause()
            }}>
            <Image
              source={require('../images/Resume.png')}
              style={{
                width: 4087/27,
                height: 1024/27,
                resizeMode: 'stretch',
              }}
              />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {
              this.props.store.paused = false
              this.props.store.resetGame()
              this.props.store.startGame()
            }}>
            <Image
              source={require('../images/Restart.png')}
              style={{
                width: 4628/27,
                height: 1204/27,
                resizeMode: 'stretch',
                marginTop: 30
              }}
              />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {
              this.props.store.navigationState= 'SETTINGS'
              this.props.store.back= 'LEVEL'
            }}>
            <Image
              source={require('../images/Options.png')}
              style={{
                width: 4465/27,
                height: 1204/27,
                resizeMode: 'stretch',
                marginTop: 30
              }}
              />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {
            this.props.store.paused = false
            this.props.store.navigationState = 'HOME'
            this.props.store.resetGame()
            }}>
            <Image
              source={require('../images/Quit.png')}
              style={{
                width: 2334/27,
                height: 1203/27,
                resizeMode: 'stretch',
                marginTop: 30
              }}
              />
          </TouchableWithoutFeedback>


      </Animated.View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: GLOBALS.dimensions.width/2,
    transform: [
      {translateX: -200},
      {translateY: -100},
    ],
    width: 400,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    margin: 10,
    fontSize: 35,
    fontFamily: GLOBALS.font,
    color: '#3a9bdc'
  }
});

module.exports = Paused;
