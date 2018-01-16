
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
import { Orientation } from 'react-native-orientation'
export default class App extends Component<{}> {
  state = {
    appState: AppState.currentState
  }
componentWillMount() {
  
  // The getOrientation method is async. It happens sometimes that
  // you need the orientation at the moment the JS runtime starts running on device.
  // `getInitialOrientation` returns directly because its a constant set at the
  // beginning of the JS runtime.

  // const initial = Orientation.getInitialOrientation();
  // if (initial === 'PORTRAIT') {
  //   // do something
  //   store.rotate('LANDSCAPE');
  //
  // } else {
  //   // do something else
  //   store.rotate('LANDSCAPE');
  // }
  // AppState.addEventListener('change', this._handleAppStateChange);
  // this locks the view to Portrait Mode
  // Orientation.lockToPortrait();

  // this locks the view to Landscape Mode
  // Orientation.lockToLandscape();

  // this unlocks any previous locks to all Orientations
  // Orientation.unlockAllOrientations();

  // Orientation.addOrientationListener(this._orientationDidChange);
}

componentWillUnmount() {
  // AppState.removeEventListener('change', this._handleAppStateChange);
  // Orientation.getOrientation((err, orientation) => {
  //   console.log(`Current Device Orientation: ${orientation}`);
  // });
  //
  //
  // // Remember to remove listener
  // Orientation.removeOrientationListener(this._orientationDidChange);
}

_handleAppStateChange = (nextAppState) => {
  if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    store.active()
  } else {
    store.inactive()
  }
  this.setState({appState: nextAppState});
}
_orientationDidChange = (orientation) => {
  if (orientation === 'LANDSCAPE') {
    // do something with landscape layout
    store.rotate('LANDSCAPE');
  } else {
    // do something with portrait layout
    store.rotate('PORTRAIT');
  }
}

componentWillUnmount() {
}
  render() {
    return (

          <Navigation store={store}/>

    );
  }
}
