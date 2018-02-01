import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';
import SelectorButton from '../selectorButton';
import {GLOBALS} from '../../globals'
class Shop extends Component {
  constructor(props){
    super(props);
    this.state = {
      offset: new Animated.Value(0),
      playerScale: new Animated.Value(1),
      title: new Animated.Value(-100),
      stats: new Animated.Value(-GLOBALS.dimensions.height),
      selected: true
    }
  }

  conponentDidMount(){
  }
  flyOut() {
    this.state.offset.setValue(0)
    Animated.timing(
      this.state.offset,
      {
        toValue: -GLOBALS.dimensions.width/2,
        duration: 300
      }
    ).start(() => console.log('done'))
  }
  flyIn() {
    this.state.offset.setValue(-GLOBALS.dimensions.width/2)
    Animated.timing(
      this.state.offset,
      {
        toValue: 0,
        duration: 300
      }
    ).start(() => console.log('done'))
  }
  makeCharacterHuge(){
    this.state.playerScale.setValue(1)
    Animated.timing(
      this.state.playerScale,
      {
        toValue: 1.5,
        duration: 300
      }
    ).start(() => console.log('done'))
  }
  makeCharacterSmall(){
    this.state.playerScale.setValue(1.5)
    Animated.timing(
      this.state.playerScale,
      {
        toValue: 1,
        duration: 200
      }
    ).start(() => console.log('done'))
  }
  titleAppear(){
    this.state.title.setValue(10)
    Animated.timing(
      this.state.title,
      {
        toValue: -100,
        duration: 3000
      }
    )
  }
  titleDisappear(){
    this.state.title.setValue(-100)
    Animated.timing(
      this.state.title,
      {
        toValue: 10,
        duration: 100
      }
    )
  }
  statsAppear(){
    this.state.stats.setValue(-GLOBALS.dimensions.height)
    Animated.timing(
      this.state.stats,
      {
        toValue: 0,
        duration: 1000
      }
    )
  }
  selectedCharacter(){
    if(this.state.selected){
      this.flyOut();
      this.makeCharacterHuge();
      this.titleAppear();
      this.statsAppear();
      this.state.selected = false;
    } else {
      this.flyIn();
      this.makeCharacterSmall();
      this.titleDisappear();
      this.state.selected = true;
    }
  }
  getDrawerPosition(){
    return {
      position: 'absolute',
      bottom: 0,
      width: GLOBALS.dimensions.width/2,
      height: GLOBALS.dimensions.height,
      padding: 20,
      paddingTop: 50
    }
  }
  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity
            onPress={() => this.props.store.navigationState = 'HOME'}
            style={styles.backButton}
            >
            <Text>Home</Text>
          </TouchableOpacity>
          <Text style={styles.coinText}>{this.props.store.coins} coins</Text>
          <TouchableOpacity onPress={() => this.selectedCharacter()} style={styles.characterWheel}>
            <Animated.Text style={{
                position: 'absolute',
                top: this.state.title,
                fontFamily: GLOBALS.font,
                color: 'white',
                fontSize: 50
              }}>
              SeaLord
            </Animated.Text>
            <Animated.Image
              source={require('../../images/SeaLordStatic.png')}
              style={{
                transform: [
                  {scaleY: this.state.playerScale},
                  {scaleX: this.state.playerScale}
                ]
            }}
              />
          </TouchableOpacity >
          <Animated.View style={[{right: this.state.offset}, this.getDrawerPosition()]}>
            <View style={styles.row}>
              <View style={styles.item}></View>
              <View style={styles.item}></View>
              <View style={styles.item}></View>
            </View>
            <View style={styles.row}>
              <View style={styles.item}></View>
              <View style={styles.item}></View>
              <View style={styles.item}></View>
            </View>
            <View style={styles.row}>
              <View style={styles.item}></View>
              <View style={styles.item}></View>
              <View style={styles.item}></View>
            </View>
          </Animated.View>
          <Animated.View style={[{
              bottom: this.state.stats,
              left: GLOBALS.dimensions.width/3,
              justifyContent: 'center',
              alignItems: 'center',
            }, this.getDrawerPosition()]}>
          </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#3a9bdc',
    flexDirection: 'row'
  },
  characterWheel: {
    width: GLOBALS.dimensions.width/2,
    height: GLOBALS.dimensions.height,
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawer: {
    marginTop: 50
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderColor: 'white'
  },
  item: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 25,
    margin: 5
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12
  },
  coinText: {
    fontFamily: GLOBALS.font,
    fontSize: 30,
    color: 'white',
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 5,
    padding: 1
  }
});

module.exports = Shop;
