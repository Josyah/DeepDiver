import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {observer} from 'mobx-react/native';
import {GLOBALS} from '../globals'
@observer
class Background extends Component {
  constructor(props){
    super(props)
    this.state = {
      mounted: false,
    }
  }
  backgroundPosition(startX, startY, repeat){
    if(this.state.mounted){
      return{
        position: 'absolute',
        left: startX + this.props.store.background.position.x,
        bottom: startY - this.props.store.background.position.y,
        transform: [
          {translateX: (repeat) ? (this.props.store.background.offset.x) : (0)},
        ]
      }
    }
  }
  getComponentPosition(startX, startY, index, layer){
    if(this.state.mounted){
      return{
        position: 'absolute',
        left: startX,
        bottom: startY - this.props.store.background.position.y,
        zIndex: -layer,
        transform: [
          {translateX: this.props.store.backgroundComponents[index].x}
        ]
      }
    }
  }
  componentWillUnmount(){
    this.setState({mounted: false})
  }
  componentDidMount(){
    this.setState({mounted: true})
  }
  render() {
    return (
      <View
        style={styles.container}
        >
        <Image
          source={require('../images/background/Ocean.png')}
          style={[this.backgroundPosition(0, 0, true),
            {
              height: GLOBALS.initBackgroundDimensions.height,
              width: GLOBALS.initBackgroundDimensions.width
            }
          ]}
          onLoad={() => {
            this.props.store.background.loaded = true
          }}
          />
        {
          this.props.store.backgroundComponents.slice().map((eachComponent, index) => {
            return (
              <Image
                source={eachComponent.src}
                style={[this.getComponentPosition(eachComponent.x, eachComponent.y, index, eachComponent.layer)]}
                key={index}
                />
            )
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});

module.exports = Background;
