import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Enemy from './enemy';
import {observer} from 'mobx-react/native';
@observer
class Enemies extends Component {
  render() {
    return (
      <View style={styles.container}>
        {
          this.props.store.enemies.map((position, index, type) => {
          // console.log('POS'+this.props.store.enemies[index].position.x)
          if(this.props.store.enemies.length != 0){

            return (
              <Enemy
                key={index}
                index={index}
                position={this.props.store.enemies[index].position}
                dimensions={this.props.store.enemies[index].dimensions}
                type={type}
                store={this.props.store}
                />
            );
          }
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});

module.exports = Enemies;
