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
class Dust extends Component {
  constructor(props){
    super(props)
    store = this.props.store
    this.dust = store.dust[this.props.index]
    this.state = {
      index: this.props.index,
      opacity: new Animated.Value((0.75/store.dust[this.props.index].layer)),
    }
  }
  fadeOut() {
    this.state.opacity.setValue((0.75/store.dust[this.props.index].layer))
    Animated.timing(
      this.state.opacity,
      {
        toValue: 0,
        duration: (Math.random() * 4000) + 300
      }
    ).start(() => {
      this.fadeIn()
    })
  }
  fadeIn() {
    this.state.opacity.setValue(0)
    Animated.timing(
      this.state.opacity,
      {
        toValue: (0.75/store.dust[this.props.index].layer),
        duration: (Math.random() * 4000) + 300
      }
    ).start(() => {
      this.fadeOut()
    })
  }
  componentDidMount(){
    this.fadeOut()
  }
  getPosition() {
      // console.log(this.dust.position.x, this.dust.position.y)
      if(store.checkExists(store.dust[this.props.index])){
        return {
          position: 'absolute',
          left: store.dust[this.props.index].x,
          bottom: store.dust[this.props.index].y,
          transform: [
            {translateY: store.background.position.y},
          ],
          backgroundColor: 'white',
          height: 5/store.dust[this.props.index].layer,
          width: 5/store.dust[this.props.index].layer,
          borderRadius: 15
        }
      }

}

  render() {
    var renderDust = () => {
          return (
              <Animated.View style={[this.getPosition(), {
                  opacity: this.state.opacity
                  }]}>
                <Text></Text>
              </Animated.View>
          );

    }
    return(
      <View>
        {
          renderDust()
        }
      </View>
    )
  }
}

module.exports = Dust;
