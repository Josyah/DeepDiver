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
import VerticalControls from '../controls/verticalControls';
import HorizontalControls from '../controls/horizontalControls';
import DamageOverlay from './DamageOverlay';
import Paused from '../screens/Paused';
import Overlay from './overlay';
import {GLOBALS} from '../globals';
import Counter from './Counter';
import Coins from './coins';
import Projectile from './projectiles';
import Alert from './messages/Alert';
import Warning from './messages/Warning';
import Information from './messages/Information';
@observer
class Level extends Component {
  constructor(props) {
    super(props);
    store = this.props.store;
    this.state = {
      mounted: false,
      count: 0
    }
  }
  componentWillUnmount(){
    this.props.store.currentlyPlaying = false
    this.setState({mounted: false})
  }
  componentDidMount(){
    // this.props.store.currentlyPlaying = true
    this.setState({mounted: true})
  }
  handleUpdate = (engine) => {
    if(((this.props.store.background.loaded && this.props.store.player.loaded) && this.props.store.currentlyPlaying)){
      console.log(this.props.store.currentlyPlaying)
      if((this.props.store.background.position.y > GLOBALS.topBoundary) || (this.props.store.background.position.y > (GLOBALS.initBackgroundDimensions.height - GLOBALS.dimensions.height))){
        if(store.forceUp < 0){
          this.props.store.background.position.y += store.forceUp
        }
      } else {
        this.props.store.background.position.y += store.forceUp
      }
      store.moveBackground();
      if(store.enemies.length != 0){
        store.moveEnemies();
      }
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
    var renderWarnings = () => {
      if(this.props.store.warning != "")
        return(
          <Warning store={store}/>
        )
    }
    var renderInformation = () => {
      if(this.props.store.info != "")
        return(
          <Information store={store}/>
        )
    }
    var renderOverlay = () => {
      if(this.props.store.paused == true){
        return(
          <Paused store ={this.props.store}>

            <Overlay store ={this.props.store}/>
          </Paused>
        )
      }
    }
    var renderDamage = () => {
      if(this.props.store.takingDamage == true){
        return(
          <DamageOverlay store={this.props.store}/>
        )
      }
    }
    var renderControls = () => {
      if(this.props.store.controls == 'VERTICAL'){
        return(
          <VerticalControls
            store={store}
            inverted={false}
            />
        )
      }
      else if(this.props.store.controls == 'VERTICAL_INVERTED'){
        return(
          <VerticalControls
            store={store}
            inverted={true}
            />
        )
      }
      else if(this.props.store.controls == 'HORIZONTAL'){
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
                <Text style={styles.distanceText}>{Math.round(-this.props.store.background.position.x/GLOBALS.pixelsInAMeter)} m</Text>
                <Text style={styles.coinText}>{this.props.store.coins} Coins</Text>
                <Text style={styles.ammoText}>{this.props.store.shop.harpoons} Harpoons</Text>
              </View>
              <HealthBar
                isActive={false}
                store={this.props.store}
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
                renderCountdown()
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
                  this.props.store.pause()
                }}
                style={styles.pauseButton}
                >
                <IonIcons
                  name={'ios-pause'}
                  size={50}
                  color={'white'}
                  />
              </TouchableOpacity>
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
    fontSize: 65,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: GLOBALS.secondaryFont
  },
  coinText: {
    fontSize: 25,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: GLOBALS.secondaryFont
  },
  ammoText: {
    fontSize: 25,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: GLOBALS.secondaryFont
  },

});

module.exports = Level;
