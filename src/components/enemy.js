import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {observer} from 'mobx-react/native';
@observer
class Enemy extends Component {
  getPosition() {
    return {
      height: 50,
      width: 75,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'red',
      position: 'absolute',
      left: this.props.store.backgroundPosition
    }
  }
  render() {
    return (
      <View style={[this.getPosition()]}>
        <Text>
          Enemy
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'red',
    position: 'absolute',
  },
});

module.exports = Enemy;
