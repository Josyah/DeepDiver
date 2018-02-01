import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Home from './Home';
import Loading from './Loading';
import {observer} from 'mobx-react';
import Level from '../components/Level';
import Summary from './Summary';
import Paused from './Paused';
import Shop from './Shop';
import Settings from '../utils/Settings';
import Overlay from '../components/overlay';
import Sprite from '../components/sprite';
@observer
class Navigation extends Component {
  constructor(props){
    super(props);
    store= this.props.store;
  }
  render() {

    switch(store.navigationState){
      case 'HOME':
        return(
          <Home store={store}/>
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
          <Summary store={store}/>
        )
      case 'PAUSED':
        return(
          <Paused store={store}>
            <Overlay/>
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
