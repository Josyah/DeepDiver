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
import HealthBar from './healthBar';
import HandleTouch from './HandleTouch';
import Paused from '../screens/Paused';
import Overlay from './overlay';
import {GLOBALS} from '../globals';
import Counter from './Counter';
import Coins from './mapCoins';
import Projectile from './Projectile';
import Alerts from './Alert'
@observer
class Level extends Component {
  constructor(props) {
    super(props);
    store = this.props.store;
    this.state = {
      resetGravity: true
    }
  }
  handleUpdate = (engine) => {
    if((this.props.store.paused != true && this.props.store.unPausing != true) && this.props.store.background.loaded){
        this.state.setToZero = true;
        this.props.store.background.position = this.background.body.position;
        if(store.forceUp == 0) {
          this.props.store.falling();
        }
        Matter.Body.setVelocity(this.background.body, {x: store.forceLeft, y: store.forceUp});
        store.moveBackground();
        store.moveEnemies();
        store.moveProjectiles();
        store.checkCollisions();
        store.checkRegion();
        if(this.state.resetGravity){
          store.gravity.y = -4;
          this.state.resetGravity = false;
        }
    } else {
      this.state.resetGravity = true
      if(this.state.setToZero){
        store.gravity.y = 0;
        this.state.setToZero = false;
      }
    }
  }
  render() {
    var renderCountdown = () => {
      if(this.props.store.unPausing == true){
        return(
          <Counter store={this.props.store}/>
        )
      }
    }
    var renderAlerts = () => {
      // if(this.props.store.alerts.length != 0){
        return(
          <Alerts store={store}/>
        )
      // }
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
            onUpdate={this.handleUpdate}
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
              <Coins
                store={store}
                />
              <Enemies
                store={store}
                />
              <Player
                store={store}
                />
              <Projectile store={store}/>
              <View style={styles.distance}>
                <Text style={styles.distanceText}>{Math.round(-this.props.store.background.position.x/GLOBALS.pixelsInAMeter)}</Text>
                <Text style={styles.coinText}>{this.props.store.coins} Coins</Text>
              </View>
              <HealthBar
                isActive={false}
                store={this.props.store}
                />
              <HandleTouch store={store}/>
              <TouchableOpacity
                onPress={() => this.props.store.paused = true}
                style={styles.pauseButton}
                >
                <IonIcons
                  name={'ios-pause'}
                  size={40}
                  color={'white'}
                  />
              </TouchableOpacity>
              {
                renderCountdown()
              }
              {
                renderOverlay()
              }
              {
                renderAlerts()
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
    backgroundColor: 'transparent',
    padding: 5,
    borderRadius: 3,
    opacity: .8
  },
  numCoins: {
    position: 'absolute',
    top: 0,
    left: 200,
    justifyContent: 'center',
    padding: 5,
    margin: 3,
  },
  distance: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 6,
    opacity: .8
  },
  distanceText: {
    fontSize: 42,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: GLOBALS.font
  },
  coinText: {
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: GLOBALS.font
  },

});

module.exports = Level;
