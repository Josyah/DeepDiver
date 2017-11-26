import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import {World, Body} from 'react-game-kit/native';
import PropTypes from 'prop-types';
import Player from './player';
import Enemies from './enemies';
import {generateEnemies} from '../utils/generateEnemies';
import {observer} from 'mobx-react/native';
import {physicsInit} from '../utils/physics';
import Matter from 'matter-js'
@observer
class Game extends Component {
  constructor(props) {
    super(props);

    this.enemyPositions = generateEnemies();
    store = this.props.store;
  }
  handleUpdate = () => {
    store.player.position = this.player.body.position;
    if(store.forceUp!=0){
      Matter.Body.setVelocity(this.player.body, {x: 0, y: store.forceUp});
    }
    Matter.Events.on(this.player.body, 'collision', function(e) {
      console.log('collision')
    })
  }

  static contextTypes = {
    loop: PropTypes.object,
  };
  update(){
    store.moveBackground();
    //moves the background on every update
  };
  componentDidMount() {
    this.context.loop.subscribe(this.update);
  }
  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }
  render() {
    return (
      <World
        onInit={physicsInit}
        onUpdate={this.handleUpdate}
        gravity={{ x: 0, y: 2, scale: 0.0005 }}
        >
        <TouchableWithoutFeedback
          onPressIn={() => this.props.store.pressScreen()}
          onPressOut={() => this.props.store.releaseScreen()}
          style={styles.container}
          >
          <View style={styles.container}>
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
});

module.exports = Game;
