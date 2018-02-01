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
  constructor(props){
    super(props);
    store = this.props.store;
  }
  render() {
    return (
      <View>
        {
          // "map" means for each item in an array, return whatever
          // this returns an enemy for every item in the array
          store.enemies.map((eachEnemy, index) => {
            if(store.checkExists(store.enemies[index]) && !store.enemies[index].inHybernation){
              return (
                <Enemy
                  key={index}
                  index={index}
                  uniqueIdentifier={eachEnemy.uniqueIdentifier}
                  type={eachEnemy.type}
                  store={store}
                  />
              );
            }
          })

        }
      </View>
    );
  }
}

module.exports = Enemies;
