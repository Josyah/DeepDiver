import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import Player from './player';
import Enemy from './enemy';
class Game extends Component {
  static contextTypes = {
    loop: PropTypes.object,
  };
  update = () => {
    this.props.store.moveBackground();
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
      <View style={styles.container}>
        <Enemy store={this.props.store}/>
        <Player store={this.props.store}/>
      </View>
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
