import {Dimensions} from 'react-native';

exports.GLOBALS = {
  font: 'Noise Machine',
  sensitivity: 75,
  dimensions: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  },
  wheelSpacing: 150,
  initCharacterPosition: {
    x: 40,
    y: Dimensions.get('window').height*.15,
  },
  initBackgroundPosition: {
    x: 0,
    y: 10000,
  },
  initBackgroundDimensions: {
    width: 15000,
    height: 30000,
  },
  projectiles: {
    harpoon: {
      speed: 15
    }
  },
  coins: {
    multiplier: 22,
    height: 17,
    width: 17,
  },
  maxEnemies: 2,
  regions: {
    beach: {
      start: 30000,
      enemies: [
        {
          type: 'HAMMERHEAD',
          dimensions: {
            width: 200,
            height: 100
          },
          widthInMeters: 6,
          damage: 25,
          wave: {
            frequency: -150,
            wavelength: 400,
            trackAngle: true
          },
          speed: 3,
          steps: [3, 1],
          src: require('./images/HammerHead.png'),
          distanceAway: 75
        },
        {
          type: 'PIRANHA',
          dimensions: {
            width: 100,
            height: 75
          },
          widthInMeters: 0.75,
          damage: 5,
          wave: {
            frequency: -50,
            wavelength: 100,
            trackAngle: true
          },
          speed: 2,
          steps: [3],
          src: require('./images/Piranha.png'),
          distanceAway: 75
        },
        {
          type: 'STING_RAY',
          dimensions: {
            width: 100,
            height: 100
          },
          widthInMeters: 2.1336,
          damage: 10,
          wave: {
            frequency: 100,
            wavelength: 300,
            trackAngle: true
          },
          speed: 1,
          steps: [3],
          src: require('./images/StingRay.png'),
          distanceAway: 75
        },
      ]
    },
    midsea: {
      start: 26250,
      enemies: [
        {
          type: 'GREAT_WHITE',
          dimensions: {
            width: 300,
            height: 150
          },
          widthInMeters: 6.4008,
          damage: 10,
          wave: {
            frequency: 100,
            wavelength: 300,
            trackAngle: true
          },
          speed: 3,
          steps: [3, 5],
          src: require('./images/GreatWhite.png'),
          distanceAway: 75
        },
        {
          type: 'JELLYFISH',
          dimensions: {
            width: 100,
            height: 100
          },
          widthInMeters: 0.4,
          damage: 5,
          wave: {
            frequency: 70,
            wavelength: 100,
            trackAngle: false
          },
          speed: 0.1,
          steps: [4],
          src: require('./images/JellyFish.png'),
          distanceAway: 75
        },
        {
          type: 'STING_RAY',
          dimensions: {
            width: 100,
            height: 100
          },
          widthInMeters: 2.1336,
          damage: 10,
          wave: {
            frequency: 100,
            wavelength: 300,
            trackAngle: true
          },
          speed: 1,
          steps: [3],
          src: require('./images/StingRay.png'),
          distanceAway: 75
        },
        {
          type: 'PUFFER',
          dimensions: {
            width: 100,
            height: 100
          },
          widthInMeters: 0.6,
          damage: 5,
          wave: {
            frequency: 50,
            wavelength: 150,
            trackAngle: true
          },
          speed: 1,
          steps: [3],
          src: require('./images/Puffer.png'),
          distanceAway: 75
        }
      ]
    },
    midnight: {
      start: 15000,
      enemies: [
        {
          type: 'ELECTRICEEL',
          dimensions: {
            width: 150,
            height: 63
          },
          widthInMeters: 2.4384,
          damage: 25,
          wave: {
            frequency: 50,
            wavelength: 100,
            trackAngle: true
          },
          speed: 2,
          src: require('./images/ElectricEel.png'),
          steps: [1],
          distanceAway: 75
        },
        {
          type: 'JELLYFISH-GLOW',
          dimensions: {
            width: 100,
            height: 100
          },
          widthInMeters: 0.4,
          damage: 10,
          wave: {
            frequency: 70,
            wavelength: 100,
            trackAngle: false
          },
          speed: 1,
          steps: [4],
          src: require('./images/Jellyfish-Glow.png'),
          distanceAway: 75
        }
      ]
    },
  },

  gameSpeed: {
    horiziontal: 5,
    vertical: 4
  },
  forceUp: 5,
  forceLeft: 5,
  SeaLord: {
    steps: [0, 5, 16, 16, 15, 16],
    fallingAnimation: 3,
    upAnimation: 4,
    downAnimation: 5,
    offsetY: 80,
    tileWidth: 150,
    tileHeight: 200,
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
        tileWidth: 150,
        tileHeight: 200
      },
      {
        tileWidth: 150,
        tileHeight: 200,
      },
      {
        tileWidth: 150,
        tileHeight: 200,
      },
      {
        tileWidth: 150,
        tileHeight: 200,
      },
      {
        tileWidth: 150,
        tileHeight: 200,
      },
      {
        tileWidth: 150,
        tileHeight: 200,
      },


    ],
  },
  Aquaria: {
    steps: [0, 3, 4, 4, 4, 1, 1, 2],
    fallingAnimation: 2,
    upAnimation: 3,
    downAnimation: 4,
    tileWidth: 150,
    tileHeight: 250,

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
    type: 'SEA_LORD'
  },
  jumpConstant: 40,
  defaultEnemyHeight: 75,
  defaultEnemyWidth: 75,
  playerHeightInMeters: 1.8288,
  playerWidthInMeters: 0.5,
  pixelsInAMeter: 60,
  playerMass: 95.2544,
  seaWeedDistance: 50,
  visibilityInMeters: 100
}
