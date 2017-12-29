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
import IonIcons from 'react-native-vector-icons/Ionicons';
import {observer} from 'mobx-react/native';
@observer
class Settings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.store.navigationState = 'HOME'}
          style={styles.backButton}
          >
          <IonIcons
            size={30}
            name={'md-arrow-back'}
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.props.store.switchVibration()}>
          <Text style={styles.vibration}>Vibration {(this.props.store.vibration) ? 'On' : 'Off'}</Text>
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
    top: 5,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
