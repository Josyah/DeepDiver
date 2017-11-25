import {Dimensions} from 'react-native';
exports.GLOBALS = {
  dimensions: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  initCharacterPosition: {
    x: 50,
    y: Dimensions.get('window').height*.2,
  },
  initBackgroundPosition: {
    x: 300,
    y: Dimensions.get('window').height*.8,
  },
  gameSpeed: 1
}
