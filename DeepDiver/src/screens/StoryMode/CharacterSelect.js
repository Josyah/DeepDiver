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
            />
        </TouchableOpacity>
        <Text>
          Character Select
        </Text>
        <ScrollView
          horizontal={true}
          >
          <SelectorButton
            goTo={'LEVEL_SELECT'}
            store={this.props.store}
            buttonText={'Sea Dude'}
          />
          <SelectorButton
            goTo={'LEVEL_SELECT'}
            store={this.props.store}
            buttonText={'Character 2'}
          />
          <SelectorButton
            goTo={'LEVEL_SELECT'}
            store={this.props.store}
            buttonText={'Character 3'}
          />
          <SelectorButton
            goTo={'LEVEL_SELECT'}
            store={this.props.store}
            buttonText={'Character 4'}
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
});

module.exports = StoryMode;
