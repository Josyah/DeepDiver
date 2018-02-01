import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {
  AdMobRewarded
} from 'react-native-admob'

class Ad extends Component {
  componentDidMount() {
    AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1712485313');
  }

  showRewarded() {
    AdMobRewarded.requestAd((error) => error && console.log(error));
  }
  render() {
    return (
      <TouchableOpacity onPress={this.showRewarded}>
        <Text style={styles.button}>
          Show Rewarded Video and preload next
        </Text>
      </TouchableOpacity>
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

module.exports = Ad;
