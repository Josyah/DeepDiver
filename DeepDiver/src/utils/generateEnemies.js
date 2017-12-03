
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
import {GLOBALS} from '../globals';
export const generateEnemies = () => {
  const enemyPositions = [];
  const enemyStart = 500;
  for (var i = 0; i < 25; i++) {
    enemyPositions.push({
      left: enemyStart + (i * random(350, 500)),
      bottom: random(0, GLOBALS.dimensions.height*2)
    });
  }
  return enemyPositions;
};
