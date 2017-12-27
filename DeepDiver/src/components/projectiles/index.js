import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PropTypes,
  Image
} from 'react-native';
import {observer} from 'mobx-react/native';
import { Body , Sprite} from 'react-game-kit/native';
import Harpoon from './Harpoon';
import {GLOBALS} from '../../globals';
@observer
class Projectile extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View>

        {
          this.props.store.projectiles.slice().map((eachProjectile, index) => {
            if(this.props.store.projectiles.length != 0){
              switch(eachProjectile.type){
                case 'HARPOON':
                return (
                  <Harpoon
                    store={store}
                    key={index}
                    index={index}
                    />
                );
                default:
                return (
                  <Harpoon
                    store={store}
                    key={index}
                    index={index}
                    />
                );

              }
            }
          })
        }
      </View>
    )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = Projectile;
