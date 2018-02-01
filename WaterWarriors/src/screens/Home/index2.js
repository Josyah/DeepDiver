import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Easing,
} from 'react-native';
import {GLOBALS} from '../../globals';
import DailyRewards from '../../components/dailyRewards';
import Loading from '../Loading';
import {observer} from 'mobx-react/native';
var lastX = -1
@observer
class Home extends Component {
  constructor(props){
    super(props)
    store = this.props.store
    this.state = {
      loading: true,
      finished: false,
      loadedParts: 0,
      shouldHover: true,
      textOffset: new Animated.Value(GLOBALS.dimensions.height),
      iconOffset: new Animated.Value(GLOBALS.dimensions.height),
      buttonOffset: new Animated.Value(GLOBALS.dimensions.height),
      mounted: true
    }
  }
  componentWillMount(){
    this.setState({loading: true})
  }
  componentWillUnmount(){
    this.setState({mounted: false})
  }
  fadeOut(){
    this.setState({shouldHover: false})
    Animated.timing(
      this.state.iconOffset,
      {
        toValue: GLOBALS.dimensions.height,
        duration: 500,
        easing: Easing.easeOutBack
      }
    ).start(() => {

    })
    Animated.timing(
      this.state.textOffset,
      {
        toValue: GLOBALS.dimensions.height,
        duration: 500,
        easing: Easing.easeOutBack
      }
    ).start(() => {
    })
    Animated.timing(
      this.state.buttonOffset,
      {
        toValue: GLOBALS.dimensions.height,
        duration: 500,
        easing: Easing.easeOutBack
      }
    ).start(() => {
      this.props.store.startGame()
    })
  }
  tryToMove(x){
    if(x != lastX){
      this.state.loadedParts++
    }
    if(this.state.loadedParts >= 7 && !this.state.finished){
      this.fadeInText()
      this.fadeInIcon()
      this.fadeInButtons()
      this.setState({finished: true})
    }
    lastX = x
  }

  fadeInIcon() {
    this.state.iconOffset.setValue(GLOBALS.dimensions.height)
    Animated.timing(
      this.state.iconOffset,
      {
        toValue: ((GLOBALS.dimensions.height/2)-100),
        duration: 1750,
        easing: Easing.easeOutBack
      }
    ).start(() => {
      if(this.state.shouldHover){
        this.hoverIconDown()
      }
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
        duration: 2000,
        easing: Easing.easeOutBack
      }
    ).start(() => {
      if(this.state.shouldHover){
        this.hoverTextUp()
      }
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
  fadeInButtons() {
    this.state.buttonOffset.setValue(GLOBALS.dimensions.height)
    Animated.timing(
      this.state.buttonOffset,
      {
        toValue: (45),
        duration: 2000,
        easing: Easing.easeOutBack
      }
    ).start(() => {
      if(this.state.shouldHover){
        this.hoverButtonsUp()
      }
    })
  }
  hoverButtonsDown(){
    Animated.timing(
      this.state.buttonOffset,
      {
        toValue: 35,
        duration: 3000,
        easing: Easing.easeInOutBack
      }
    ).start(() => {
    })
  }
  hoverButtonsUp(){
    Animated.timing(
      this.state.buttonOffset,
      {
        toValue: 55,
        duration: 3000,
        easing: Easing.easeInOutBack
      }
    ).start(() => {
    })
  }
  render() {
    var renderLoading = () => {
      if(this.state.loading){
        return (
          <Loading />
        )
      }
    }
    var renderHome = () => {

            return (
              <View style={styles.container}>
                <Image
                  source={require('../../images/PurpleBkgrnd.png')}
                  style={styles.background}
                  onLoadStart={() => {
                  }}
                  onLoad={() => {
                    console.log('FINISHED LOADING')
                    this.setState({loading: false})
                    this.tryToMove(6)
                  }}
                  />
                <Image
                  source={require('../../images/SunRays.png')}
                  style={styles.sunRays}
                  />
                <Animated.Image
                  source={require('../../images/Logo.png')}
                  style={[{top: this.state.iconOffset}, styles.logo]}
                  />
                <Animated.View style={[
                    {
                      top: (this.state.textOffset)
                    },styles.titleContainer]}>
                    <Image
                      source={require('../../images/ater.png')}
                      style={styles.ater}
                      />
                    <Image
                      source={require('../../images/arriors.png')}
                      style={styles.arriors}
                      />
                  </Animated.View>
                  <View style={[{top: 35},styles.buttonContainer]}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        this.fadeOut()

                      }}
                      style={styles.overlap}>
                      <View>

                        <Image
                          source={require('../../images/StartText.png')}
                          style={styles.start}
                          onLoad={() => {
                            this.tryToMove(0)
                          }}
                          />
                        <Image
                          source={require('../../images/StartBlur.png')}
                          style={styles.startBlur}
                          onLoad={() => {
                            this.tryToMove(1)
                          }}
                          />
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity
                      onPress={() => this.props.store.navigationState = 'SETTINGS'}
                      style={styles.overlap}>
                      <Image
                        source={require('../../images/OptionsText.png')}
                        style={styles.options}
                        onLoad={() => {
                          this.tryToMove(2)
                        }}
                        />
                      <Image
                        source={require('../../images/OptionsBlur.png')}
                        style={styles.optionsBlur}
                        onLoad={() => {
                          this.tryToMove(3)
                        }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.props.store.navigationState = 'SHOP'}
                      style={styles.overlap}>
                      <Image
                        source={require('../../images/StoreText.png')}
                        style={styles.store}
                        onLoad={() => {
                          this.tryToMove(4)
                        }}
                        />
                      <Image
                        source={require('../../images/StoreBlur.png')}
                        style={styles.storeBlur}
                        onLoad={() => {
                          this.tryToMove(5)
                        }}
                        />
                    </TouchableOpacity>
                  </View>

                </View>
              );

    }
    var renderDailyRewards = () => {
      if(this.props.store.getRewarded == true && !this.state.loading){
        return (
          <DailyRewards store={this.props.store}/>
        )
      }
    }
    return(
      <View>
        {
          renderLoading()
        }
        {
          renderHome()
        }
        {
          renderLoading()
        }
      </View>
    )
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
    position: 'absolute',
    bottom: (GLOBALS.dimensions.height/2)-100,
    left: (GLOBALS.dimensions.width/6.7) -100,
    width: 200,
    height: 200,
  },
  ater: {
    width: 3131/30,
    height: 2050/30,
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
