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
import Dust from './dust';
import {observer} from 'mobx-react/native';
import Matter from 'matter-js';
import Background from './background';
import HealthBar from './healthBar';
import VerticalControls from '../controls/verticalControls';
import HorizontalControls from '../controls/horizontalControls';
import DamageOverlay from './DamageOverlay';
import Paused from '../screens/Paused';
import Overlay from './overlay';
import {GLOBALS} from '../globals';
import Coins from './coins';
import Projectile from './projectiles';
import Alert from './messages/Alert';
import Warning from './messages/Warning';
import Information from './messages/Information';
import Loading from '../screens/Loading';
import Points from './points'
import Bubbles from './bubbles'
import Missiles from './missiles'
import Pickups from './pickups'
@observer
class Level extends Component {
  constructor(props) {
    super(props);
    store = this.props.store;
    this.state = {
      mounted: false,
    }
  }
  componentWillUnmount(){
    store.currentlyPlaying = false
    this.setState({mounted: false})
  }
  componentDidMount(){
    // store.currentlyPlaying = true
    this.setState({mounted: true})
  }
  render() {
    var renderLoading = () => {
      if(store.background.loaded == false){
        return(
          <Loading />
        )
      }
    }
    var renderPoints = () => {
      if(store.points.length > 0){
        return(
          <Points store={store}/>
        )
      }
    }
    var renderBubbles = () => {
      if(store.bubbles.length > 0){
        return(
          <Bubbles store={store}/>
        )
      }
    }
    var renderMissiles = () => {
      if(store.missiles.length > 0){
        return(
          <Missiles store={store}/>
        )
      }
    }
    var renderAlerts = () => {
      if(store.alert != "")
        return(
          <Alert store={store}/>
        )
    }
    var renderWarnings = () => {
      if(store.warning != "")
        return(
          <Warning store={store}/>
        )
    }
    var renderInformation = () => {
      if(store.info != "")
        return(
          <Information store={store}/>
        )
    }
    var renderOverlay = () => {
      if(store.paused == true){
        return(
          <Paused store ={store}>

            <Overlay store ={store}/>
          </Paused>
        )
      }
    }
    var renderDamage = () => {
      if(store.takingDamage == true){
        return(
          <DamageOverlay store={store}/>
        )
      }
    }
    var renderControls = () => {
      if(store.controls == 'VERTICAL'){
        return(
          <VerticalControls
            store={store}
            inverted={false}
            />
        )
      }
      else if(store.controls == 'VERTICAL_INVERTED'){
        return(
          <VerticalControls
            store={store}
            inverted={true}
            />
        )
      }
      else if(store.controls == 'HORIZONTAL'){
        return(
          <HorizontalControls
            store={store}
            />
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
         onUpdate={() => store.handleUpdate()}
         >

            <View style={styles.container}>
              <Background store={store}/>
              <Dust
                store={store}
                />
              <Player
                store={store}
                />
              <Pickups
                store={store}
                />
              <Enemies
                store={store}
                />
              <Projectile store={store}/>
              <View style={styles.distance}>
                <Text style={styles.distanceText}>{Math.round(-store.background.position.x/GLOBALS.pixelsInAMeter)} m</Text>
                <Text style={styles.coinText}>{store.coins} coins</Text>
                <Text style={styles.ammoText}>{store.shop.harpoons} harpoons</Text>
              </View>
              <HealthBar
                isActive={false}
                store={store}
                />
              {
                renderAlerts()
              }
              {
                renderInformation()
              }
              {
                renderWarnings()
              }
              {
                renderBubbles()
              }
              {
                renderPoints()
              }
              {
                renderMissiles()
              }
              {
                renderDamage()
              }
              {
                renderControls()
              }
              {
                renderOverlay()
              }
              <TouchableOpacity
                onPress={() => {
                  store.pause()
                }}
                style={styles.pauseButton}
                >
                <Text>Pause</Text>
              </TouchableOpacity>
              {
                renderLoading()
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
    backgroundColor: 'black',
    position: 'absolute'
  },
  pauseButton: {
    position: 'absolute',
    top: 0,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginTop: 6,
    backgroundColor: 'transparent',
    borderRadius: 3,
    opacity: .8
  },
  numCoins: {
    position: 'absolute',
    top: 0,
    left: 200,
    justifyContent: 'center',
    padding: 5,
    marginTop: 6,
    margin: 3,
  },
  distance: {
    position: 'absolute',
    top: 0,
    left: 10,
    opacity: .8,
    marginTop: 6
  },
  distanceText: {
    fontSize: 50,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: GLOBALS.secondaryFont
  },
  coinText: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: GLOBALS.secondaryFont
  },
  ammoText: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: GLOBALS.secondaryFont
  },

});

module.exports = Level;
