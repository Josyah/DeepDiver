import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
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
          Settings
        </Text>
        <ScrollView
          horizontal={true}
          >
          <Text>Items</Text>
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
