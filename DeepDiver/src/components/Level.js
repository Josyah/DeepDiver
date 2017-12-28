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
import Player from './players';
import Enemies from './enemies';
import {observer} from 'mobx-react/native';
import Matter from 'matter-js';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Background from './background';
import HealthBar from './healthBar';
import HandleTouch from '../controls/planeControls';
import Paused from '../screens/Paused';
import Overlay from './overlay';
import {GLOBALS} from '../globals';
import Counter from './Counter';
import Coins from './coins';
import Projectile from './projectiles';
import Alert from './Alert';
import Game from './Game'
@observer
class Level extends Component {
  constructor(props) {
    super(props);
    store = this.props.store;
    this.state = {
      mounted: false
    }
  }
  componentWillUnmount(){
    this.setState({mounted: false})
  }
  componentDidMount(){
    this.setState({mounted: true})
  }
  handleUpdate = (engine) => {
    if((this.props.store.paused != true && this.props.store.unPausing != true) && (this.props.store.background.loaded && this.state.mounted)){
        this.state.setToZero = true;
        this.props.store.background.position.y += store.forceUp
        store.moveBackground();
          store.moveEnemies();

        if(store.projectiles.length != 0){
          store.moveProjectiles();
        }
        store.checkRegion();
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
      if(this.props.store.alert != "")
        return(
          <Alert store={store}/>
        )
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
         >

            <View style={styles.container}>
              <Background store={store}/>
              <Coins
                store={store}
                />
              <Player
                store={store}
                />
              <Enemies
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
    backgroundColor: 'black'
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
