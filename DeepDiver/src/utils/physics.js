import Matter from 'matter-js';
import {GLOBALS} from '../globals';
import {addEnemy} from './addEnemy';
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
var enemyBodies = []
var randomEnemies = []
exports.physicsInit = (options) => {

  let {engine, store, enemies, callback} = options
  randomEnemies = enemies;
  const ground = Matter.Bodies.rectangle(
    GLOBALS.dimensions.width / 2,  // distance from left
    GLOBALS.dimensions.height-35, // distance from top
    GLOBALS.dimensions.width, // width
    35, // height
    {
      isStatic: true,
      restitution: 0
    },
  );
  const ceiling = Matter.Bodies.rectangle(
    GLOBALS.dimensions.width / 2,  // distance from left
    -7, // distance from top
    GLOBALS.dimensions.width, // width
    10, // height
    {
      isStatic: true,
      restitution: 0
    },
  );
  // addEnemy(engine, {left: s100, top: 100})
  // ender.run(render);
  // enemies.forEach((position) => {
  //   const enemy = Bodies.rectangle(
  //     position.left,  // distance from left
  //     position.top, // distance from top
  //     75, // width
  //     75, // height
  //     {
  //
  //     },
  //   );
  //   Matter.Body.setStatic(enemy, true)
  //   Matter.World.add(engine.world, enemy)
  //   enemyBodies.push(enemy)
  // });
  Matter.World.add(engine.world, [ground, ceiling]);
}

exports.updateEnemies = (store) => {
  // for(let i = 0; i< enemyBodies.length; i++){
  //   enemyBodies[i].position.x += store.background.position.x
  //   // enemyBodies[i].position.y = 0
  //   Matter.Body.setPosition(enemyBodies[i], enemyBodies[i].position)
  //   console.log(enemyBodies[0].position.x, enemyBodies[0].position.y)
  // }
}
