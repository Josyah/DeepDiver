import Matter from 'matter-js';
import {GLOBALS} from '../globals';
exports.addEnemy = (engine, position) => {
  const enemy = Matter.Bodies.rectangle(
    position.left,  // distance from left
    position.top, // distance from top
    GLOBALS.defaultEnemyWidth, // width
    GLOBALS.defaultEnemyHeight, // height
    {
      isStatic: true,
    },
  );
  console.log(enemy.render.fillStyle)
  enemy.render.fillStyle = 'red'
  console.log(enemy.render.fillStyle)
  Matter.World.add(engine.world, enemy);
}
