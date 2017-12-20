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

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.store.hearts.map((fill, index) => {
            return(

              <Image
                source={require('../images/Heart-stuff.png')}
                />
            )
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    fontSize: 15
  },
});

module.exports = HealthBar;
