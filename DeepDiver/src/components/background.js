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
  backgroundPosition(){
    if(this.state.mounted){
      return{
        position: 'absolute',
        left: this.props.store.background.position.x,
        bottom: -this.props.store.background.position.y,
        height: GLOBALS.initBackgroundDimensions.height,
        width: GLOBALS.initBackgroundDimensions.width,
        transform: [
          {translateX: this.props.store.background.offset.x},
          {rotate: '180deg'}
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
          source={require('../images/Ocean.png')}
          style={[this.backgroundPosition()]}
          onLoadEnd={this.onLoadEnd()}
          />
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
