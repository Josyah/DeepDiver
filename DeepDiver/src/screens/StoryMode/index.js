import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}
class StoryMode extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Character Select
        </Text>
        <ScrollView
          horizontal={true}
          >
          <TouchableOpacity style={styles.characterContainer} onPress={() => this.props.store.navigationState = 'LEVEL_SELECT'}>
            <Text>
              character1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.characterContainer} onPress={() => this.props.store.navigationState = 'LEVEL_SELECT'}>
            <Text>
              character2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.characterContainer} onPress={() => this.props.store.navigationState = 'LEVEL_SELECT'}>
            <Text>
              character3
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.characterContainer} onPress={() => this.props.store.navigationState = 'LEVEL_SELECT'}>
            <Text>
              character4
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.characterContainer} onPress={() => this.props.store.navigationState = 'LEVEL_SELECT'}>
            <Text>
              character5
            </Text>
          </TouchableOpacity>
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
  characterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: dimensions.height*.8,
    width: dimensions.width*.25,
    margin: 10
  },
});

module.exports = StoryMode;
