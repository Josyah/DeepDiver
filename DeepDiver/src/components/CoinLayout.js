import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import HammerHead from './enemies/HammerHead';
import Piranha from './enemies/Piranha';
import JellyFish from './enemies/JellyFish';
import {observer} from 'mobx-react/native';
import Coin from './Coin';
import {coinLayouts} from '../utils/coinLayout'
@observer
class CoinLayout extends Component {
  render() {
    return (
      <View style={styles.container}>
        {
          coinLayouts.MicahLayout.map((eachCoin, index) => {

            return (
              <Coin
              key={index}
              index={index}
              position={eachCoin}
              store={this.props.store}
              distanceAway={15}
              />
            );



        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});

module.exports = CoinLayout;
