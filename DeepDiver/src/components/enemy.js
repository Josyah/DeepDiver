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
    // this.posLeft = this.props.store.backgroundPosition - this.props.index;
    // console.log(this.props.index)
    // console.log(this.props.position.bottom)
    return {
      left: this.props.store.background.position.x,
      bottom: this.props.store.background.position.y,
      transform: [
        {
          translateX: this.props.position.left
        },
        {
          translateY: -this.props.position.bottom
        }
      ]
    }
  }
  render() {
    return (
      <View style={[this.getPosition(), styles.container]}>
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
