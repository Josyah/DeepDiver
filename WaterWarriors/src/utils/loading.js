import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {GLOBALS} from '../globals'
class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Loading Component
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: GLOBALS.dimensions.height,
    width: GLOBALS.dimensions.width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
});

module.exports = Loading;
