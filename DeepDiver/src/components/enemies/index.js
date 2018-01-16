import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {observer} from 'mobx-react/native';
import Enemy from './Enemy'
import {GLOBALS} from '../../globals'
@observer
class Enemies extends Component {
  render() {
    return (
      <View>
        {
          // "map" means for each item in an array, return whatever
          // this returns an enemy for every item in the array
          this.props.store.enemies.map((eachEnemy, index) => {
            console.log(eachEnemy.uniqueIdentifier, eachEnemy.type, index)
            return (
              <Enemy
                key={index}
                index={index}
                uniqueIdentifier={eachEnemy.uniqueIdentifier}
                type={eachEnemy.type}
                store={this.props.store}
                />
            );
          })

        }
      </View>
    );
  }
}

module.exports = Enemies;
