import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import SelectorButton from '../selectorButton';
import IonIcons from 'react-native-vector-icons/Ionicons';
class StoryMode extends Component {
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
            color={'white'}
            />
        </TouchableOpacity>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollview}
          >
          <SelectorButton
            goTo={'LEVEL'}
            store={this.props.store}
            name={'Sea Lord'}
            playerSelected={'SEA_LORD'}
            source={require('../../images/SeaLordStatic.png')}
          />
          <SelectorButton
            goTo={'LEVEL'}
            store={this.props.store}
            name={'Aquaria'}
            playerSelected={'AQUARIA'}
            source={require('../../images/AquariaStatic.png')}
          />
        </ScrollView>
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
  scrollview: {
    justifyContent: 'center',
    alignItems: 'center',

  }
});

module.exports = StoryMode;
