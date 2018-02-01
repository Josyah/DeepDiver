import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {observer} from 'mobx-react/native';
import {GLOBALS} from '../../globals'
import Bubble from './Bubble'
@observer
class Bubbles extends Component {
  render() {
    return (
      <View>
        {
          // "map" means for each item in an array, return whatever
          // this returns an enemy for every item in the array
          this.props.store.bubbles.slice().map((eachBubble, index) => {
            return (
              <Bubble
                key={index}
                index={index}
                position={eachBubble}
                store={this.props.store}
                />
            );
          })

        }
      </View>
    );
  }
}

module.exports = Bubbles;
