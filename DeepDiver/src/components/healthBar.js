import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

class HealthBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      active: true
    }
  }
  getLength(){
    return {
      width: (this.props.store.player.health > 0) ? (this.props.store.player.health*2) : (0),
      backgroundColor:'white'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={this.getLength()}>
          <Text></Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 12,
    opacity: .8,
    right: 100,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    padding: 3,
    margin: 4,
    width: 210
  },
});

module.exports = HealthBar;
