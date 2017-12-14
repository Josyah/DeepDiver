import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import {World, Body} from 'react-game-kit/native';
import PropTypes from 'prop-types';
import Player from './player';
import Enemies from './enemies';
import {generateEnemies} from '../utils/generateEnemies';
import {observer} from 'mobx-react/native';
import {physicsInit, updateEnemies} from '../utils/physics';
import Matter from 'matter-js';
import Enemy from './enemy'
import IonIcons from 'react-native-vector-icons/Ionicons';
import Background from './background';
import HealthBar from './healthBar'
import {GLOBALS} from '../globals'
@observer
class Game extends Component {
  constructor(props) {
    super(props);

    this.enemyPositions = generateEnemies();
    store = this.props.store;
    this.callback = this.callback.bind(this);
  }
  componentDidMount(){
    this.props.store.gamePlay = true
    // Matter.Body.setStatic(this.props.store.enemies[0].body, true)
  }
  componentWillUnmount(){
    this.props.store.gamePlay = false
  }
  handleUpdate = (engine) => {
    store.player.position = this.player.body.position;
    // store.enemy.position = this.props.store.enemies[0].body.position;
    if(store.forceUp!=0){
      Matter.Body.setVelocity(this.player.body, {x: 0, y: store.forceUp});
      // Matter.Body.setVelocity(this.props.store.enemies[0].body, {x: 0, y: store.forceUp});
      // store.moveBackgroundUp();
      if (store.forceUp < 0){
        this.props.store.changeAnimation('UP')
      } else {
        this.props.store.changeAnimation('DOWN')
      }
    } else {

      this.props.store.falling()
    }

    // Matter.Body.setPosition(this.props.store.enemies[0].body, {x: store.enemy.position.x, y: store.enemy.position.y});
    store.moveBackground();
    store.checkPlayerPosition();
    updateEnemies(store);
  }
  onCollision(e){
    console.log('COLLIDED', e.pairs[0].bodyA.id, 'WITH', e.pairs[0].bodyB.id)
    const bodyA = e.pairs[0].bodyA.id
    const bodyB = e.pairs[0].bodyB.id
    if(bodyA == 1){
      if(bodyB == 2){
        // store.die()
      }
    }
  }
  callback(enemyBodies){
    console.log(enemyBodies.length)
    for(let i = 0; i < enemyBodies.length ; i++){
      enemyBodies[i].position.x -= 5
      console.log(enemyBodies[0].position.x)
    }
  }
  render() {
    return (
      <World
        onInit={(engine) => physicsInit({
          engine,
          store,
          enemies: this.enemyPositions,
          callback: this.callback
        })}
        onUpdate={this.handleUpdate}
        onCollision={this.onCollision}
        gravity={{ x: 0, y: this.props.gravity, scale: 0.0005 }}
        >
        <View style={{flex: 1}}>
          <Background store={store}/>
          <View style={styles.buttons}>
            <TouchableOpacity
              onPressIn={() => this.props.store.pressScreen('UP')}
              onPressOut={() => this.props.store.releaseScreen()}
              style={styles.leftButton}
              >
              <View></View>
            </TouchableOpacity>
            <TouchableOpacity
              onPressIn={() => this.props.store.pressScreen('DOWN')}
              onPressOut={() => this.props.store.releaseScreen()}
              style={styles.rightButton}
              >
              <View></View>
            </TouchableOpacity>
          </View>

            <Body
              shape="rectangle"
              args={[this.props.store.player.position.x, this.props.store.player.position.y, this.props.store.player.height, this.props.store.player.width]}
              friction={0}
              frictionStatic={0}
              restitution={0}
              mass={GLOBALS.playerMass}
              frictionAir={this.props.airFriction}
              ref={(b) => { this.player = b; }}
              >
              <Player
                store={store}
                left={300}
                bottom={300}
                index={0}
                />
            </Body>
            <View style={styles.topBar}>

              <View style={styles.distance}>
                <Text style={styles.distanceText}>{-this.props.store.background.position.x/10} m</Text>
              </View>
              <View style={styles.shells}>
                <Text style={styles.distanceText}>123 Shells</Text>
              </View>
              <View style={styles.healthBar}>
                <HealthBar
                  isActive={false}
                  />
              </View>

              <TouchableOpacity
                onPress={() => this.props.store.navigationState = 'PAUSED'}
                style={styles.pauseButton}
                >
                <IonIcons
                  name={'ios-pause'}
                  size={20}
                  />
              </TouchableOpacity>
            </View>
            <View style={styles.bottomBar}>
              <Text>Bottom</Text>
            </View>
          </View>

      </World>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    backgroundColor: 'white',
    padding: 3,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3
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
    backgroundColor: 'white',
    width: 100
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
    backgroundColor: 'white',
    width: 100
  },
  distanceText: {
    fontSize: 15
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
  buttons: {
    position: 'absolute',
    top:0,
    left: 0,
    width: GLOBALS.dimensions.width,
    height: GLOBALS.dimensions.height
  },
  leftButton: {
    position: 'absolute',
    top:0,
    left: 0,
    height: GLOBALS.dimensions.height,
    width: (GLOBALS.dimensions.width/2)
  },
  rightButton: {
    position: 'absolute',
    top:0,
    right: 0,
    height: GLOBALS.dimensions.height,
    width: (GLOBALS.dimensions.width/2)
  },
});

module.exports = Game;
