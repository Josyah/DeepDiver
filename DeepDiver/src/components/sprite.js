import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

class Sprite extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/SeaLord.png')}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    overflow: 'hidden',
  },
})
module.exports = Sprite;
