import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';
import {World, Body, Stage, Loop} from 'react-game-kit/native';
import PropTypes from 'prop-types';
import Player from './player';
import Enemies from './mapEnemies';
import {observer} from 'mobx-react/native';
import Matter from 'matter-js';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Background from './background';
import HealthBar from './healthBar'
import HandleTouch from './HandleTouch';
import Paused from '../screens/Paused'
import Overlay from './overlay'
import {GLOBALS} from '../globals'
import Counter from './Counter'
import Coins from './mapCoins'
@observer
class Level extends Component {
  constructor(props) {
    super(props);

    store = this.props.store;
    this.state ={
      count: 3
    }
  }

  componentDidMount(){
  }
  componentWillUnmount(){
  }
  // basically a while loop
  handleUpdate = (engine) => {
    // set global value to local physics value -- Everything moves based on this value
    if(this.props.store.paused != true){
      if(this.props.store.unPausing != true ){

        this.props.store.background.position = this.background.body.position;

        // if the player presses one of the buttons
        //set the velocity of the background in the y direction to whatever value it is
        if(store.forceUp == 0) {
          this.props.store.falling()
        }
        Matter.Body.setVelocity(this.background.body, {x: store.forceLeft, y: store.forceUp});
        if(this.props.store.enemies.length != 0){
          store.checkForCollisions();
        }
        store.moveBackground();
        store.moveEnemies();
        store.moveCoins();
        store.randomlyGenerateEnemies()
      }
    }
  }
  physicsInit = (engine) => {
    console.log('PHYSICS')
    const ground = Matter.Bodies.rectangle(
      GLOBALS.dimensions.width / 2,  // distance from left
      (GLOBALS.dimensions.height+20)-(GLOBALS.playerHeightInMeters*GLOBALS.pixelsInAMeter), // distance from top
      GLOBALS.dimensions.width, // width
      40, // height
      {
        isStatic: true,
        restitution: 0
      },
    );
    const ceiling = Matter.Bodies.rectangle(
      GLOBALS.dimensions.width / 2,  // distance from left
      -7, // distance from top
      GLOBALS.dimensions.width, // width
      15, // height
      {
        isStatic: true,
        restitution: 0
      },
    );

  Matter.World.add(engine.world, [ceiling, ground]);
}
  render() {
    var renderCountdown = () => {
      if(this.props.store.unPausing == true){
        return(
          <Counter store={this.props.store}/>
        )
      }
    }
    var renderOverlay = () => {
      if(this.props.store.paused == true){
        return(
          <Overlay store ={this.props.store}>
            <Paused store ={this.props.store}/>
          </Overlay>
        )
      }
    }
    return (
      <Loop>
        <Stage
          height={GLOBALS.dimensions.height}
          width={GLOBALS.dimensions.width}
        >
          <World
            onInit={this.physicsInit}
            onUpdate={this.handleUpdate}
            onCollision={this.onCollision}
            gravity={store.gravity}
            >
            <View style={styles.container}>

              <Body
              shape="rectangle"
              args={[0, 0, this.props.store.player.height, this.props.store.player.width]}
              friction={0}
              frictionStatic={0}
              restitution={0}
              mass={GLOBALS.playerMass}
              frictionAir={this.props.airFriction}
              ref={(b) => { this.background = b; }}
              >
                <Background store={store}/>
              </Body>


              <Player
              store={store}
              left={300}
              bottom={300}
              index={0}
              />
              <Enemies
                store={store}
                />
              <Coins
                store={store}
                />
              <View style={styles.distance}>
                <Text style={styles.distanceText}>{Math.round(-this.props.store.background.position.x/GLOBALS.pixelsInAMeter)} m</Text>
              </View>
              <View style={styles.shells}>
                <Text style={styles.distanceText}>{this.props.store.coins}</Text>
              </View>
              <View style={styles.healthBar}>
                <HealthBar
                  isActive={false}
                  store={this.props.store}
                  />
              </View>
              <HandleTouch store={store}/>
              <TouchableOpacity
                onPress={() => this.props.store.paused = true}
                style={styles.pauseButton}
                >
                <IonIcons
                  name={'ios-pause'}
                  size={30}
                  />
              </TouchableOpacity>
              {
                renderCountdown()
              }
              {
                renderOverlay()
              }
              </View>
          </World>
        </Stage>
      </Loop>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: GLOBALS.dimensions.height,
    width: GLOBALS.dimensions.width,
  },
  pauseButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    marginTop: 5,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 3
  },
  countDown: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  shells: {
    position: 'absolute',
    top: 0,
    left: 125,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    margin: 3,
    width: 100
  },
  distance: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    margin: 3,
    width: 100
  },
  distanceText: {
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
    borderRadius: 5
  },
  topBar: {
    height: 35,
    width: GLOBALS.dimensions.width,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'red'
  },
  bottomBar: {
    height: 35,
    width: GLOBALS.dimensions.width,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'red'
  },
  healthBar: {
    position: 'absolute',
    top: 0,
    right: 125,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    margin: 3,
    backgroundColor: 'white',
    width: 100
  },

});

module.exports = Level;
