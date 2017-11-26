import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
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

module.exports = Loading;
