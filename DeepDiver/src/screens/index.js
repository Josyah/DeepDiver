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
import CharSelect from './StoryMode/CharacterSelect';
import Level from '../components/Level';
import GameOver from './GameOver';
import Paused from './Paused';
import Shop from './StoryMode/Shop';
import Settings from '../utils/Settings';
import Overlay from '../components/overlay';
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
          <Overlay store={store}>
            <GameOver store={store}/>
          </Overlay>
        )
      case 'PAUSED':
        return(
          <Overlay store={store}>
            <Paused store={store}/>
          </Overlay>
        )
      case 'SHOP':
        return(
          <Shop store={store}/>
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
