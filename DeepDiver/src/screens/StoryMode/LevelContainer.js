import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {GLOBALS} from '../../globals'
import SelectorButton from '../selectorButton'
class LevelContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SelectorButton
          goTo={'LEVEL'}
          store={this.props.store}
          buttonText={this.props.init}
          />
        <SelectorButton
          goTo={'LEVEL'}
          store={this.props.store}
          buttonText={this.props.init+1}
          />
        <SelectorButton
          goTo={'LEVEL'}
          store={this.props.store}
          buttonText={this.props.init+2}
          />
        <SelectorButton
          goTo={'LEVEL'}
          store={this.props.store}
          buttonText={this.props.init+3}
          />
        <SelectorButton
          goTo={'LEVEL'}
          store={this.props.store}
          buttonText={this.props.init+4}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  levelBox: {
    height: GLOBALS.dimensions.height*0.8,
    width: 200,
    borderRadius: 0,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  }
});

module.exports = LevelContainer;
