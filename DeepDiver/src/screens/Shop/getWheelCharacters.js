exports.getWheelCharacters = () => {
  return [
    {
      src: require('../../images/SeaLordStatic.png'),
      name: 'SEA_LORD',
      zIndex: 1,
      behindWheel: true,
      fromLeft: true,
      tileWidth: 87,
      tileHeight: 176
    },
    {
      src: require('../../images/AquariaStatic.png'),
      name: 'AQUARIA',
      zIndex: 1,
      behindWheel: false,
      fromLeft: true,
      tileWidth: 106,
      tileHeight: 190
    },
    {
      src: require('../../images/PaleSquidCover.png'),
      name: 'SQUID',
      zIndex: 1,
      behindWheel: false,
      fromLeft: true,
      tileWidth: 121,
      tileHeight: 267
    },
    {
      src: require('../../images/T_aionCover.png'),
      name: 'T_AION',
      zIndex: 1,
      behindWheel: false,
      fromLeft: true,
      tileWidth: 141,
      tileHeight: 299
    },
    {
      src: require('../../images/TrenchCover.png'),
      name: 'TRENCH',
      zIndex: 1,
      behindWheel: false,
      fromLeft: true,
      tileWidth: 166,
      tileHeight: 432
    },
    {
      src: require('../../images/TortiseCover.png'),
      name: 'TORTISE',
      zIndex: 1,
      behindWheel: false,
      fromLeft: true,
      tileWidth: 219,
      tileHeight: 376
    },

  ]
}
