import {Dimensions} from 'react-native';
exports.GLOBALS = {
  dimensions: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  initCharacterPosition: {
    x: 50,
    y: Dimensions.get('window').height*.5,
  },
  initBackgroundPosition: {
    x: 0,
    y: 0,
  },
  gameSpeed: {
    horiziontal: 5,
    vertical: 4
  },
  forceUp: 5,
  tileHeight: 200,
  tileWidth: 150,
  jumpConstant: 40,
  pxToMeters: 10,
  topBoundary: 40,
  bottomBoundary: 200,
  defaultEnemyHeight: 75,
  defaultEnemyWidth: 75,
  playerHeightInMeters: 1.8796,
  playerWidthInMeters: 0.3048,
  pixelsInAMeter: 40,
  playerMass: 95.2544,
  seaWeedDistance: 50
}
