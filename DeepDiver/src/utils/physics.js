import Matter from 'matter-js';
import {GLOBALS} from '../globals';
import {addEnemy} from './addEnemy';
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
exports.physicsInit = (engine, render) => {

  const ground = Matter.Bodies.rectangle(
    GLOBALS.dimensions.width / 2,  // distance from left
    GLOBALS.dimensions.height, // distance from top
    GLOBALS.dimensions.width, // width
    35, // height
    {
      isStatic: true,
      restitution: 0
    },
  );
  const ceiling = Matter.Bodies.rectangle(
    GLOBALS.dimensions.width / 2,  // distance from left
    -35, // distance from top
    GLOBALS.dimensions.width, // width
    10, // height
    {
      isStatic: true,
      restitution: 0
    },
  );
  // addEnemy(engine, {left: s100, top: 100})
  Matter.World.add(engine.world, [ground, ceiling]);
  // ender.run(render);
}
