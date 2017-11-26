import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {GLOBALS} from '../../globals'
class LevelContainer extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.store.navigationState = 'LEVEL'}
        >
        <View style={styles.levelBox}>
          <Text style={styles.levelNumber}>
            {this.props.init}
          </Text>
        </View>
        <View style={styles.levelBox}>
          <Text style={styles.levelNumber}>
            {this.props.init+1}
          </Text>
        </View>
        <View style={styles.levelBox}>
          <Text style={styles.levelNumber}>
            {this.props.init+2}
          </Text>
        </View>
        <View style={styles.levelBox}>
          <Text style={styles.levelNumber}>
            {this.props.init+3}
          </Text>
        </View>
        <View style={styles.levelBox}>
          <Text style={styles.levelNumber}>
            {this.props.init+4}
          </Text>
        </View>
      </TouchableOpacity>
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
