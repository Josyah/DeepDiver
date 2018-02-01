import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {observer} from 'mobx-react/native';
import {GLOBALS} from '../../globals'
import Point from './Point'
@observer
class Points extends Component {
  render() {
    return (
      <View>
        {
          // "map" means for each item in an array, return whatever
          // this returns an enemy for every item in the array
          this.props.store.points.slice().map((eachPoint, index) => {
            return (
              <Point
                key={index}
                index={index}
                position={eachPoint}
                store={this.props.store}
                text={eachPoint.text}
                />
            );
          })

        }
      </View>
    );
  }
}

module.exports = Points;
