import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Easing,
} from 'react-native';
import {observable} from 'mobx';
import {GLOBALS} from '../../globals';
import Loading from '../Loading';
import {observer} from 'mobx-react/native';

@observer
class Home extends Component {
  constructor(props){
    super(props)
    store = this.props.store
    this.state = {
      loaded: true,
      backgroundLoaded: false,
      iconLoaded: false,
      finished: false,
      arriorsLoaded: false,
      aterLoaded: false,
      startLoaded: false,
      optionsLoaded: false,
      storeLoaded: false,
      shouldHover: true,
      textOffset: new Animated.Value(GLOBALS.dimensions.height),
      iconOffset: new Animated.Value(GLOBALS.dimensions.height),
      buttonOffset: new Animated.Value(GLOBALS.dimensions.height),
      slidingOffset: new Animated.Value(GLOBALS.dimensions.width/4),
      secondSlidingOffset: new Animated.Value(GLOBALS.dimensions.width/2),
    }
  }
  fadeInIcon() {
    this.state.iconOffset.setValue(GLOBALS.dimensions.height)
    Animated.timing(
      this.state.iconOffset,
      {
        toValue: ((GLOBALS.dimensions.height/2)-100),
        duration: 1500,
        easing: Easing.easeOutBack
      }
    ).start(() => {
      this.hoverIconUp()
    })
  }
  hoverIconDown(){
    Animated.timing(
      this.state.iconOffset,
      {
        toValue: (GLOBALS.dimensions.height/2) -90,
        duration: 3000,
        easing: Easing.easeInOutBack
      }
    ).start(() => {
      this.hoverIconUp()
    })
  }
  hoverIconUp(){
    Animated.timing(
      this.state.iconOffset,
      {
        toValue: (GLOBALS.dimensions.height/2) -110,
        duration: 3000,
        easing: Easing.easeInOutBack
      }
    ).start(() => {
      if(this.state.shouldHover){
        this.hoverIconDown()
      }
    })
  }
  fadeInText() {
    this.state.textOffset.setValue(GLOBALS.dimensions.height)
    Animated.timing(
      this.state.textOffset,
      {
        toValue: (GLOBALS.dimensions.height/2.17),
        duration: 1500,
        easing: Easing.easeOutBack
      }
    ).start(() => {
      this.hoverTextDown()
      this.slideLeft()
    })
  }
  hoverTextDown(){
    Animated.timing(
      this.state.textOffset,
      {
        toValue: (GLOBALS.dimensions.height/2.17)-10,
        duration: 3000,
        easing: Easing.easeInOutBack
      }
    ).start(() => {
      if(this.state.shouldHover){
        this.hoverTextUp()
      }
    })
  }
  hoverTextUp(){
    Animated.timing(
      this.state.textOffset,
      {
        toValue: (GLOBALS.dimensions.height/2.17)+10,
        duration: 3000,
        easing: Easing.easeInOutBack
      }
    ).start(() => {
      if(this.state.shouldHover){
        this.hoverTextDown()
      }
    })
  }
  slideLeft(){
    Animated.timing(
      this.state.slidingOffset,
      {
        toValue: 0,
        duration: 2000,
        easing: Easing.easeInOutBack
      }
    ).start(() => {
    })
    Animated.timing(
      this.state.secondSlidingOffset,
      {
        toValue: 0,
        duration: 2300,
        easing: Easing.easeInOutBack
      }
    ).start(() => {
    })
  }
  render() {
    var renderLoading = () => {
      if(!((this.state.backgroundLoaded && this.state.iconLoaded) && (this.state.arriorsLoaded && this.state.aterLoaded) && (this.state.startLoaded && this.state.optionsLoaded) && (this.state.storeLoaded)) && !this.state.loaded){
        this.setState({loaded: true})
        this.fadeInIcon()
        this.fadeInText()
        return (
          <Loading />
        )
      }
    }
    return (
      <View style={styles.container}>
        <Image
          source={require('../../images/PurpleBckgrnd.png')}
          style={styles.background}
          onLoadStart={() => {
            this.setState({backgroundLoaded: false})
          }}
          onLoad={() => {
            this.setState({backgroundLoaded: true})
          }}
          />
          <Animated.View style={[
              {
                top: (this.state.textOffset),
                transform: [
                  {translateX: this.state.slidingOffset}
                ]
              },styles.titleContainer]}>
              <Image
                source={require('../../images/ater.png')}
                style={styles.ater}
                onLoadStart={() => {
                  this.setState({aterLoaded: false})
                }}
                onLoad={() => {
                  this.setState({aterLoaded: true})
                }}
                />
              <Image
                source={require('../../images/arriors.png')}
                style={styles.arriors}
                onLoadStart={() => {
                  this.setState({arriorsLoaded: false})
                }}
                onLoad={() => {
                  this.setState({arriorsLoaded: true})
                }}
                />
            </Animated.View>
          <Animated.Image
            source={require('../../images/Logo.png')}
            style={[{
              top: this.state.iconOffset,
              bottom: (GLOBALS.dimensions.height/2)-(GLOBALS.dimensions.width/4),
              height: GLOBALS.dimensions.width/4,
              width: GLOBALS.dimensions.width/4,
              left: this.state.slidingOffset,
              transform: [
                {translateX: GLOBALS.dimensions.width/30},

              ]
            }, styles.logo]}
            onLoadStart={() => {
              this.setState({iconLoaded: false})
            }}
            onLoad={() => {
              this.setState({iconLoaded: true})
            }}
            />
          <Animated.View style={[{
              transform: [
                {translateX: this.state.secondSlidingOffset}
              ]
            },styles.buttonContainer]}>
            <View style={{
                alignItems: 'center',
              }}>

              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.store.startGame()
                }}
                style={styles.overlap}>
                <View>

