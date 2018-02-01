import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';
import {GLOBALS} from '../../globals';
import {observer} from 'mobx-react/native';
@observer
class Warning extends Component {
  constructor(props){
    super(props)
    this.state = {
      mounted: true
    }
  }
  componentDidMount(){
    this.setState({mounted: true})
  }
  componentWillUnmount(){
    this.setState({mounted: false})
  }

  render() {
    var renderWarning = () => {
      if(this.props.store.warning.visible){
        return (
          <View style={styles.container}>

            <View style={styles.container}>
              <Text style={styles.text}>{this.props.store.warning.text}</Text>
            </View>
            <View style={styles.overlay}></View>
          </View>
        )
      }
    }
    return (
      <View>
      {
        renderWarning()
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: GLOBALS.dimensions.height,
    width: GLOBALS.dimensions.width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    margin: 10,
    fontSize: 70,
    opacity: .85,
    fontFamily: GLOBALS.font,
    color: 'red',
    backgroundColor: 'transparent'
  },
  overlay: {
    opacity: .25,
    backgroundColor: 'red',
    height: GLOBALS.dimensions.height,
    width: GLOBALS.dimensions.width
  }
});

module.exports = Warning;
