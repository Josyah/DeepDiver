import {GLOBALS} from '../globals'
exports.getPlayerStats = (player) => {
  switch(player){
    case 'SEA_LORD':
      return {
        angle: 0,
        speed: 5,
        boostSpeed: 30,
        boosted: false,
        normalAnimationSpeed: 1,
        boostAnimationSpeed: 1,
        boostDuration: 3,
        agility: 10,
        health: 100,
        maxHealth: 100,
        verticalStart: 25400,
        maxHarpoons: 5,
        maxDepth: 20000,
        offset: 0,
        attacking: false,
        animationState: GLOBALS.SeaLord.fallingAnimation,
        type: player,
        animate: {
          falling: GLOBALS.SeaLord.fallingAnimation,
          goingUp: GLOBALS.SeaLord.upAnimation,
          goingDown: GLOBALS.SeaLord.downAnimation,
        },
        repeat: true,
        width: GLOBALS.SeaLord.tileWidth,
        height: GLOBALS.SeaLord.tileHidth,
      }
      break;
    case 'AQUARIA':
      return {
        angle: 0,
        speed: 5,
        boostSpeed: 30,
        boosted: false,
        normalAnimationSpeed: 1,
        boostAnimationSpeed: 1,
        boostDuration: 3,
        agility: 10,
        health: 100,
        maxHealth: 100,
        verticalStart: 25400,
        maxHarpoons: 5,
        maxDepth: 20000,
        offset: 0,
        attacking: false,
        animationState: GLOBALS.Aquaria.fallingAnimation,
        type: player,
        animate: {
          falling: GLOBALS.Aquaria.fallingAnimation,
          goingUp: GLOBALS.Aquaria.upAnimation,
          goingDown: GLOBALS.Aquaria.downAnimation,
        },
        repeat: true,
        width: GLOBALS.Aquaria.tileWidth,
        height: GLOBALS.Aquaria.tileHidth,
      }
      break;
  }
}
