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
import IonIcons from 'react-native-vector-icons/Ionicons';

@observer
class Game extends Component {
  constructor(props) {
    super(props);

    this.enemyPositions = generateEnemies();
    store = this.props.store;
  }
  handleUpdate = (engine) => {
    store.player.position = this.player.body.position;
    if(store.forceUp!=0){
      Matter.Body.setVelocity(this.player.body, {x: 0, y: store.forceUp});
    }
    store.moveBackground();
  }
  onCollision(e){
    console.log('COLLIDED', e.pairs[0].id)
    // if(e.pairs[0].id=='A26B28'){
    //   console.log('HIT CEILING')
    // }
    // if(e.pairs[0].id=='A26B27'){
    //   console.log('HIT FLOOR')
    // }
    // else{
    //   console.log('HIT ENEMY')
    // }

  }

  render() {
    return (
      <World
        onInit={physicsInit}
        onUpdate={this.handleUpdate}
        onCollision={this.onCollision}
        gravity={{ x: 0, y: 2, scale: 0.0005 }}
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
                style={{margin: 10}}
              />
            </TouchableOpacity>
            <Enemies
              store={this.props.store}
              enemies={this.enemyPositions}
              />
            <Body
              shape="rectangle"
              args={[50, 0, 75, 75]}
              friction={0}
              frictionStatic={0}
              restitution={0}
              ref={(b) => { this.player = b; }}
            >
              <Player
                store={store}
                />
            </Body>
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
  },
});

module.exports = Game;
