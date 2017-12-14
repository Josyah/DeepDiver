import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

class HealthBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      active: true
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Entypo
          name={'heart'}
          size={20}
          style={{
            color: this.props.isActive ? 'red' : 'black'
          }}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15
  },
});

module.exports = HealthBar;
