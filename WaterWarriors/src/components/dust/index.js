import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {observer} from 'mobx-react/native';
import Dust from './Dust'
import {GLOBALS} from '../../globals'
@observer
class Particles extends Component {
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
          store.dust.map((eachDust, index) => {
              return (
                <Dust
                  key={index}
                  index={index}
                  store={store}
                  />
              );

          })

        }
      </View>
    );
  }
}

module.exports = Particles;
