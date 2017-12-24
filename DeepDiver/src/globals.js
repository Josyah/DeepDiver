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
  regions: {
    beach: {
      start: 6624,
      enemies: [
        {
          type: 'PIRANHA'
        },
        {
          type: 'HAMMERHEAD'
        }
      ]
    },
    midsea: {
      start: 5374,
      enemies: [
        {
          type: 'STINGRAY'
        },
        {
          type: 'PUFFER'
        }
      ]
    },
    midnight: {
      start: 3000,
      enemies: [
        {
          type: 'ELECTRICEEL'
        },
        {
          type: 'JELLYFISH'
        }
      ]
    },
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
    steps: [1, 6, 10, 5, 5, 4],
    fallingAnimation: 2,
    upAnimation: 3,
    downAnimation: 4,
    tiles: [
      {
        tileWidth: 150,
        tileHeight: 200,
      },
      {
        tileWidth: 150,
        tileHeight: 200,
      },
      {
        tileWidth: 100,
        tileHeight: 200
      },
      {
        tileWidth: 100,
        tileHeight: 200,
      },
      {
        tileWidth: 100,
        tileHeight: 200,
      },
      {
        tileHeight: 200,
        tileWidth: 255
      },

    ],
  },
  Aquaria: {
    steps: [0, 3, 4, 4, 4, 1, 1, 2],
    fallingAnimation: 2,
    upAnimation: 3,
    downAnimation: 4,
    tiles: [
      {
        tileWidth: 100,
        tileHeight: 200,
      },
      {
        tileWidth: 100,
        tileHeight: 200,
      },
      {
        tileWidth: 100,
        tileHeight: 200
      },
      {
        tileWidth: 100,
        tileHeight: 200,
      },
      {
        tileWidth: 100,
        tileHeight: 200,
      },
      {
        tileHeight: 100,
        tileWidth: 200
      },
      {
        tileHeight: 100,
        tileWidth: 200
      },
      {
        tileHeight: 100,
        tileWidth: 200
      },

    ],
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
  ElectricEel: {
    tileWidth: 175.5,
    tileHeight: 50,
    steps: [1, 1]
  },
  StingRay: {
    tileWidth: 100,
    tileHeight: 100,
    steps: [3, 1]
  },
  Puffer: {
    tileWidth: 100,
    tileHeight: 100,
    steps: [3, 1]
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
  player: {
    type: 'AQUARIA'
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
