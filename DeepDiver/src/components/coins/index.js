import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {observer} from 'mobx-react/native';
import CoinLayout from './CoinLayout';
@observer
class MapCoins extends Component {
  render() {
    return (
      <View>
        {
          this.props.store.coinLayoutArray.slice().map((eachEnemy, index) => {
            if(this.props.store.coinLayoutArray.length != 0){
              return (
                <CoinLayout
                  key={index}
                  index={index}
                  position={this.props.store.coinLayoutArray[index].position}
                  store={this.props.store}
                  distanceAway={15}
                  background={this.props.store.background}
                  />
              );
            }
        }
      )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});

module.exports = MapCoins;
