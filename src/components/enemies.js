import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Enemy from './enemy';
class Enemies extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.spikes.map((position, index) => {

          return (
            <Enemy
              key={index}
              position={position}
            />
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

module.exports = Enemies;
