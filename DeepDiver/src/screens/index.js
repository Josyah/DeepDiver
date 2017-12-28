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
import Sprite from '../components/sprite'
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
      case 'DEAD':
        return(
          <Overlay store={store}>
            <GameOver store={store}/>
          </Overlay>
        )
      case 'PAUSED':
        return(
          <Paused store={store}>

          </Paused>
        )
      case 'SHOP':
        return(
          <Shop store={store}/>
        )
      case 'SETTINGS':
        return(
          <Settings store={store}/>
        )
      case 'SPRITE': {
        return (
          <Sprite store={store}/>

        )
      }
      default:
        return (
          <Loading store={store}/>
        )
    }
  }

}

module.exports = Navigation;
