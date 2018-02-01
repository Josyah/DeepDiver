import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Animated,
  PanResponder
} from 'react-native';
import SelectorButton from '../selectorButton';
import WheelControls from './wheelControls';
import {GLOBALS} from '../../globals';
import {observer} from 'mobx-react/native';
@observer
class Shop extends Component {
  constructor(props){
    super(props);
    this.state = {
      drawerOffset: new Animated.Value(-GLOBALS.dimensions.width/2),
      wheelOffsetY: new Animated.Value(75),
      playerScale: new Animated.Value(1),
      selectedCharacterOffset: new Animated.Value(-GLOBALS.dimensions.width),
      title: new Animated.Value(-100),
      stats: new Animated.Value(-GLOBALS.dimensions.height),
      selected: true,
      selectedCharacter: 0,
      neededHeight: 200
    }
  }
  drawerFlyIn() {
    this.state.drawerOffset.setValue(-GLOBALS.dimensions.width/2)
    Animated.timing(
      this.state.drawerOffset,
      {
        toValue: 0,
        duration: 300
      }
    ).start(() => console.log('done'))
  }
  drawerFlyOut() {
    this.state.drawerOffset.setValue(0)
    Animated.timing(
      this.state.drawerOffset,
      {
        toValue: -GLOBALS.dimensions.width/2,
        duration: 300
      }
    ).start(() => console.log('done'))
  }
  wheelFlyIn() {
    this.state.wheelOffsetY.setValue(-GLOBALS.dimensions.height)
    Animated.timing(
      this.state.wheelOffsetY,
      {
        toValue: 75,
        duration: 300
      }
    ).start(() => console.log('done'))
  }
  wheelFlyOut() {
    this.state.wheelOffsetY.setValue(75)
    Animated.timing(
      this.state.wheelOffsetY,
      {
        toValue: -GLOBALS.dimensions.height,
        duration: 300
      }
    ).start(() => console.log('done'))
  }
  characterFlyIn() {
    this.state.selectedCharacterOffset.setValue(-GLOBALS.dimensions.width)
    Animated.timing(
      this.state.selectedCharacterOffset,
      {
        toValue: 200,
        duration: 300
      }
    ).start(() => console.log('done'))
  }
  characterFlyOut() {
    this.state.selectedCharacterOffset.setValue(200)
    Animated.timing(
      this.state.selectedCharacterOffset,
      {
        toValue: -GLOBALS.dimensions.width,
        duration: 300
      }
    ).start(() => console.log('done'))
  }
  makeCharacterHuge(){
    this.state.playerScale.setValue(.5)
    Animated.timing(
      this.state.playerScale,
      {
        toValue: 1,
        duration: 300
      }
    ).start(() => console.log('done'))
  }
  makeCharacterSmall(){
    this.state.playerScale.setValue(1)
    Animated.timing(
      this.state.playerScale,
      {
        toValue: .5,
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
      this.wheelFlyOut();
      this.characterFlyIn();
      this.drawerFlyIn();
      this.makeCharacterHuge();
      this.titleAppear();
      this.statsAppear();
      this.state.selected = false;
    } else {
      this.wheelFlyIn();
      this.characterFlyOut();
      this.drawerFlyOut();
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
  getWheelPosition(){
    return {
      position: 'absolute',
      bottom: 0,
      width: GLOBALS.dimensions.width,
      height: GLOBALS.dimensions.height,
      padding: 50,
    }
  }
  render() {
    return (
      <View style={styles.container}>

          <Image
            source={require('../../images/AltSky.png')}
            style={styles.background}
            />
          <View style={styles.topBar}>
            <Text style={styles.harpoonText}>{this.props.store.shop.harpoons} harpoons</Text>
            <Text style={styles.coinText}>{this.props.store.coins} coins</Text>
          </View>

          <View  style={[this.getWheelPosition()]}>
            {
              this.props.store.wheelItems.map((eachItem, index) => {
                var xPosition = GLOBALS.wheelSpacing*index
                return(
                  <Animated.View
                    style={{
                      backgroundColor: 'transparent',
                      position: 'absolute',
                      width: eachItem.tileWidth*(((eachItem.behindWheel) ? (198) : (200))/eachItem.tileHeight),
                      height: eachItem.tileHeight*(((eachItem.behindWheel) ? (198) : (200))/eachItem.tileHeight),
                      zIndex: (eachItem.behindWheel) ? (-1) : (1),
                      transform: [
                        {translateX: (eachItem.behindWheel) ? (-this.props.store.wheelOffset) : (this.props.store.wheelOffset)},
                      ],
                      bottom: this.state.wheelOffsetY,
                      left: (eachItem.behindWheel) ? ((eachItem.fromLeft) ? (-xPosition+100) : (-xPosition+(GLOBALS.dimensions.width*2) -200-(eachItem.tileWidth*(((eachItem.behindWheel) ? (198) : (200))/eachItem.tileHeight)))) : (xPosition),
                    }}
                    key={index}>

                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          selectedCharacter: index
                        })
                        this.state.selected = true;
                        this.selectedCharacter();
                      }}
                      >

                      <Image
                        source={eachItem.src}
                        style={{
                          bottom: 0,
                          height: eachItem.tileHeight*(((eachItem.behindWheel) ? (198) : (200))/eachItem.tileHeight),
                          width: eachItem.tileWidth*(((eachItem.behindWheel) ? (198) : (200))/eachItem.tileHeight),
                          resizeMode: 'stretch',
                          opacity: (eachItem.behindWheel) ? (.5) : (1),
                        }}
                        />
                    </TouchableOpacity>
                  </Animated.View>

                )
              })
            }
          </View>
          <WheelControls
            store={this.props.store}
            />
          <Animated.View style={[{
              position: 'absolute',
              bottom: 0,
              left: this.state.selectedCharacterOffset,
              transform: [
                {scaleY: this.state.playerScale},
                {scaleX: this.state.playerScale},
              ]
            }]}>
            <TouchableOpacity
              onPress={()=> {
                this.state.selected = false;
                this.selectedCharacter();
              }}
              >
              <Image
                source={this.props.store.wheelItems[this.state.selectedCharacter].src}
                />
              <Text>{this.props.store.wheelItems[this.state.selectedCharacter].name}</Text>
              <TouchableOpacity style={styles.item}
                onPress={() => {
                  this.props.store.buy(this.props.store.wheelItems[this.state.selectedCharacter].name)
                }}
                >
                <View style={styles.buyButton}>
                  <Text style={styles.buyButtonText}>
                    Buy
                  </Text>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[{right: this.state.drawerOffset}, this.getDrawerPosition()]}>
            <View>
            </View>
          </Animated.View>
            <TouchableOpacity
              onPress={() => this.props.store.navigationState = 'HOME'}
              style={styles.backButton}
              >
              <Text>Back</Text>
            </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: GLOBALS.dimensions.height,
    width: GLOBALS.dimensions.width,
    paddingTop: 40,
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    height: GLOBALS.dimensions.height,
    width: GLOBALS.dimensions.width,
    resizeMode: 'cover'
  },
  characterWheel: {

  },
  drawer: {
    marginTop: 50
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    justifyContent: 'center'
  },
  statTitle: {
    fontFamily: GLOBALS.font,
    color: 'white',
    fontSize: 25
  },
  bar: {
    borderWidth: 1,
    height: 10,
    width: 50,
    backgroundColor: 'white',
    margin: 5,
    marginLeft: 0
  },
  emptyBar: {
    borderWidth: 1,
    height: 10,
    width: 50,
    borderColor: 'grey',
    backgroundColor: 'black',
    margin: 5,
    marginLeft: 0
  },
  upgradeButton: {
    borderWidth: 1,
    height: 50,
    width: 50,
    borderColor: 'grey',
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 5,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  upgradeText: {
    fontFamily: GLOBALS.font,
    color: 'black',
    fontSize: 35
  },
  buyButton: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 5,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buyButtonText: {
    fontFamily: GLOBALS.font,
    color: 'black',
    fontSize: 35
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12
  },
  topBar: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row'
  },
  coinText: {
    fontFamily: GLOBALS.font,
    fontSize: 30,
    color: 'white',
    margin: 5,
    padding: 1,
    marginHorizontal: 10
  },
  harpoonText: {
    fontFamily: GLOBALS.font,
    fontSize: 30,
    color: 'white',
    margin: 5,
    padding: 1,
    marginHorizontal: 10
  },
  touches: {
    position: 'absolute',
    top:0,
    left: 0,
    height: GLOBALS.dimensions.height,
    width: GLOBALS.dimensions.width,
    backgroundColor: 'transparent'
  }
});

module.exports = Shop;
