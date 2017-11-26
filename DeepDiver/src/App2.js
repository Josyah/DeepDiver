
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
  physicsInit = (engine) => {
    const ground = Matter.Bodies.rectangle(
      512, 448,
      1024, 64,
      {
        isStatic: true,
      },
    );

    Matter.World.addBody(engine.world, ground);
  }
  render() {
    return (
      <Loop>
        <Stage>
          <World
            onInit={this.physicsInit}
            onUpdate={this.handleUpdate}
            gravity={{ x: 0, y: 2, scale: 0.0005 }}
            >
            <Body
              shape="circle"
              args={[0, GLOBALS.dimensions.height - 75, 75]}
              friction={1}
              frictionStatic={0}
              restitution={0.5}
              ref={(b) => { this.ball = b; }}
            >
              <View style={this.getBallStyles()}>
                <Text>Player</Text>
              </View>
            </Body>
          </World>
        </Stage>
      </Loop>
    );
  }
}
