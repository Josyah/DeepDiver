import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Home from './Home';
import Loading from './Loading';
import {observer} from 'mobx-react';
import store from '../store';
import LevelSelect from './StoryMode/LevelsLayout'
import CharSelect from './StoryMode/CharacterSelect';
import Level from '../components/Level';
import GameOver from './GameOver';
import Paused from './Paused';
import Store from './StoryMode/Store';
import Settings from '../utils/Settings'
@observer
class Navigation extends Component {
  render() {

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
      case 'STORE':
        return(
          <Store store={store}/>
        )
      case 'SETTINGS':
        return(
          <Settings store={store}/>
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
