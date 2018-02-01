import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class CountDown extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          3
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
  },
});

module.exports = CountDown;
