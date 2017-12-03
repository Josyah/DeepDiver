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
    x: 0,
    y: 0,
  },
  gameSpeed: {
    horiziontal: 3,
    vertical: 3
  },
  jumpConstant: 40,
  pxToMeters: 10,
  topBoundary: 75,
  bottomBoundary: 125,
  defaultEnemyHeight: 75,
  defaultEnemyWidth: 75
}
