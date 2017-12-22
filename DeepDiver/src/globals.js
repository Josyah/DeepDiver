import {Dimensions} from 'react-native';

exports.GLOBALS = {
  dimensions: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  },
  initCharacterPosition: {
    x: 50,
    y: Dimensions.get('window').height*.3,
  },
  initBackgroundPosition: {
    x: 0,
    y: -6000,
  },
  region: {
    one: {
      top: 1000,
      bottom: 500
    }
  },
  initBackgroundDimensions: {
    width: 3312,
    height: 6624,
  },
  gameSpeed: {
    horiziontal: 5,
    vertical: 4
  },
  forceUp: 5,
  forceLeft: 5,
  SeaLord: {
    tileHeight: 200,
    tileWidth: 150,
    steps: [1, 6, 10, 5, 5, 4],
    fallingAnimation: 2,
    upAnimation: 3,
    downAnimation: 4
  },
  Aquaria: {
    tileHeight: 219.5,
    tileWidth: 113.6,
  },
  HammerHead: {
    tileWidth: 200.25,
    tileHeight: 100,
    steps: [3, 1]
  },
  Piranha: {
    tileWidth: 200.25,
    tileHeight: 100,
    steps: [0]
  },
  JellyFish: {
    tileWidth: 125,
    tileHeight: 125,
    steps: [4, 1]
  },
  CommanderTurtle: {
    tileHeight: 400,
    tileWidth: 300,
    steps: [0, 1, 3, 3, 3, 3, 3, 3, 3],
    fallingAnimation: 3,
    upAnimation: 2,
    downAnimation: 3,
    heightInMeters: 2
  },
  jumpConstant: 40,
  defaultEnemyHeight: 75,
  defaultEnemyWidth: 75,
  playerHeightInMeters: 1.8796,
  playerWidthInMeters: 0.3048,
  pixelsInAMeter: 50,
  playerMass: 95.2544,
  seaWeedDistance: 50,
  visibilityInMeters: 100
}
