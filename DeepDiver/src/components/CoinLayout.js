import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {observer} from 'mobx-react/native';
import Coin from './Coin';
import {coinLayouts} from '../utils/coinLayout';

@observer
class CoinLayout extends Component {
  getPosition() {
    return {
      position: 'absolute',
      left: this.props.position.x,
      bottom: this.props.position.y,
      transform: [
        {translateY: this.props.store.background.position.y},
        {translateX: this.props.store.background.position.x},
      ],
    }
  }
  render() {
    return (
      <View style={this.getPosition()}>
        {
          this.props.store.coinArray.map((eachCoin, index) => {
            return (
              <Coin
                key={index}
                index={index}
                position={eachCoin}
                store={this.props.store}
                distanceAway={30}
                />
            );
        })}
      </View>
    );
  }
}

module.exports = CoinLayout;
