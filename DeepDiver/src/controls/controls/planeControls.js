import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PanResponder
} from 'react-native';
import {GLOBALS} from '../globals'
import {observer} from 'mobx-react/native';
@observer
class HandleTouch extends Component {
  constructor(props){
    super(props)
  }
  componentWillMount() {
    console.log('Started Handling Touches')
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        // console.log(gestureState.x0)
        var touchCoords = gestureState.x0
        // console.log(gestureState.x0)

        if(touchCoords < (GLOBALS.dimensions.width/2)){

          this.props.store.addProjectile()
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        // console.log(gestureState.x0)
        var touchCoords = gestureState.x0
        var distanceBetween = gestureState.dx
        if((touchCoords > GLOBALS.dimensions.width/2) && (distanceBetween > -50 && distanceBetween < 50)){
            // this.props.store.pressScreen('UP') //when button is pressed, it calls function pressScreen()
            // this.props.store.player.angle = (gestureState.dx/(5/4))
            // this.props.store.forceUp = -(gestureState.dx/5)
            // this.props.store.background.speed = (Math.abs((Math.abs(gestureState.dx))/(50/4) - 10) )
            this.props.store.movePlayer(distanceBetween)
        }
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderRelease: (e, {vx, vy}) => {
        this.props.store.releaseScreen() // when button is released, it calls function releaseScreen()
      }
    });
}
  render() {
    return (
      <View style={styles.buttons}>
        <View {...this._panResponder.panHandlers} style={styles.leftButton}>
          <Text></Text>
        </View>
        <View {...this._panResponder.panHandlers} style={styles.rightButton}>
          <Text></Text>
        </View>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    position: 'absolute',
    top:0,
    left: 0,
    height: GLOBALS.dimensions.height,
    width: GLOBALS.dimensions.width,
    backgroundColor: 'transparent'
  },
  leftButton: {
    position: 'absolute',
    top:0,
    left: 0,
    height: GLOBALS.dimensions.height,
    width: (GLOBALS.dimensions.width/2)
  },
  rightButton: {
    position: 'absolute',
    top:0,
    right: 0,
    height: GLOBALS.dimensions.height,
    width: (GLOBALS.dimensions.width/2)
  },
});

module.exports = HandleTouch;
