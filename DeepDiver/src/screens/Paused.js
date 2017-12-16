import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class Paused extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
            this.props.store.navigationState = 'HOME'
            this.props.store.reset()
          }}>
          <Text style={styles.text}>
            Quit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            this.props.store.navigationState = 'LEVEL'
            this.props.store.reset()
          }}>
          <Text style={styles.text}>
            Retry
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.store.navigationState = 'LEVEL'}>
          <Text style={styles.text}>
            Resume
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
    flexDirection: 'row'
  },
  text: {
    margin: 10,
    fontSize: 20
  }
});

module.exports = Paused;
