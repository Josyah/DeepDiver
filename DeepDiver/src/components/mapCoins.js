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
import CoinLayout from './CoinLayout';
@observer
class MapCoins extends Component {
  render() {
    return (
      <View style={styles.container}>
        {
          this.props.store.coinArray.map((eachEnemy, index) => {
            if(this.props.store.coinArray.length != 0){

                return (
                  <CoinLayout
                  key={index}
                  index={index}
                  position={this.props.store.coinArray[index].position}
                  store={this.props.store}
                  distanceAway={15}
                  background={this.props.store.background}
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

module.exports = MapCoins;
