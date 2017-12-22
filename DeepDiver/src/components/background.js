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
  getPosition(startX, startY){
    return{
      position: 'absolute',
      left: startX,
      bottom: startY,
      transform: [
        {translateX: this.props.store.background.position.x},
        {translateY: this.props.store.background.position.y},
      ]
    }
  }
  backgroundPosition(){
    return{
      position: 'absolute',
      left: GLOBALS.initBackgroundPosition.x,
      bottom: GLOBALS.initBackgroundPosition.y,
      height: GLOBALS.initBackgroundDimensions.height,
      width: GLOBALS.initBackgroundDimensions.width,
      transform: [
        {translateX: this.props.store.background.position.x},
        {translateY: this.props.store.background.position.y},
        {rotate: '180deg'}
      ]
    }
  }
  secondaryBackgroundPosition(){
    return{
      position: 'absolute',
      left: GLOBALS.initBackgroundDimensions.width,
      bottom: GLOBALS.initBackgroundPosition.y,
      height: GLOBALS.initBackgroundDimensions.height,
      width: GLOBALS.initBackgroundDimensions.width,
      transform: [
        {translateX: this.props.store.background.position.x},
        {translateY: this.props.store.background.position.y},
        {rotate: '180deg'}
      ]
    }
  }
  onLoadEnd(x){
    // console.log('LOADING BACKGROUND'+ x +' FINISHED')
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/Ocean.png')}
          style={[styles.mainBg, this.secondaryBackgroundPosition()]}
          onLoadEnd={this.onLoadEnd(1)}
          />
        <Image
          source={require('../images/Ocean.png')}
          style={[styles.mainBg, this.backgroundPosition()]}
          onLoadEnd={this.onLoadEnd(2)}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainBg: {
    height: GLOBALS.initBackgroundDimensions.height,
    width: GLOBALS.initBackgroundDimensions.width,
    zIndex: -1,
  },
  seaWeed: {
    height: 300,
    width: 300,
    zIndex: 1
  },
});

module.exports = Background;
