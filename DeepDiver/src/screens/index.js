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
import Game from '../components/Game';
import GameOver from './GameOver';
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
          <Game store={store}/>
        )
      case 'DEAD':
        return(
          <GameOver store={store}/>
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
