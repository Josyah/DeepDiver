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
  backgroundPosition(){
    return{
      position: 'absolute',
      left: this.props.store.background.offset.x,
      bottom: this.props.store.background.offset.y,
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
    this.props.store.background.loaded = true
  }
  render() {
    return (
      <View
        style={styles.container}
        shouldRasterizeIOS ={true}
        >
        <Image
          source={require('../images/Ocean.png')}
          style={[this.backgroundPosition()]}
          onLoadEnd={this.onLoadEnd()}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

module.exports = Background;
