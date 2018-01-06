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
  onLoadEnd(x){
    this.props.store.background.loaded = true
    this.props.store.background.loading = true
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
          onLoadEnd={this.onLoadEnd()}
          />
        {
          this.props.store.backgroundComponents.slice().map((eachComponent, index) => {
            <Image
              source={eachComponent.src}
              style={[this.backgroundPosition(eachComponent.x, eachComponent.y, false)]}
              key={index}
              />
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

module.exports = Background;
