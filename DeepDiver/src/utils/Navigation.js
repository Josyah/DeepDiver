import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Home from '../screens/Home';
import Loading from '../screens/Loading';
import {observer} from 'mobx-react';
import LevelSelect from '../screens/StoryMode/LevelsLayout'
import CharSelect from '../screens/StoryMode/CharacterSelect';
import Level from '../components/Level';
import GameOver from '../screens/GameOver';
import Paused from '../screens/Paused';

@observer
class Navigation extends Component {

  render() {
    var store = this.props.store
    switch(store.navigationState){
      case 'HOME':
        return(
          <Home store={store}/>
        )
      case 'LEVEL_SELECT':
        return(
          <LevelSelect store={store}/>
        )
      case 'CHAR_SELECT':
        return(
          <CharSelect store={store}/>
        )
      case 'LEVEL':
        return(
          <Level
            store={store}
            gravity={2}
            airFriction={0.1}
            />
        )
      case 'GAME':
        return(
          <Game store={store}/>
        )
      case 'DEAD':
        return(
          <GameOver store={store}/>
        )
      case 'PAUSED':
        return(
          <Paused store={store}/>
        )
      default:
        return (
          <Loading store={store}/>
        )
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = Navigation;
