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
import {physicsInit} from '../utils/physics';
import Matter from 'matter-js';
import Enemy from './enemy'
import IonIcons from 'react-native-vector-icons/Ionicons';
import Background from './background'

@observer
class Game extends Component {
  constructor(props) {
    super(props);

    this.enemyPositions = generateEnemies();
    store = this.props.store;
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
    }

    // Matter.Body.setPosition(this.props.store.enemies[0].body, {x: store.enemy.position.x, y: store.enemy.position.y});
    store.moveBackground();
    store.checkPlayerPosition();
  }
  onCollision(e){
    // console.log('COLLIDED', e.pairs[0].bodyA.id, 'WITH', e.pairs[0].bodyB.id)
    const bodyA = e.pairs[0].bodyA.id
    const bodyB = e.pairs[0].bodyB.id
    if(bodyA == 1){
      if(bodyB == 2){
        store.die()
      }
    }
  }

  render() {
    return (
      <World
        onInit={physicsInit}
        onUpdate={this.handleUpdate}
        onCollision={this.onCollision}
        gravity={{ x: 0, y: this.props.gravity, scale: 0.0005 }}
        >
        <TouchableWithoutFeedback
          onPressIn={() => this.props.store.pressScreen()}
          onPressOut={() => this.props.store.releaseScreen()}
          style={styles.container}
          >
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => this.props.store.navigationState = 'PAUSED'}
              style={styles.pauseButton}
              >
              <IonIcons
                name={'ios-pause'}
                size={30}
              />
            </TouchableOpacity>
            <Background store={store}/>
            <Body
              shape="rectangle"
              args={[this.props.store.player.position.x, this.props.store.player.position.y, 75, 75]}
              friction={0}
              frictionStatic={0}
              restitution={0}
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
            <Enemies
              store={this.props.store}
              enemies={this.enemyPositions}
              />

            <View style={styles.distance}>
              <Text style={styles.distanceText}>{-this.props.store.background.position.x/10} m</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    margin: 10
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
    margin: 10,
    backgroundColor: 'white',
    width: 100
  },
  distanceText: {
    fontSize: 20
  }
});

module.exports = Game;
