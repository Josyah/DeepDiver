import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {observer} from 'mobx-react/native';
@observer
class Player extends Component {
  getPosition() {
    return {
      left: this.props.store.characterPositionX,
      bottom: this.props.store.characterPositionY
    }
  }
  render() {
    return (
      <View style={[styles.container, this.getPosition()]}>
        <Text>
          Player
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
    borderColor: 'blue',
    position: 'absolute',
  },
});

module.exports = Player;
