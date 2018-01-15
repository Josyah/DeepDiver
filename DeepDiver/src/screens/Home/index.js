import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import {GLOBALS} from '../../globals';
class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    var renderLoading = () => {
      if(this.state.loading){
        return (
          <View style={styles.loadingContainer}>
            <Text>Loading...</Text>
          </View>
        )
      }
    }
    return (
      <View style={styles.container}>
        <Image
          source={require('../../images/AltOcean.png')}
          style={styles.background}
          onLoadStart={() => console.log('STARTED LOADING')}
          onLoad={() => {
            console.log('FINISHED LOADING')
            this.setState({loading: false})
          }}
          />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Water Warfare</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.store.startGame()
          }}
          style={styles.start}
          >
          <View>
            <Text style={styles.startText}>Start</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={() => this.props.store.navigationState = 'SHOP'}
          style={styles.storeButton}>
          <Text style={styles.linkToPage}>Store</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.store.navigationState = 'SETTINGS'}
          style={styles.settingsButton}>
          <Text style={styles.linkToPage}>Settings</Text>
        </TouchableOpacity>
        {
          renderLoading()
        }
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
    backgroundColor: 'transparent'
  },
  loadingContainer: {
    position: 'absolute',
    height: GLOBALS.dimensions.height,
    width: GLOBALS.dimensions.width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  titleContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginBottom: 15,
  },
  title: {
    paddingLeft: 120 - (120 * 0.75),
    fontSize: 85,
    fontFamily: GLOBALS.font,
    color: 'white',
  },
  start: {

  },
  startText: {
    fontSize: 60,
    margin: 5,
    padding: 10,
    fontFamily: GLOBALS.font,
    color: 'black'
  },
  linkToPage: {
    fontSize: 35,
    margin: 5,
    padding: 10,
    fontFamily: GLOBALS.font,
    color: 'white'
  },
  multiplayerPage: {
    fontSize: 24,
    margin: 5,
    opacity: .7,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  storeButton: {
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  settingsButton: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  background: {
    position: 'absolute',
    height: GLOBALS.dimensions.height+100,
    width: GLOBALS.dimensions.width+100,
    resizeMode: 'cover'
  },

});

module.exports = Home;
