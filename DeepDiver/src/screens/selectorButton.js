import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {GLOBALS} from '../globals';

class SelectorButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.characterContainer}
        onPress={() => this.props.store.navigationState = this.props.goTo }
        >
          <Text>
            {this.props.buttonText}
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
  characterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: GLOBALS.dimensions.height*.8,
    width: GLOBALS.dimensions.width*.25,
    margin: 10
  }
});

module.exports = SelectorButton;
