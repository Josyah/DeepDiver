import {observable} from 'mobx';
import {GLOBALS} from '../globals';
import { Vibration, Animated, AsyncStorage} from 'react-native'
let index = 0
let add = true
var count = 1
var lastAlert = '';
import {ifBetween} from '../utils/ifBetween'
import {getPlayerStats} from '../utils/getPlayerStats'
import {coinLayouts} from '../utils/coinLayout'
import { create, persist } from 'mobx-persist'
import { getWheelCharacters } from '../screens/Shop/getWheelCharacters'
import { getBackgroundComponents } from '../utils/getBackgroundComponents'
class ObservableListStore {
  @persist @observable coins = 0;
  @persist @observable vibration = true;
  @persist @observable bestScore = 0;
  @persist @observable controls = 'VERTICAL';
  @persist @observable selectedPlayer = 'SEA_LORD';
  @persist @observable shop = {
    harpoons: 200,
    ownedCharacters: [],
    coins: 0
  };
  @observable outOfBounds = false;
  @observable wheelOffset = 0;
  @observable wheelItems = getWheelCharacters();
  @observable player = getPlayerStats(this.selectedPlayer);
  @observable absPlayerPosition = GLOBALS.initCharacterPosition;
  @observable backgroundComponents = getBackgroundComponents();
  @observable background = {
    position: {
      x: GLOBALS.initBackgroundPosition.x,
      y: this.player.verticalStart
    },
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
  @observable enemies = [];
  @observable maxEnemies = 1;
  @observable alert = '';
  @observable info = '';
  @observable navigationState = 'HOME';
  @observable forceUp = 0;
  @observable forceLeft = 2;
  @observable repeat = true;
  @observable scoringSystem = {
    enemiesKilled: 0,
    finalDistance: 0,
    finalScore: 0
  };
  @observable unPausing = false;
  @observable paused = false;
  @observable region = '';
  @observable dimensions = {
    width: GLOBALS.dimensions.width,
    height: GLOBALS.dimensions.height,
  }
  @observable coinLayoutArray = [{
    position: {
      x: 1000,
      y: 29000
    },
    speed: 3
  }];
  @observable coinArray = coinLayouts.SquareLayout
  @observable projectiles = [];

  @observable scale = .5;
  loseLife(amount){
    if(this.player.health > 0 && amount < this.player.health){
      this.player.health -= amount
    } else{
      this.die()
    }
  }
  rotate(whichWay){
    if(whichWay === 'LANDSCAPE'){
      this.dimensions.width = GLOBALS.dimensions.width
      this.dimensions.height = GLOBALS.dimensions.height
    }
  }
  movePlayer(distanceBetween){
    if(!this.unPausing){
      this.forceUp = -(distanceBetween/(20 - this.player.agility)) //10?
      this.player.angle = -this.forceUp*4 // = 40
      this.player.offset = -this.forceUp
      // this.background.speed = (Math.abs((Math.abs(distanceBetween))/(50/this.player.speed) - this.player.speed))
      if(distanceBetween < 0){
        this.player.animationState = this.player.animate.goingUp
      } else {
        this.player.animationState = this.player.animate.goingDown
      }
    }
  }
  startGame(){
    this.navigationState = 'LEVEL'
    this.randomlyGenerateEnemies()
  }
  resetGame(){
    this.player = getPlayerStats(this.selectedPlayer);
    this.enemies.clear();
    this.randomlyGenerateEnemies()
    this.background.position = {
      x: GLOBALS.initBackgroundPosition.x,
      y: this.player.verticalStart
    }
    this.background.offset = {x: 0, y: 0};
    this.coinArray = coinLayouts.SquareLayout;
    this.background.loaded = false;
    this.alert = '';
  }
  pause(){
    // this.player.repeat = false
    this.alert = ''
    this.paused = true
  }
  active(){
  }
  inactive(){
    if(this.navigationState == 'LEVEL'){
      this.navigationState = 'PAUSED'
    }
  }
  moveBackground () {
    var constant = 0;
    if(this.background.speed < 10){
      this.background.speed = ((Math.sqrt(-this.background.position.x*GLOBALS.pixelsInAMeter) - constant)/1000)+5
    }
    if((this.background.position.x + this.background.offset.x) < -(GLOBALS.initBackgroundDimensions.width-GLOBALS.dimensions.width)){
      this.background.offset.x += (GLOBALS.initBackgroundDimensions.width-GLOBALS.dimensions.width)
    }
    if((-this.background.position.x*GLOBALS.pixelsInAMeter) > 10000){
      this.maxEnemies = 3
    }
    else if((-this.background.position.x*GLOBALS.pixelsInAMeter) > 1000){
      this.maxEnemies = 2
    }
    this.background.position.x -= this.background.speed;
    console.log(this.background.speed)
  }
  isEnemyOffScreen(x){
    if(this.enemies[x].position.x < -300 && this.enemies.length > 0){
      this.enemies.splice(x, 1);
      if(this.enemies.length <= 1){
        this.randomlyGenerateEnemies();
        this.randomlyGenerateEnemies();
      }
    }
  }
  moveEnemies(){
    if(this.checkLength(this.enemies.length)){
      for(var x = 0; x < this.enemies.length ; x++){
        if(this.checkExists(this.enemies[x])){
          this.enemies[x].position.x -= (this.background.speed + this.enemies[x].speed);
          this.isEnemyOffScreen(x);
          this.checkCollisions(x);
          this.moveInWave(x);
        }
      }
    }
  }
  addProjectile(){
    if(this.shop.harpoons > 0 && (!this.paused && !this.unPausing)){
      this.shop.harpoons -= 1;
      this.player.attacking = true;
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
  isBestScore(){
    if(this.scoringSystem.finalDistance == this.bestScore){
      return true;
    } else  {
      return false;
    }
  }
  randomlyGenerateEnemies(){
    if(this.enemies.length < this.maxEnemies){
      var enemy;
      var rndm;
      switch(this.region){
        case 'BEACH':
          rndm = Math.round(Math.random()*(GLOBALS.regions.beach.enemies.length-1))
          enemy = GLOBALS.regions.beach.enemies[rndm]
          break;
        case 'MIDSEA':
          rndm = Math.round(Math.random()*(GLOBALS.regions.midsea.enemies.length-1))
          enemy = GLOBALS.regions.midsea.enemies[rndm]
          break;
        case 'MIDNIGHT':
          rndm = Math.round(Math.random()*(GLOBALS.regions.midnight.enemies.length-1))
          enemy = GLOBALS.regions.midnight.enemies[rndm]
          break;
        default:
          rndm = Math.round(Math.random()*(GLOBALS.regions.beach.enemies.length-1))
          enemy = GLOBALS.regions.beach.enemies[rndm]
      }
      this.addEnemy(enemy)
    }
  }
  randomlyGenerateAlert(){
    if((Math.random()*100) < 50){
      var sampleAlerts = [
        "Nice!",
        "Good Job!",
        "Obscene!",
        "Murderous",
        "Bada$$",
        "Wild",
        "Insane",
        "Whaat?"
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
    if(this.enemies[index] && (this.checkLength(this.enemies.length) && this.checkExists(this.enemies[index]))){
      let {y0, y, x, path} = this.enemies[index].position
      let {frequency, wavelength, trackAngle} = this.enemies[index].wave
      this.enemies[index].position.y = y0 + frequency* Math.sin(x / wavelength)
      if(trackAngle){
        var angle = Math.atan((frequency/wavelength) *Math.cos(x/wavelength))
        this.enemies[index].angle = angle* (180/Math.PI)
      }
    }
  }
  releaseScreen () {
    this.forceUp = -1
    this.player.animationState = this.player.animate.falling
    this.player.angle = 0
    this.background.speed = 5
  }
  checkCollisions(i){
    if(this.checkLength(this.enemies.length) && this.checkExists(this.enemies[i])){
        var here = ifBetween((GLOBALS.initCharacterPosition.y - ((GLOBALS.playerWidthInMeters*GLOBALS.pixelsInAMeter)/2)), this.enemies[i].position.y - (this.enemies[i].dimensions.height) -this.background.position.y, this.enemies[i].position.y -this.background.position.y)
        if((this.enemies[i].position.x < (GLOBALS.initCharacterPosition.x+ (GLOBALS.playerHeightInMeters*GLOBALS.pixelsInAMeter)) && here) && (this.enemies[i].position.x > 0 && this.enemies[i].health >0)){
          this.onHitByEnemy(i);
        }
        if(this.checkLength(this.projectiles.length)){
          for(var p = 0; p < this.projectiles.length; p++){
            var projectileInLine = ifBetween(this.projectiles[p].position.y ,(this.enemies[i].position.y - this.background.position.y) ,(this.enemies[i].position.y + this.enemies[i].dimensions.height-this.background.position.y))
            var projectileOnX = ifBetween(this.projectiles[p].position.x ,(this.enemies[i].position.x) ,(this.enemies[i].position.x + this.enemies[i].dimensions.width))
            if ((projectileInLine && projectileOnX) && (this.enemies[i].position.x > 20 && this.enemies[i].position.x < GLOBALS.dimensions.width)) {
              this.projectiles.splice(p, 1);
              this.enemies[i].health -= 1;
              this.enemies.splice(i, 1);
              this.randomlyGenerateEnemies();
              this.randomlyGenerateAlert();
              this.scoringSystem.enemiesKilled += 1;
            }
          }
        }
    }
    if(this.checkLength(this.coinArray.length)){
      for(var i = 0; i < this.coinArray.length; i++){
        var playerMinY = (GLOBALS.initCharacterPosition.y - ((this.player.width)*GLOBALS.pixelsInAMeter))
        var playerMaxY = (GLOBALS.initCharacterPosition.y )
        var playerMinX = (GLOBALS.initCharacterPosition.x)
        var playerMaxX = (GLOBALS.initCharacterPosition.x + (GLOBALS.playerHeightInMeters*GLOBALS.pixelsInAMeter))
        var coinX = this.coinArray[i].x*GLOBALS.coins.multiplier+this.background.position.x+this.coinLayoutArray[0].position.x
        var coinY = ((this.coinArray[i].y*GLOBALS.coins.multiplier)+this.coinLayoutArray[0].position.y-this.background.position.y - (GLOBALS.coins.height/2))
        var coinOnX = ifBetween(coinX, playerMinX, playerMaxX)
        var coinOnY = ifBetween(coinY, playerMinY, playerMaxY)
        if(coinOnY && coinOnX){
          this.onPickUpCoin(i)
        }
      }
    }
  }
  die() {
    this.scoringSystem.finalDistance = (-this.background.position.x/GLOBALS.pixelsInAMeter);
    console.log('LAST SCORE'+ this.bestScore);
    if(this.scoringSystem.finalDistance > this.bestScore){
      this.bestScore = this.scoringSystem.finalDistance;
      console.log('BEST SCORE'+ this.bestScore);
    }
    this.vibrate();
    this.navigationState = 'DEAD';
  }
  checkRegion(){
    var pos = this.background.position.y
    if(pos>GLOBALS.initBackgroundDimensions.height){
      this.outOfBounds = true
    } else if ((pos < GLOBALS.regions.beach.start) && (pos > GLOBALS.regions.midsea.start)){
      if(this.region != 'BEACH'){
        this.info = 'Now entering Beach Zone';
      }
      this.region = 'BEACH'
      this.outOfBounds = false
    } else if((pos < GLOBALS.regions.midsea.start) && (pos > GLOBALS.regions.midnight.start)){
      if(this.region != 'MIDSEA'){
        this.info = 'Now entering the Mid-Sea Zone';
      }
      this.region = 'MIDSEA'
      this.outOfBounds = false
    } else if((pos < GLOBALS.regions.midnight.start) && (pos > 0)){
      if(this.region != 'MIDNIGHT'){
        this.info = 'Now entering the Midnight Zone';
      }
      this.region = 'MIDNIGHT'
      this.outOfBounds = false
    }
  }
  onHitByEnemy(id) {
    if(this.checkLength(this.enemies.length)){
      if(this.enemies[id].collided == false){
        this.enemies[id].mounted = false;
        this.enemies[id].collided = true;
        this.vibrate();
        this.loseLife(this.enemies[id].damage);
        this.takingDamage = true;
      }
    }
  }
  onPickUpCoin(id) {
    if(this.checkLength(this.coinArray.length)){
      if(this.coinArray[id].collided == false){
        this.coinArray[id].collided = true;
        this.coinArray.splice(id, 1);
        this.coins += 1;
      }
    }
  }
  checkLength(length){
    if(length > 0){
      return true
    }
  }
  checkExists(object){
    if(typeof object != "undefined"){
      return true
    }
  }
  toggleControls(){
    if(this.controls == 'HORIZONTAL'){
      this.controls = 'VERTICAL'
    } else if(this.controls == 'VERTICAL'){
      this.controls = 'VERTICAL_INVERTED'
    } else if(this.controls == 'VERTICAL_INVERTED'){
      this.controls = 'HORIZONTAL'
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
  addEnemy(enemy) {
    let {type, dimensions, damage, wave, speed, widthInMeters, steps, src, distanceAway} = enemy;
    this.enemies.push({
      type,
      dimensions,
      damage,
      wave,
      speed,
      steps,
      src,
      distanceAway,
      widthInMeters,
      position: {
        x: (Math.random() * (GLOBALS.dimensions.width/4)+GLOBALS.dimensions.width+100),
        y: this.background.position.y + (Math.random() * GLOBALS.dimensions.height),
        x0: (Math.random() * (GLOBALS.dimensions.width/4)+GLOBALS.dimensions.width+100),
        y0: this.background.position.y + (Math.random() * GLOBALS.dimensions.height)
      },
      collided: false,
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
