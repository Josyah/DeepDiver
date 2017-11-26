import Matter from 'matter-js';
import {GLOBALS} from '../globals';
exports.physicsInit = (engine) => {

  const ground = Matter.Bodies.rectangle(
    GLOBALS.dimensions.width / 2,  // distance from left
    GLOBALS.dimensions.height, // distance from top
    GLOBALS.dimensions.width, // width
    25, // height
    {
      isStatic: true,
      restitution: 0
    },
  );

  Matter.World.add(engine.world, ground);
}
