import {observable} from 'mobx';
import {GLOBALS} from '../globals';
import { Vibration, Animated} from 'react-native'
let index = 0
let add = true
var lastId = 0
var count = 1
var range = 5000000000
import {ifBetween} from '../utils/ifBetween'
import {coinLayouts} from '../utils/coinLayout'
import {enableLogging} from 'mobx-logger';
class ObservableListStore {
  @observable background = {
    position: GLOBALS.initBackgroundPosition,
    dimensions: {
      height: GLOBALS.initBackgroundHeight,
      width: GLOBALS.initBackgroundWidth,
    },
    offset: {
      x: GLOBALS.initBackgroundPosition.x,
      y: GLOBALS.initBackgroundPosition.y
    },
    loaded: false,
    speed: 5
  };
  @observable enemies = [
    {
    type: 'HAMMERHEAD',
    position: {
      x: 1000,
      y: this.background.position.y + 500 - GLOBALS.dimensions.height,
      x0: 1000,
      y0: this.background.position.y + 500 - GLOBALS.dimensions.height
    },
    dimensions: {
      height: 50,
      width: 50
    },
    collided: false,
    speed: 7,
    path: {
      type: 'WAVE',
      frequency: 200,
      wavelength: 200
    },
    angle: 0,
    health: 1,
    loaded: false,
    mounted: true
  }]
  @observable alert = '';
  @observable navigationState = 'LEVEL';
  @observable forceUp = 0;
  @observable forceLeft = 2;
  @observable gravity = {x: 0, y: -2, scale: 0.0005 };
  @observable repeat = true;
  @observable unPausing = false;
  @observable paused = false;
  @observable coins = 0;
  @observable region = 'Beach Zone';

