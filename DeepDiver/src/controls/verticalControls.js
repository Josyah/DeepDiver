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
    var offset = 0;
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        var touchCoords = gestureState.x0;
      },
      onPanResponderMove: (evt, gestureState) => {
        var touchCoords = gestureState.x0;
        var distanceBetween = gestureState.dy;
        if((touchCoords > GLOBALS.dimensions.width/2)){
          if((distanceBetween > -GLOBALS.sensitivity && distanceBetween < GLOBALS.sensitivity)){
            if(!this.props.inverted){
              this.props.store.movePlayer((distanceBetween + offset)*(50/GLOBALS.sensitivity));
            } else {
              this.props.store.movePlayer(-(distanceBetween)*(50/GLOBALS.sensitivity));
            }
          }
        }
      },
      onPanResponderRelease: (e, {vx, vy}) => {
        this.props.store.releaseScreen();
        offset = 0
      }
    });
}
  render() {
    return (
      <View style={styles.buttons}>
        <View style={styles.leftButton}
          onTouchEnd={()=>this.props.store.addProjectile()}
          >
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
