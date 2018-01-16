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
  @persist @observable dailyRewards = 0;
  @persist @observable lastOpenTime = 0;
  @persist @observable maxHarpoons = 200;
  @persist('list') @observable ownedCharacters = ['SEA_LORD']
  @observable player = getPlayerStats(this.selectedPlayer);
  @observable getRewarded = false;
  @observable points = [];
  @observable shop = {
    harpoons: 200,
    ownedCharacters: [],
    coins: 0
  };
  @observable currentlyPlaying = false;
  @observable outOfBounds = false;
  @observable lastAnimationState = 0;
  @observable wheelOffset = 0;
  @observable stopAnimations = false;
  @observable wheelItems = getWheelCharacters();
  @observable absPlayerPosition = {
    x: GLOBALS.initCharacterPosition.x,
    y: GLOBALS.initCharacterPosition.y,
  };
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
  @observable maxEnemies = 5;
  @observable alert = '';
  @observable info = '';
  @observable navigationState = 'HOME';
  @observable forceUp = 0;
  @observable forceLeft = 2;
  @observable repeat = true;
  @observable tooFarDown = false;
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
      y: 4750
    },
    speed: 3
  }];
  @observable coinArray = coinLayouts.SquareLayout
  @observable projectiles = [];

  @observable warning = {
    text: '',
    visible: false
  };
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
    if(!this.unPausing ){
      var angle = distanceBetween/2
      // this.forceUp = -(distanceBetween/(20 - this.player.agility)) //10?
      this.player.angle = angle// = 40
      this.forceUp = -(this.background.speed*(Math.sin(angle*(Math.PI/180)))) //10?
      // console.log(this.forceUp)
      // this.player.offset = -this.forceUp
      // this.background.speed = (Math.abs((Math.abs(distanceBetween))/(50/this.player.speed) - this.player.speed))

      if(distanceBetween < 0){
        if(!this.stopAnimations){
          this.player.animationState = this.player.animate.goingUp
        }
      } else {
        if(!this.stopAnimations){
          this.player.animationState = this.player.animate.goingDown
        }
      }
    }
  }
  initConfig(){
    if(this.lastOpenTime > 0){
      var currentTime = (Date.now() / 1000) /(60*60);
      var elapsed = (currentTime - this.lastOpenTime);
      if(elapsed > 48){
        console.log('MORE THAN 48 HOURS :( NO REWARD')
        console.log('resetting time')
        this.lastOpenTime = currentTime;
        this.dailyRewards = 0
      }
      else if(elapsed > 24){
        console.log('MORE THAN 24 HOURS')
        console.log('resetting time')
        console.log('GIVING REWARD')
        this.getRewarded = true;
        if(this.dailyRewards <= 5){
          this.dailyRewards += 1;
        } else {
          this.dailyRewards = 0
        }
        this.lastOpenTime = currentTime;
      } else {
        console.log('NOT YEET' + elapsed)
      }
    } else {
      var currentTime = (Date.now() / 1000) /(60*60);
      this.lastOpenTime = currentTime;
      this.dailyRewards = 0
      console.log('resetting time')
    }
  }
  closeRewards(){
    this.getRewarded = false
    console.log('CLOSING REWARDS')
  }
  startGame(){
    this.navigationState = 'LEVEL'
    this.randomlyGenerateEnemies();
    this.currentlyPlaying = true
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
    if(this.navigationState != 'LEVEL'){
      this.background.loaded = false;
    }
    this.player.loaded = false;
    this.alert = '';
    this.warning.text = '';
    this.warning.visible = false;
    this.scoringSystem.enemiesKilled = 0;
    this.scoringSystem.finalDistance = 0;
    this.scoringSystem.finalScore = 0;
    this.shop.harpoons = this.maxHarpoons
  }
  pause(){
    // this.player.repeat = false
    this.alert = ''
    this.paused = true
    this.currentlyPlaying = false
  }
  unPause(){
    console.log('currentlyPlaying')
    this.currentlyPlaying = true
  }
  active(){
  }
  inactive(){
    this.currentlyPlaying = false
  }
  moveBackground () {
    var constant = 0;
    this.checkPressure()
    if(this.background.speed < 10){
      this.background.speed = ((Math.sqrt(-this.background.position.x*GLOBALS.pixelsInAMeter) - constant)/750)+7
    }
    if((this.background.position.x + this.background.offset.x) < -(GLOBALS.initBackgroundDimensions.width-GLOBALS.dimensions.width)){
      this.background.offset.x += (GLOBALS.initBackgroundDimensions.width-GLOBALS.dimensions.width)
    }
    var speedX =  Math.abs((this.background.speed)*Math.cos(this.player.angle*(Math.PI/180)))
    // console.log('SPEED',speedX)
    this.background.position.x -= speedX;
  }
  warningBlink(){
    visible = this.warning.visible
    setTimeout(() => {
      if(this.warning.visible){
        this.warning.visible = false
      } else {
        this.warning.visible = true
        this.vibrate()
        this.loseLife(10)
      }
      if(this.currentlyPlaying && (this.background.position.y < this.player.maxDepth)){
        this.warningBlink()
      }
    }, 850);
  }
  checkPressure(){
    if(this.background.position.y < this.player.maxDepth){
      if(this.tooFarDown == false){
        this.tooFarDown = true;
        this.warning.text = 'Pressure Warning!'
        this.warningBlink()
      }
    } else {
      this.tooFarDown = false;
      this.warning.text = ''
      this.warning.visible = false

    }
  }
  isEnemyOffScreen(x){
    if(this.enemies[x].position.x < -300 && this.enemies.length > 0){
      this.enemies.splice(x, 1);
      if(this.enemies.length <= 1){
        this.randomlyGenerateEnemies();
        this.randomlyGenerateEnemies();
        this.randomlyGenerateEnemies();
        this.randomlyGenerateEnemies();
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
      this.lastAnimationState = this.player.animationState;
      if(this.lastAnimationState == GLOBALS.SeaLord.attackingAnimation){
        this.lastAnimationState = GLOBALS.SeaLord.fallingAnimation
      }
      this.player.animationState = GLOBALS.SeaLord.attackingAnimation
      this.stopAnimations = true
    }
  }
  stopAnimation(type){
    this.stopAnimations = false
    if(this.player.animationState == this.lastAnimationState){
      this.lastAnimationState = GLOBALS.SeaLord.fallingAnimation
    } else {
      this.player.animationState = this.lastAnimationState
    }
    if(type == 'HARPOON'){
      this.projectiles.push({
        type: 'HARPOON',
        speed: GLOBALS.projectiles.harpoon.speed,
        position: {
          x: 150,
          y: this.absPlayerPosition.y + this.player.width*.82
        },
        angle: this.player.angle,
      })
    }
  }
  moveProjectiles(){
    if(this.checkLength(this.projectiles.length)){
      for(var x = 0; x < this.projectiles.length ; x++){
        if(this.projectiles[x].loaded){
          //this.projectiles.speed
          // angle of 0
          var angleInRads = this.projectiles[x].angle * (Math.PI/180)
          var speedX = (this.projectiles[x].speed * Math.cos(angleInRads))
          var speedY = -(this.projectiles[x].speed * Math.sin(angleInRads))
          this.projectiles[x].position.x += speedX;
          this.projectiles[x].position.y += speedY;

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
    // this.background.speed = 5
  }

  // collisionMask(){
  //   var collisions = [
  //     {
  //       x1: 0,
  //       y1: enemyHeight/2,
  //       x2: enemyWidth/2,
  //       y2: 0,
  //       greaterThan: true
  //     },
  //     {
  //       x1: enemyWidth/2,
  //       y1: 0,
  //       x2: enemyWidth,
  //       y2: enemyHeight/2,
  //       greaterThan: true
  //     }
  //   ]
  //   var checkPointY = (GLOBALS.initCharacterPosition.y - ((GLOBALS.playerWidthInMeters*GLOBALS.pixelsInAMeter)/2))
  //   var checkPointX = (GLOBALS.initCharacterPosition.x+ (GLOBALS.playerHeightInMeters*GLOBALS.pixelsInAMeter))
  //   for(var i = 0; i < collisions.length; i++){
  //     var eachLine = collisions[i];
  //     var slope = ((eachLine.y2 - eachLine.y1) / (eachLine.x2 - eachLine.x1));
  //     var b = (eachLine.y1 - (slope * eachLine.x1));
  //     if(eachLine.greaterThan){
  //       if(checkPointY >= (slope * checkPointX) + b){
  //         console.log('in range of greater than line')
  //       }
  //     } else {
  //       if(checkPointY <= (slope * checkPointX) + b){
  //         console.log('in range of less than line')
  //       }
  //     }
  //   }
  // }


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
              this.onProjectileHitEnemy(p, i)
            }
          }
        }
    }
    if(this.checkLength(this.coinArray.length)){
      for(var i = 0; i < this.coinArray.length; i++){
        var playerMinY = (this.absPlayerPosition.y - ((GLOBALS.playerWidthInMeters)*GLOBALS.pixelsInAMeter) /2)
        var playerMaxY = (this.absPlayerPosition.y)
        var playerMinX = (this.absPlayerPosition.x)
        var playerMaxX = (this.absPlayerPosition.x + (GLOBALS.playerHeightInMeters*GLOBALS.pixelsInAMeter))
        var coinX = this.coinArray[i].x*GLOBALS.coins.multiplier+this.background.position.x+this.coinLayoutArray[0].position.x
        var coinY = ((this.coinArray[i].y*GLOBALS.coins.multiplier)-this.background.position.y+this.coinLayoutArray[0].position.y)
        var coinOnX = ifBetween(coinX, playerMinX, playerMaxX)
        var coinOnY = ifBetween(coinY, playerMinY, playerMaxY)
        if(i == 0){
          // console.log(coinY, playerMinY, playerMaxY)
        }
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
        this.stopAnimations = true;
        if(this.enemies[id].type == 'ELECTRICEEL'){
          this.lastAnimationState = this.player.animationState;
          if(this.lastAnimationState == GLOBALS.SeaLord.eelDamageAnimation){
            this.lastAnimationState = GLOBALS.SeaLord.fallingAnimation
          }
          this.player.animationState = GLOBALS.SeaLord.eelDamageAnimation
        } else {

          this.lastAnimationState = this.player.animationState;
          if(this.lastAnimationState == GLOBALS.SeaLord.damageAnimation){
            this.lastAnimationState = GLOBALS.SeaLord.fallingAnimation
          }
          this.player.animationState = GLOBALS.SeaLord.damageAnimation
        }
      }
    }
  }
  onProjectileHitEnemy(p, i){
    this.points.push({
      x: this.projectiles[p].position.x,
      y: this.projectiles[p].position.y,
      text: "+10"
    })
    this.projectiles.splice(p, 1);
    this.enemies[i].health -= 1;
    this.enemies[i].position.x = -GLOBALS.dimensions.width
    this.enemies[i].position.y = 0
    this.enemies[i].isDeleting = true
    this.enemies.splice(i, 1);
    this.randomlyGenerateEnemies();
    this.randomlyGenerateAlert();
    this.scoringSystem.enemiesKilled += 1;
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
      Vibration.vibrate()
    }
  }
  checkUnique(uniqueIdentifier){

    var isUnique = true;
    for(var i = 1; ((i < this.enemies.length) && (this.checkExists(this.enemies[i]))); i++){
      if(this.enemies[i].uniqueIdentifier == uniqueIdentifier){
        isUnique = false;
      }
    }
    return isUnique;
  }
  getUniqueId(){
    var uniqueIdentifier = Math.random() * 10000;
    var found = false;
    while(!found){
      if(this.checkUnique(uniqueIdentifier)){
        found = true;
        return uniqueIdentifier;
      }
    }

  }
  addEnemy(enemy) {
    let {type, dimensions, damage, wave, speed, widthInMeters, steps, src, distanceAway} = enemy;
    var uniqueIdentifier = this.getUniqueId();
    var sign;
    var yStart;
    if(Math.random() > .5){
      sign = 1
    } else {
      sign = (-1)
    }
    if(this.forceUp > 4){
      yStart = this.background.position.y + (Math.random() * this.absPlayerPosition.y) + GLOBALS.dimensions.height * this.forceUp/3
    } else if(this.forceUp < -4){
      yStart = this.background.position.y + (Math.random() * this.absPlayerPosition.y) - GLOBALS.dimensions.height * (Math.abs(this.forceUp))/3
    } else {
      if(Math.random() > .5){
        yStart = this.background.position.y + (Math.random() * this.absPlayerPosition.y)
      } else {
        yStart = this.background.position.y + (Math.random() * this.absPlayerPosition.y) + GLOBALS.dimensions.height / 3
      }
    }
    this.enemies.push({
      uniqueIdentifier,
      type,
      dimensions,
      damage,
      wave: {
        frequency: sign*(Math.random() + .9) * 1.1 * wave.frequency,
        wavelength: (Math.random() + 0.9) * 1.1 * wave.wavelength,
        trackAngle: wave.trackAngle
      },
      speed,
      steps,
      src,
      distanceAway,
      widthInMeters,
      position: {
        x: (Math.random() * (GLOBALS.dimensions.width/4)+GLOBALS.dimensions.width+100),
        y: yStart,
        x0: (Math.random() * (GLOBALS.dimensions.width/4)+GLOBALS.dimensions.width+100),
        y0: yStart
      },
      collided: false,
      angle: 0,
      health: 1,
      loaded: false,
      mounted: true,
      isDeleting: false
    })
  }
  buy(type) {
    if(this.coins > 0){
      switch(type){
        case 'HARPOON':
          this.coins -= 1
          this.shop.harpoons += 1
          console.log('Bought 1 Harpoon')
        case 'AQUARIA':
          this.coins -= 5
          this.ownedCharacters.push('AQUARIA')
          console.log('Bought Aquaria for 5 Coins')
          console.log(this.ownedCharacters.length)

      }
    } else {
      console.log('Not enough money to buy anything')
    }
  }
  // upgrade(item){
  //   switch(item){
  //     case 'PLAYER':
  //       this.coins -= 1
  //       this.shop.harpoons += 1
  //       console.log('Bought 1 Harpoon')
  //   }
  // }
}
const hydrate = create({
    storage: AsyncStorage
})

const store = new ObservableListStore()
export default store
hydrate('store', store)
    // post hydration
    .then(() => console.log('store hydrated'))
