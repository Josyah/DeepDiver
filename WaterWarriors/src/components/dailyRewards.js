import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {GLOBALS} from '../globals'
class DailyRewards extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{flex: 1}}>Daily Rewards</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.store.closeRewards()
            this.props.store.getRewarded = false
          }}
          style={{flex: 1}}
          >
          <Text style={styles.close}>X</Text>
          <Text>Day {this.props.store.dailyRewards} Rewards!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: GLOBALS.dimensions.height,
    width: GLOBALS.dimensions.width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  close:{
    fontSize: 40
  }
});

module.exports = DailyRewards;
