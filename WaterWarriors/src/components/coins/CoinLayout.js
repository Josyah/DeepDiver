import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {observer} from 'mobx-react/native';
import Coin from './Coin';
import {coinLayouts} from '../../utils/coinLayout';

@observer
class CoinLayout extends Component {
  constructor(props){
    super(props);
    store = this.props.store;
  }
  getPosition() {
    return {
      position: 'absolute',
      left: this.props.position.x,
      bottom: this.props.position.y,
      transform: [
        {translateY: store.background.position.y},
        {translateX: store.background.position.x},
      ],
    }
  }
  render() {
    return (
      <View style={this.getPosition()}>
        {

            store.coinArray.slice().map((eachCoin, index) => {
              if(store.coinArray.length != 0){
                return (
                  <Coin
                    key={index}
                    index={index}
                    position={eachCoin}
                    store={store}
                    distanceAway={30}
                    />
                );
              }
            })
      }
      </View>
    );
  }
}

module.exports = CoinLayout;
