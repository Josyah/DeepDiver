import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class GameOver extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          GameOver Component
        </Text>
        <TouchableOpacity onPress={() => {
            this.props.store.reset()
            this.props.store.navigationState = 'LEVEL'
          }}>

          <Text style={styles.retry}>
            Retry
          </Text>
        </TouchableOpacity>
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
  },
  retry: {
    fontSize: 20,
    color: 'white',
    margin: 10
  }
});

module.exports = GameOver;
