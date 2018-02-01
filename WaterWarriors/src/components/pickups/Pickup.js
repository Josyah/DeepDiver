import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated
} from 'react-native';
import {observer} from 'mobx-react/native';
import {GLOBALS} from '../../globals';
import PropTypes from 'prop-types';
import Matter from 'matter-js'
import {Sprite, Loop} from 'react-game-kit/native';
import {getOpacity} from '../../utils/getOpacity';
import {ifBetween} from '../../utils/ifBetween';
@observer
class Pickup extends Component {
  constructor(props){
    super(props)
    store = this.props.store
    this.state = {
      index: this.props.index,
      opacity: new Animated.Value(1),
    }
  }
  getPosition() {
      if(store.checkExists(store.pickups[this.props.index])){
        if(store.pickups[this.props.index].x > 0){
          // console.log(store.absPlayerPosition.x, store.absPlayerPosition.y, store.pickups[this.props.index].x, store.pickups[this.props.index].y - store.background.position.y)
        }
        return {
          position: 'absolute',
          left: store.pickups[this.props.index].x,
          bottom: store.pickups[this.props.index].y,
          transform: [
            {translateY: store.background.position.y},
          ],
          height: 35,
          width: 35,
        }
      }

}

  render() {
    var renderPickup = () => {
      if(!store.pickups[this.props.index].inHibernation){
        return (
            <Image
              source={store.pickups[this.props.index].src}
              style={this.getPosition()}
              />
        );
      }

    }
    return(
      <View style={{position: 'absolute'}}>
        {
          renderPickup()
        }
      </View>
    )
  }
}

module.exports = Pickup;
