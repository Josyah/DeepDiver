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
@observer
class Enemies extends Component {
  render() {
    return (
      <View style={styles.container}>
        {
          this.props.store.enemies.map((eachEnemy, index) => {
            if(this.props.store.enemies.length != 0){

              switch(eachEnemy.enemyType){
                case 'HAMMERHEAD':
                return (
                  <HammerHead
                  key={index}
                  index={index}
                  position={this.props.store.enemies[index].position}
                  store={this.props.store}
                  distanceAway={25}
                  background={this.props.store.background}
                  />
                );
                case 'PIRANHA':
                return (
                  <Piranha
                  key={index}
                  index={index}
                  position={eachEnemy.position}
                  store={this.props.store}
                  distanceAway={50}
                  />
                )
                case 'JELLYFISH':
                return (
                  <JellyFish
                  key={index}
                  index={index}
                  position={eachEnemy.position}
                  store={this.props.store}
                  distanceAway={50}
                  />
                )
              }
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

module.exports = Enemies;
