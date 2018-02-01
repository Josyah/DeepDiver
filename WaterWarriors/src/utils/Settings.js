import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {GLOBALS} from '../globals'
import {observer} from 'mobx-react/native';
@observer
class Settings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.store.navigationState = this.props.store.back}
          style={styles.backButton}
          >
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.props.store.switchVibration()}>
          <Text style={styles.vibration}>Vibration {(this.props.store.vibration) ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.props.store.toggleControls()}>
          <Text style={styles.vibration}>Controls: {(this.props.store.controls=='HORIZONTAL') ? 'Horizontal' : ((this.props.store.controls == 'VERTICAL') ? 'Vertical' : 'Vertical Inverted')}</Text>
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
  characterWheel: {
    flexDirection: 'row'
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12
  },
  vibration: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 15,
    color: 'white',
    fontFamily: GLOBALS.font,
    fontSize: 50,
    borderColor: 'white'
  }
});

module.exports = Settings;
