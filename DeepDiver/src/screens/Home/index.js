import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Sea Swimmer
        </Text>
        <TouchableOpacity onPress={() => this.props.store.navigationState = 'CHAR_SELECT'}>

          <Image
            source={require('../../images/Start.png')}
            />
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
    fontSize: 50,
    marginBottom: 15
  },
  linkToPage: {
    fontSize: 24,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  multiplayerPage: {
    fontSize: 24,
    margin: 5,
    opacity: .7,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  }
});

module.exports = Home;
