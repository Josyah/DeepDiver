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
        {translateY: -this.props.store.background.position.y},
      ]
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../utils/water.jpg')}
          style={[styles.mainBg, this.getPosition(0,0)]}
          />
        <Image
          source={require('../utils/kali-kolberg-final-seaweed-animation.gif')}
          style={[styles.seaWeed, this.getPosition(1000, 0)]}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: -1,

  },
  mainBg: {
    height: GLOBALS.dimensions.height*10,
    width: GLOBALS.dimensions.width*10,
    zIndex: -1
  },
  seaWeed: {
    height: 300,
    width: 300,
    zIndex: 1
  },
});

module.exports = Background;
