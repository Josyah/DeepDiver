import {observable} from 'mobx';
import {GLOBALS} from '../globals';
import { Vibration, Animated, AsyncStorage} from 'react-native'
let index = 0
let add = true
var count = 1
var lastAlert = '';
import {ifBetween} from '../utils/ifBetween'
import {coinLayouts} from '../utils/coinLayout'
import { create, persist } from 'mobx-persist'
class ObservableListStore {
  @persist @observable coins = 0;
  @persist @observable vibration = true;
  @persist @observable score = 0;
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
    loading: false,
    mounted: true
  }]
  @observable alert = '';
  @observable navigationState = 'LEVEL';
  @observable forceUp = 0;
  @observable forceLeft = 2;
  @observable repeat = true;
  @observable unPausing = false;
  @observable paused = false;
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
    health: 100,
    repeat: true
  };
  @observable shop = {
    harpoons: 5
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
    if(!this.unPausing){
      this.player.angle = (distanceBetween/(5/4))
      this.forceUp = -(distanceBetween/5)
      this.background.speed = (Math.abs((Math.abs(distanceBetween))/(50/4) - 5))
      if(distanceBetween < 0){
        this.player.animationState = this.player.animate.goingUp
      } else {
        this.player.animationState = this.player.animate.goingDown
      }
    }
  }
  resetGame(){
    this.background.position = GLOBALS.initBackgroundPosition
    this.background.offset = {x: 0, y: 0};
    coinArray = coinLayouts.SquareLayout;
    this.player.health = 100
    this.enemies.clear()
    this.randomlyGenerateEnemies()
    this.background.loaded = false
  }
  pause(){
    this.paused = true
    this.alert = ''
  }
  active(){
  }
  inactive(){
    if(this.navigationState == 'LEVEL'){
      this.navigationState = 'PAUSED'
    }
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
    if(this.shop.harpoons > 0 && (!this.paused && !this.unPausing)){
      this.shop.harpoons -= 1;
      this.projectiles.push({
        type: 'HARPOON',
        speed: GLOBALS.projectiles.harpoon.speed,
        position: {
          x: 150,
          y: GLOBALS.initCharacterPosition.y+(GLOBALS.playerHeightInMeters*GLOBALS.pixelsInAMeter/2)+30
        }
      })
    }
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
    if(this.enemies.length==0){
      this.addEnemy('HAMMERHEAD', {
        height: GLOBALS.HammerHead.tileHeight, width: GLOBALS.HammerHead.tileWidth
      })
    }
  }
  randomlyGenerateAlert(){
    if((Math.random()*100) < 50){
      var sampleAlerts = [
        "Nice!",
        "Slick!",
        "Good Job!",
        "Good Job!",
      ];
      var rndm = Math.round(Math.random()*sampleAlerts.length);
      alert = sampleAlerts[rndm]
      if(alert != lastAlert){
        lastAlert = alert
        this.alert = alert
      }
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
  checkCollisions(i){
    if(this.checkLength(this.enemies.length)){
        var here = ifBetween((GLOBALS.initCharacterPosition.y - ((GLOBALS.playerWidthInMeters*GLOBALS.pixelsInAMeter)/2)), this.enemies[i].position.y - (this.enemies[i].dimensions.height) -this.background.position.y, this.enemies[i].position.y -this.background.position.y)
        if((this.enemies[i].position.x < (GLOBALS.initCharacterPosition.x+ (GLOBALS.playerHeightInMeters*GLOBALS.pixelsInAMeter)) && here) && (this.enemies[i].position.x > 0 && this.enemies[i].health >0)){
          this.onEnemyCollision(i);
        }
        if(this.checkLength(this.projectiles.length)){
          for(var p = 0; p < this.projectiles.length; p++){
            var projectileInLine = ifBetween(this.projectiles[p].position.y ,(this.enemies[i].position.y - this.background.position.y) ,(this.enemies[i].position.y + this.enemies[i].dimensions.height-this.background.position.y))
            var projectileOnX = ifBetween(this.projectiles[p].position.x ,(this.enemies[i].position.x) ,(this.enemies[i].position.x + this.enemies[i].dimensions.width))
            if ((projectileInLine && projectileOnX) && (this.enemies[i].position.x > 20 && this.enemies[i].position.x < GLOBALS.dimensions.width)) {
              this.projectiles.splice(p, 1);
              this.enemies[i].health -= 1;
              this.enemies.splice(i, 1);
              this.randomlyGenerateEnemies()
              this.randomlyGenerateAlert()
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
  switchVibration() {
    if(this.vibration){
      this.vibration = false
    } else {
      this.vibration = true
    }
  }
  vibrate(){
    if(this.vibration){
      Vibration.vibrate(500)
    }
  }
  addEnemy(type, dimensions) {
    this.enemies.push({
      type,
      dimensions,
      position: {
        x: 1000,
        y: this.background.position.y + 500 - GLOBALS.dimensions.height,
        x0: 1000,
        y0: this.background.position.y + 500 - GLOBALS.dimensions.height
      },
      collided: false,
      speed: 7,
      angle: 0,
      health: 1,
      loaded: false,
      mounted: true
    })
  }
  buy(type) {
    if(this.coins > 0){
      switch(type){
        case 'HARPOON':
        this.coins -= 1
        this.shop.harpoons += 1
        console.log('Bought 1 Harpoon')
      }
    } else {
      console.log('Not enough money to buy anything')
    }
  }
}
const hydrate = create({
    storage: AsyncStorage
})

const store = new ObservableListStore()
export default store
hydrate('store', store)
    // post hydration
    .then(() => console.log('store hydrated'))
