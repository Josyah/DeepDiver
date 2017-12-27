import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
var PropTypes = require('prop-types');
class Game extends Component {
  constructor(props) {
    super(props);
    store = this.props.store;
    this.state = {
      mounted: false
    }
  }

  componentWillUnmount(){
    this.context.loop.unsubscribe(this.handleUpdate);
    this.setState({mounted: false})
  }

  componentDidMount(){
    this.context.loop.subscribe(this.handleUpdate);
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
        store.checkCollisions();
        store.checkRegion();
    }
  }
  static contextTypes = {
    loop: PropTypes.object,
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
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
