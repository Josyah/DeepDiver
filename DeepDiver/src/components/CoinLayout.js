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
  getPosition() {
    // console.log('Position',this.props.position.x)
    return {
      position: 'absolute',
      left: this.props.position.x,
      bottom: this.props.position.y,
      transform: [
        {translateY: this.props.store.background.position.y},
      ],
    }
  }
  render() {
    return (
      <View style={[styles.container, this.getPosition()]}>
        {
          coinLayouts.SquareLayout.map((eachCoin, index) => {

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

const styles = StyleSheet.create({
  container: {

  },
});

module.exports = CoinLayout;
