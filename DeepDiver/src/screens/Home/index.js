import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import {GLOBALS} from '../../globals';
class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Water Wars
        </Text>
        <TouchableOpacity
          onPress={() => this.props.store.navigationState = 'CHAR_SELECT'}
          style={styles.start}
          >
          <Text style={styles.startText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.store.navigationState = 'SHOP'}
          style={styles.storeButton}>
          <Text style={styles.linkToPage}>Store</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.store.navigationState = 'SETTINGS'}
          style={styles.settingsButton}>
          <Text style={styles.linkToPage}>Settings</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a9bdc'
  },
  title: {
    fontSize: 100,
    marginBottom: 15,
    fontFamily: GLOBALS.font,
    color: 'white'
  },
  start: {

  },
  startText: {
    fontSize: 60,
    margin: 5,
    padding: 10,
    fontFamily: GLOBALS.font,
    color: 'black'
  },
  linkToPage: {
    fontSize: 35,
    margin: 5,
    padding: 10,
    fontFamily: GLOBALS.font,
    color: 'white'
  },
  multiplayerPage: {
    fontSize: 24,
    margin: 5,
    opacity: .7,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  storeButton: {
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  settingsButton: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },

});

module.exports = Home;
