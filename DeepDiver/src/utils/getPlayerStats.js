import {GLOBALS} from '../globals'
exports.getPlayerStats = (player) => {
  switch(player){
    case 'SEA_LORD':
      return {
        angle: 0,
        speed: 5,
        agility: 10,
        health: 100,
        verticalStart: 25000,
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
  }
}
