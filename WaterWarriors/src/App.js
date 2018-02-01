
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppState
} from 'react-native';
import {observer} from 'mobx-react/native';
import {GLOBALS} from './globals'
import Navigation from './screens/Navigation';
import store from './Store';
@observer
export default class App extends Component<{}> {
  state = {
    appState: AppState.currentState
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
