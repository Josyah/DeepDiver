import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {observer} from 'mobx-react/native';
import {Body} from 'react-game-kit/native';
import {GLOBALS} from '../globals';
import PropTypes from 'prop-types';
import Matter from 'matter-js'
@observer
class Enemy extends Component {
  constructor(props){
    super(props)
    this.state = {
      index: this.props.index,
      doneLoading: false
    }
  }
  getPosition() {
    // console.log('POSs',this.props.position.x)
      return {
        left: this.props.store.enemies[this.props.index].position.x,
        bottom: this.props.store.enemies[this.props.index].position.y,
        height: this.props.store.enemies[this.props.index].dimensions.height,
        width: this.props.store.enemies[this.props.index].dimensions.width,
      }

  }
  render() {
      return (
          <Image
            source={require('../images/PiranaCropped.png')}
            style={[this.getPosition()]}
            />
      );
    }

}

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'red',
    position: 'absolute',
    backgroundColor: 'red',
    zIndex: 4
  },
});

module.exports = Enemy;