  @observable coinLayoutArray = [{
    position: {
      x: 1000,
      y: 6000
    },
    speed: 3
  }];
  @observable coinArray = coinLayouts.SquareLayout
  @observable projectiles = [
    {
      type: 'HARPOON',
      speed: GLOBALS.projectiles.harpoon.speed,
      position: {
        x: 150,
        y: GLOBALS.initCharacterPosition.y+(GLOBALS.playerHeightInMeters*GLOBALS.pixelsInAMeter/2)+30
      },
      loaded: false
    }
  ];
  @observable player = {
    width: this.scale * GLOBALS.tileWidth,
    height: this.scale * GLOBALS.tileHeight,
    angle: 0,
    animationState: GLOBALS.SeaLord.fallingAnimation,
    isStatic: false,
    type: 'SEA_LORD',
    animate: {
      falling: GLOBALS.SeaLord.fallingAnimation,
      goingUp: GLOBALS.SeaLord.upAnimation,
      goingDown: GLOBALS.SeaLord.downAnimation,
    },
    health: 100
  };
  @observable scale = .5;
  loseHeart(){
    if(this.player.health > 0){
      this.player.health -= 20
    } else{
      this.die()
    }
  }
  movePlayer(distanceBetween){
    this.player.angle = (distanceBetween/(5/4))
    this.forceUp = -(distanceBetween/5)
    this.background.speed = (Math.abs((Math.abs(distanceBetween))/(50/4) - 5))
    if(distanceBetween < 0){
      this.player.animationState = this.player.animate.goingUp
    } else {
      this.player.animationState = this.player.animate.goingDown
    }
  }
  resetGame(){
    this.background.position = GLOBALS.initBackgroundPosition
    this.background.offset = {x: 0, y: 0};
    coinArray = coinLayouts.SquareLayout;
    this.player.health = 100
    this.enemies.clear()
    this.enemies.push({
      type: 'HAMMERHEAD',
      position: {
        x: 1000,
        y: this.background.position.y + 500 - GLOBALS.dimensions.height,
        x0: 1000,
        y0: this.background.position.y + 500 - GLOBALS.dimensions.height
      },
      dimensions: {
        height: 50,
        width: 50
      },
      collided: false,
      speed: 7,
      path: {
        type: 'WAVE',
        frequency: 200,
        wavelength: 200
      },
      angle: 0,
      health: 1,
      loaded: false,
      mounted: true
    })
  }
  pause(){
    this.navigationState = 'PAUSED'
  }
  active(){
  }
  inactive(){
    this.navigationState = 'PAUSED'
  }
  moveBackground () {
    this.background.position.x -= this.background.speed
    if((this.background.position.x + this.background.offset.x) < -(GLOBALS.initBackgroundDimensions.width-GLOBALS.dimensions.width)){
      this.background.offset.x += (GLOBALS.initBackgroundDimensions.width-GLOBALS.dimensions.width)
    }
  }
  checkEnemyPosition(x){
    if(this.enemies[x].position.x < -300 && this.enemies.length > 0){
      this.enemies.splice(x, 1);
      this.randomlyGenerateEnemies()
    }
  }
  moveEnemies(){
    if(this.checkLength(this.enemies.length)){
      for(var x = 0; x < this.enemies.length ; x++){
        this.enemies[x].position.x -= this.enemies[x].speed;
        this.checkEnemyPosition(x);
        this.checkCollisions(x);

      }
    }
  }
  addProjectile(){
    this.projectiles.push({
      type: 'HARPOON',
      speed: GLOBALS.projectiles.harpoon.speed,
      position: {
        x: 150,
        y: GLOBALS.initCharacterPosition.y+(GLOBALS.playerHeightInMeters*GLOBALS.pixelsInAMeter/2)+30
      }
    })
  }
  moveProjectiles(){
    if(this.checkLength(this.projectiles.length)){
      for(var x = 0; x < this.projectiles.length ; x++){
        if(this.projectiles[x].loaded){

          this.projectiles[x].position.x += this.projectiles[x].speed;
          //check collisions
          if(this.projectiles[x].position.x > GLOBALS.dimensions.width*1.2){
            this.projectiles.splice(x, 1);
          }
        }
      }
    }
  }
  randomlyGenerateEnemies(){
    var x = (Math.random() * 100)
    if(x < 20){
      this.addEnemy('HAMMERHEAD')
    }
    else if (ifBetween(x, 20, 30)){
      this.addEnemy('PIRANHA')
    }
    else if (ifBetween(x, 30, 40)){
      this.addEnemy('JELLYFISH')
    }
    else if (ifBetween(x, 40, 50)){
      this.addEnemy('LIGHT_FISH')
    }
    else if (ifBetween(x, 50, 60)){
      this.addEnemy('STING_RAY')
    }
    else if (ifBetween(x, 70, 100)){
      this.addEnemy('GREAT_WHITE')
    }
  }
  moveInWave(index){
    if(this.enemies[index] && this.checkLength(this.enemies.length)){
      let {y0, y, x, path} = this.enemies[index].position
      let {frequency, wavelength} = this.enemies[index].path
      this.enemies[index].position.y = y0 + frequency* Math.sin(x / wavelength)
      var angle = Math.atan((frequency/wavelength) *Math.cos(x/wavelength))
      this.enemies[index].angle = angle* (180/Math.PI)
    }
  }
  releaseScreen () {
    this.forceUp = -1
    this.player.animationState = this.player.animate.falling
    this.player.angle = 0
    this.background.speed = 5
  }
  addEnemy(type) {
    this.enemies.push({
      type,
      position: {
        x: 1000,
        y: this.background.position.y + 500 - GLOBALS.dimensions.height,
        x0: 1000,
        y0: this.background.position.y + 500 - GLOBALS.dimensions.height
      },
      dimensions: {
        height: 50,
        width: 50
      },
      collided: false,
      speed: 7,
      path: {
        type: 'WAVE',
        frequency: 200,
        wavelength: 200
      },
      angle: 0,
      health: 1,
      loaded: false,
      mounted: true
    })
  }
  checkCollisions(i){
    console.log(GLOBALS.initCharacterPosition.x+ (GLOBALS.playerHeightInMeters*GLOBALS.pixelsInAMeter))
    if(this.checkLength(this.enemies.length)){
        var here = ifBetween((GLOBALS.initCharacterPosition.y - ((GLOBALS.playerWidthInMeters*GLOBALS.pixelsInAMeter)/2)), this.enemies[i].position.y - (this.enemies[i].dimensions.height) -this.background.position.y, this.enemies[i].position.y -this.background.position.y)
        if((this.enemies[i].position.x < (GLOBALS.initCharacterPosition.x+ (GLOBALS.playerHeightInMeters*GLOBALS.pixelsInAMeter)) && here) && (this.enemies[i].position.x > 0 && this.enemies[i].health >0)){
          this.onEnemyCollision(i);
        }
        if(this.checkLength(this.projectiles.length)){
          for(var p = 0; p < this.projectiles.length; p++){
            // console.log(this.projectiles[p].position.y, this.enemies[i].position.y - this.background.position.y)
            var projectileInLine = ifBetween(this.projectiles[p].position.y ,(this.enemies[i].position.y - this.background.position.y) ,(this.enemies[i].position.y + this.enemies[i].dimensions.height-this.background.position.y))
            if (projectileInLine && (this.enemies[i].position.x > 20)) {
              this.projectiles.splice(p, 1);
              this.enemies[i].health -= 1;
              this.enemies.splice(i, 1);
              this.addEnemy();
            }
          }
        }

    }
    if(this.checkLength(this.coinArray.length)){
      for(var i = 0; i < this.coinArray.length; i++){
        var here = ifBetween((GLOBALS.initCharacterPosition.y - ((GLOBALS.playerWidthInMeters*GLOBALS.pixelsInAMeter)/2)), ((this.coinArray[i].y*GLOBALS.coins.multiplier)+this.coinLayoutArray[0].position.y) - (GLOBALS.coins.height/2) -this.background.position.y, ((this.coinArray[i].y*GLOBALS.coins.multiplier)+this.coinLayoutArray[0].position.y) -this.background.position.y)
        if(((((this.coinLayoutArray[0].position.x+this.coinArray[i].x*GLOBALS.coins.multiplier) + this.background.position.x) < (GLOBALS.initCharacterPosition.x+ (GLOBALS.playerHeightInMeters*GLOBALS.pixelsInAMeter))) && here) && (((this.coinLayoutArray[0].position.x+this.coinArray[i].x*GLOBALS.coins.multiplier) + this.background.position.x) > 0)){
          this.onCoinCollision(i)
        }
      }
    }
  }
  die() {
    this.navigationState = 'DEAD'
    this.vibrate()
  }
  checkRegion(){
    var pos = this.background.position.y-GLOBALS.initBackgroundPosition.y
    if((pos < GLOBALS.regions.beach.start) && (pos > GLOBALS.regions.midsea.start)){
      this.region = 'BEACH'
    } else if((pos < GLOBALS.regions.midsea.start) && (pos > GLOBALS.regions.midnight.start)){
      this.region = 'MIDSEA'
    } else if((pos < GLOBALS.regions.midnight.start) && (pos > 0)){
      this.region = 'MIDNIGHT'
    }
  }
  onEnemyCollision(id) {
    if(this.checkLength(this.enemies.length)){
      if(this.enemies[id].collided == false){
        this.enemies[id].mounted = false
        this.enemies[id].collided = true
        this.loseHeart()
        this.vibrate()
      }
    }
  }
  onCoinCollision(id) {
    if(this.checkLength(this.coinArray.length)){
      if(this.coinArray[id].collided == false){
        this.coinArray[id].collided = true
        this.coinArray.splice(id, 1);
        this.coins += 1
      }
    }
  }
  checkLength(length){
    if(length > 0){
      return true
    }
  }
  vibrate(){
    Vibration.vibrate(500)
  }
}


const store = new ObservableListStore()
export default store
