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
import Enemy from './enemies/Enemy'
import {GLOBALS} from '../globals'
@observer
class Enemies extends Component {
  render() {
    return (
      <View style={styles.container}>
        {
          // "map" means for each item in an array, return whatever
          // this returns an enemy for every item in the array
          this.props.store.enemies.map((eachEnemy, index) => {
            if(this.props.store.enemies.length != 0){

              switch(eachEnemy.enemyType){
                case 'HAMMERHEAD':
                  return (
                    <Enemy
                      key={index}
                      index={index}
                      position={this.props.store.enemies[index].position}
                      store={this.props.store}
                      distanceAway={25}
                      background={this.props.store.background}
                      tileHeight={GLOBALS.HammerHead.tileHeight}
                      tileWidth={GLOBALS.HammerHead.tileWidth}
                      steps={GLOBALS.HammerHead.steps}
                      src={require('../images/HammerHead.png')}
                      />
                  );
                case 'PIRANHA':
                  return (
                    <Enemy
                      key={index}
                      index={index}
                      position={this.props.store.enemies[index].position}
                      store={this.props.store}
                      distanceAway={25}
                      background={this.props.store.background}
                      tileHeight={GLOBALS.Piranha.tileHeight}
                      tileWidth={GLOBALS.Piranha.tileWidth}
                      steps={GLOBALS.Piranha.steps}
                      src={require('../images/PiranaCropped.png')}
                      />
                )
                case 'JELLYFISH':
                  return (
                    <Enemy
                      key={index}
                      index={index}
                      position={this.props.store.enemies[index].position}
                      store={this.props.store}
                      distanceAway={25}
                      background={this.props.store.background}
                      tileHeight={GLOBALS.JellyFish.tileHeight}
                      tileWidth={GLOBALS.JellyFish.tileWidth}
                      steps={GLOBALS.JellyFish.steps}
                      src={require('../images/Jellyfish-Glow.png')}
                      />
                  )
                case 'ELECTRICEEL':
                  return (
                    <Enemy
                      key={index}
                      index={index}
                      position={this.props.store.enemies[index].position}
                      store={this.props.store}
                      distanceAway={25}
                      background={this.props.store.background}
                      tileHeight={GLOBALS.ElectricEel.tileHeight}
                      tileWidth={GLOBALS.ElectricEel.tileWidth}
                      steps={GLOBALS.ElectricEel.steps}
                      src={require('../images/ElectricEel.png')}
                      />
                  )
                case 'STINGRAY':
                  return (
                    <Enemy
                      key={index}
                      index={index}
                      position={this.props.store.enemies[index].position}
                      store={this.props.store}
                      distanceAway={25}
                      background={this.props.store.background}
                      tileHeight={GLOBALS.StingRay.tileHeight}
                      tileWidth={GLOBALS.StingRay.tileWidth}
                      steps={GLOBALS.StingRay.steps}
                      src={require('../images/StingRay.png')}
                      />
                  )
                case 'PUFFER':
                  return (
                    <Enemy
                      key={index}
                      index={index}
                      position={this.props.store.enemies[index].position}
                      store={this.props.store}
                      distanceAway={25}
                      background={this.props.store.background}
                      tileHeight={GLOBALS.Puffer.tileHeight}
                      tileWidth={GLOBALS.Puffer.tileWidth}
                      steps={GLOBALS.Puffer.steps}
                      src={require('../images/Puffer.png')}
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
