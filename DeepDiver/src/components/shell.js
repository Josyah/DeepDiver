import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Shell extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.store.shells.map((position, index) => {
          return (
            <Text>Shell</Text>
          );
        })}
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

module.exports = Shell;
