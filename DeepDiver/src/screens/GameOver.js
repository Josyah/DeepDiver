import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class GameOver extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          GameOver Component
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  text: {
    fontSize: 50,
    color: 'white'
  }
});

module.exports = GameOver;
