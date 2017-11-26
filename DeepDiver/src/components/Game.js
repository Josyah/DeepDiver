import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';
import Player from './player';
import Enemies from './enemies';
import {generateEnemies} from '../funcs/generateEnemies';
import {observer} from 'mobx-react/native';
class Game extends Component {
  constructor(props) {
    super(props);
    this.enemyPositions = generateEnemies();
    store = this.props.store;
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
      <TouchableWithoutFeedback
        onPress={() => this.props.store.pressScreen()}
        style={styles.container}
        >
        <View style={styles.container}>
          <Enemies
            store={this.props.store}
            enemies={this.enemyPositions}
            />
          <Player
            store={this.props.store}
            />
        </View>
        </TouchableWithoutFeedback>
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
