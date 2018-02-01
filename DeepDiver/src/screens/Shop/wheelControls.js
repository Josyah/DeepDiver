import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PanResponder
} from 'react-native';
import {GLOBALS} from '../../globals'
import {observer} from 'mobx-react/native';
@observer
class HandleTouch extends Component {
  constructor(props){
    super(props)
  }
  componentWillMount() {
    var initCircle = 0;
    var rotations = 0;
    var halfCircle = (GLOBALS.dimensions.width - 100 - 50)
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
      },
      onPanResponderMove: (evt, gestureState) => {
        var touchCoords = gestureState.x0;
        var minX = 50;
        var distanceMoved = gestureState.dx;
        if((this.props.store.wheelOffset > (halfCircle + (halfCircle *rotations)) )){
          rotations ++;
        }
        this.props.store.wheelOffset = initCircle+(distanceMoved);
        for(var i = 0; i < this.props.store.wheelItems.length; i++){
          var neededHeight;
          if(!this.props.store.wheelItems[i].behindWheel){
            neededHeight = 200;
          } else {
            neededHeight = 198;
          }
          var maxX = GLOBALS.dimensions.width - 50 -((this.props.store.wheelItems[i].tileWidth)*(neededHeight/this.props.store.wheelItems[i].tileHeight));
          var itemPosition = ((i*GLOBALS.wheelSpacing)+this.props.store.wheelOffset);
          if(itemPosition < (50) && (!this.props.store.wheelItems[i].behindWheel)){
            this.props.store.wheelItems[i].fromLeft = true;
            this.props.store.wheelItems[i].behindWheel = true;
          } else if(itemPosition > (maxX) && (!this.props.store.wheelItems[i].behindWheel)){
            this.props.store.wheelItems[i].behindWheel = true;
            this.props.store.wheelItems[i].fromLeft = false;
          } else if(itemPosition > (50) && itemPosition < (maxX)){

            this.props.store.wheelItems[i].behindWheel = false;
          }
        }
      },
      onPanResponderRelease: (e, {vx, vy}) => {
        initCircle = this.props.store.wheelOffset;
      }
    });
}
  render() {
    return (
        <View {...this._panResponder.panHandlers} style={styles.screen}>
          <Text></Text>
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
  },
  screen: {
    position: 'absolute',
    bottom:0,
    left: 0,
    height: 100,
    width: (GLOBALS.dimensions.width),
    backgroundColor: 'transparent'
  },
});

module.exports = HandleTouch;
