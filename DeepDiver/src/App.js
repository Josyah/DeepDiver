
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Loop, Stage, World } from 'react-game-kit/native';
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
import store from './store';
import Game from './components/Game';
export default class App extends Component<{}> {
  update = () => {
    console.log('update')
  };
  render() {
    return (
      <Loop>
        <Stage>
          <Game store={store}/>
        </Stage>
      </Loop>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
