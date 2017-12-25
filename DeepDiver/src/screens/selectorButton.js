import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import {GLOBALS} from '../globals';

class SelectorButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.characterContainer}
        onPress={() => {
          this.props.store.navigationState = this.props.goTo
          GLOBALS.player.type = this.props.playerSelected
        }}
        >
          <Text style={styles.characterName}>{this.props.name}</Text>
          <Image
            source={this.props.source}
            />
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
  characterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: GLOBALS.dimensions.height,
    width: GLOBALS.dimensions.width/2,
    margin: 10
  },
  characterName: {
    fontSize: 35,
    margin: 5,
    padding: 10,
    fontFamily: GLOBALS.font,
    color: 'white'
  }
});

module.exports = SelectorButton;
