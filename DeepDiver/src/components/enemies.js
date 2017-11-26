import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Enemy from './enemy';
class Enemies extends Component {
  onComponentWillMount(){
    console.log('enemies '+this.props.enemies)
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.enemies.map((position, index) => {

          return (
            <Enemy
              key={index}
              index={index}
              position={position}
              store={this.props.store}
            />
          );
        })}
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

module.exports = Enemies;
