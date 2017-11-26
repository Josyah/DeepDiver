
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Loop, Stage, World, Body } from 'react-game-kit/native';
import Matter from 'matter-js';
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
import Game from './components/Game';
import Background from './components/background';
import {GLOBALS} from './globals'
import Player from './components/player2';
import Home from './screens/Home';
import Navigation from './screens';
export default class App extends Component<{}> {


  constructor(props) {
    super(props);

    this.state = {
      gravity: 1,
      ballPosition: {
        x: 0,
        y: 0,
      },
      ballAngle: 0,
    };
  }
  handleUpdate = () => {
    this.setState({
      ballPosition: this.ball.body.position,
      ballAngle: this.ball.body.angle,
    });
  }


  getBallStyles() {
    return {
      height: 75,
      width: 75,
      position: 'absolute',
      bottom: 500,
      left: 300,
      transform: [
        { translateX: this.state.ballPosition.x },
        { translateY: this.state.ballPosition.y },
        { rotate: (this.state.ballAngle * (180 / Math.PI)) + 'deg'}
      ],
    };
  }
  render() {
    return (
      <Loop>
        <Stage>
          <Navigation/>
        </Stage>
      </Loop>
    );
  }
}