                  <Image
                    source={require('../../images/StartText.png')}
                    style={styles.start}
                    onLoadStart={() => {
                      this.setState({startLoaded: false})
                    }}
                    onLoad={() => {
                      this.setState({startLoaded: true})
                    }}
                    />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.props.store.navigationState = 'SETTINGS'}
                style={styles.overlap}>
                <View>
                  <Image
                    source={require('../../images/OptionsText.png')}
                    style={styles.options}
                    onLoadStart={() => {
                      this.setState({optionsLoaded: false})
                    }}
                    onLoad={() => {
                      this.setState({optionsLoaded: true})
                    }}
                    />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.props.store.navigationState = 'SHOP'}
                style={styles.overlap}>
                <View>
                  <Image
                    source={require('../../images/StoreText.png')}
                    style={styles.store}
                    onLoadStart={() => {
                      this.setState({storeLoaded: false})
                    }}
                    onLoad={() => {
                      this.setState({storeLoaded: true})
                    }}
                    />
                </View>
              </TouchableWithoutFeedback>
            </View>
            </Animated.View>
          {
            renderLoading()
          }
      </View>

    );
  }
}
const styles = StyleSheet.create({
container: {
  flex: 1,
  paddingTop: 20,
  backgroundColor: 'transparent'
},
titleContainer: {
  position: 'absolute',
  left: GLOBALS.dimensions.width/4.1,
},
logo: {
},
ater: {
  width: (3131/30),
  height: (2050/30),
  marginLeft: 30,
  position: 'absolute',
  top: 0
},
arriors: {
  width: 5296/27,
  height: 2050/27,
  position: 'absolute',
  top: 50,
  marginLeft: 10
},
buttonContainer: {
  position: 'absolute',
  right: 40,
  width: GLOBALS.dimensions.width/3.5,
  alignItems:'center',
  height: GLOBALS.dimensions.height,
  justifyContent:'center'
},
overlap: {
  marginTop: 45
},
start: {
  left: 0,
  height: 1145/23,
  width: 3162/23,
},
startBlur: {
  position: 'absolute',
  left: -10,
  top: -3,
  height: 1145/20,
  width: 3162/20,
},
options: {
  left: 0,
  height: 1144/23,
  width: 4247/23,
},
optionsBlur: {
  position: 'absolute',
  left: -12,
  top: -3,
  height: 1144/20,
  width: 4247/20,
},
store: {
  left: 0,
  height: 1144/23,
  width: 3210/23,
},
storeBlur: {
  position: 'absolute',
  left: -10,
  top: -3,
  height: 1144/20,
  width: 3210/20,
},
startText: {
  fontSize: 60,
  margin: 5,
  padding: 10,
  fontFamily: GLOBALS.font,
  color: 'black'
},
linkToPage: {
  fontSize: 35,
  margin: 5,
  padding: 10,
  fontFamily: GLOBALS.font,
  color: 'white'
},
multiplayerPage: {
  fontSize: 24,
  margin: 5,
  opacity: .7,
  borderWidth: 1,
  padding: 10,
  borderRadius: 5
},
storeButton: {
  position: 'absolute',
  bottom: 10,
  left: 10
},
settingsButton: {
  position: 'absolute',
  bottom: 10,
  right: 10
},
background: {
  position: 'absolute',
  height: GLOBALS.dimensions.height,
  width: GLOBALS.dimensions.width,
  resizeMode: 'cover'
},
sunRays: {
  position: 'absolute',
  top: 0,
  left: 0,
  height: GLOBALS.dimensions.height,
  width: GLOBALS.dimensions.width,
  resizeMode: 'cover'
},

});

module.exports = Home;
