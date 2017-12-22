
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppState
} from 'react-native';
import { Loop, Stage, World, Body } from 'react-game-kit/native';
import Matter from 'matter-js';
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
import Background from './components/background';
import {GLOBALS} from './globals'
import Home from './screens/Home';
import Navigation from './screens';
import store from './store';
export default class App extends Component<{}> {
  state = {
    appState: AppState.currentState
  }
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      store.active()
    } else {
      store.inactive()
    }
    this.setState({appState: nextAppState});
  }

  render() {
    return (

          <Navigation store={store}/>

    );
  }
}
