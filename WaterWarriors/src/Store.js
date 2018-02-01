import {observable} from 'mobx';
import {GLOBALS} from './globals';
import { Vibration, Animated, AsyncStorage} from 'react-native';
let add = true
var lastAlert = '';
var bubbleCount = 0;
var numberToReach = Math.round((Math.random() * 100) + 25);
var tick = 0;
var dustNumberToReach = Math.round((Math.random() * 40) + 10);
var dustTick = 0;
var enemy;
var layer;
var boostStart = 0;
var offScreenCount = 0;
var lastInt = -1;
var src;
var type;
import {ifBetween} from './utils/ifBetween'
import {getPlayerStats} from './utils/getPlayerStats'
import {coinLayouts} from './utils/coinLayout'
import { create, persist } from 'mobx-persist'
import { getBackgroundComponents } from './utils/getBackgroundComponents'
class ObservableListStore {
  @persist @observable coins = 0;
  @persist @observable vibration = true;
  @persist @observable bestScore = 0;
  @persist @observable controls = 'VERTICAL';
  @persist @observable selectedPlayer = 'SEA_LORD';
  @persist @observable dailyRewards = 0;
  @persist @observable lastOpenTime = 0;

  @persist('list') @observable ownedCharacters = ['SEA_LORD']
  @observable player = getPlayerStats(this.selectedPlayer);
  @observable getRewarded = false;
  @observable points = [];
  @observable back = 'HOME';
  @observable pickups = [];
  @observable score = 0;
  @observable missiles = [];
  @observable coinValue = 1;
  @observable shop = {
    harpoons: this.player.maxHarpoons,
    ownedCharacters: [],
    coins: 0
  };
  @observable currentlyPlaying = false;
  @observable outOfBounds = false;
  @observable dust = []
  @observable lastAnimationState = 0;
  @observable wheelOffset = 0;
  @observable enemies = [];
  @observable stopAnimations = false;
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
  @observable bubbles = [];
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
      y: 25000
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
  handleUpdate(){
    if(((this.background.loaded && this.player.loaded) && this.currentlyPlaying)){
      if((this.background.position.y > GLOBALS.topBoundary) || (this.background.position.y > (GLOBALS.initBackgroundDimensions.height - GLOBALS.dimensions.height))){
        if(this.forceUp < 0){
          this.background.position.y += this.forceUp
        }
      } else {
        this.background.position.y += this.forceUp
      }
      this.moveBackground();
      if(this.enemies.length != 0){
        this.moveEnemies();
      }
      if(this.projectiles.length != 0){
        this.moveProjectiles();
      }
      this.moveMissiles();
      this.moveDust();
      this.movePickups();
      this.checkRegion();
      this.randomlyGenerateEnemies(); //fattos
      this.randomlyGenerateDust(); //fattos
    }
  }
  loseLife(amount){
    if(this.player.health > 0 && amount < this.player.health){
      this.player.health -= amount
    } else{
      this.die()
    }
  }
  movePlayer(distanceBetween){
    if(!this.unPausing ){
      var angle = distanceBetween/2
      // this.forceUp = -(distanceBetween/(20 - this.player.agility)) //10?
      this.player.angle = angle// = 40
      this.forceUp = -(this.background.speed*(Math.sin(angle*(Math.PI/180)))) //10?
      // console.log(this.forceUp)
      // this.player.offset = -angle
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
  addMissile(){
    this.missiles.push({
      x: GLOBALS.dimensions.width*2,
      y: this.absPlayerPosition.y
    })
  }
  addDust(){
    if(this.dust.length < 200){
      this.dust.push({
        x: (Math.random() * 200) + GLOBALS.dimensions.width,
        y: (Math.random()*GLOBALS.dimensions.height)-GLOBALS.dimensions.height+this.background.position.y,
        layer: Math.round((Math.random() * 3) +1)
      })
    }
  }
  moveDust(){
    for(var i = 0; i < this.dust.length; i ++){
      this.ifDustOffScreen(i)
      this.dust[i].x -= (this.background.speed/this.dust[i].layer)
    }
  }
  movePickups(){
    for(var i = 0; i < this.pickups.length; i ++){
      this.ifPickupOffscreen(i)
      this.pickups[i].x -= (this.background.speed)
      this.checkPickupCollisions(i)
    }
  }
  checkPickupCollisions(i){
    var collided = ifBetween(this.absPlayerPosition.y+30 +this.background.position.y-GLOBALS.dimensions.height, this.pickups[i].y - (this.pickups[i].height), this.pickups[i].y)
    if((this.pickups[i].collided == false) && ((this.pickups[i].x < (this.absPlayerPosition.x) && collided) && (this.pickups[i].x > 0))){
      this.onPlayerHitPickup(i);
    }
  }
  onPlayerHitPickup(x){
    this.vibrate()
    this.pickups[x].collided = true
    switch(this.pickups[x].type){
      case 'HARPOON':
        this.shop.harpoons += 10;
        break;
      case 'SPEED_BOOST':
        this.boostSpeed();
        break;
      case 'HEALTH_REFRESH':
        this.resetHealth();
        break;
      case 'DOUBLE_COIN':
        this.doubleCoins();
        break;
      case 'COIN':
        this.onPickUpCoin();
        break;
      default:
        this.boostSpeed();
        break;
    }
  }
  randomlyGeneratePickups(){
    if(Math.random()*100 < 10){
    // if(1 == 1){
      this.addPickup()
    }
  }
  boostSpeed(){
    this.player.boosted = true;
    boostStart = (Date.now() / 1000);
    this.vibrate();
  }
  stopBoost(){
    var currentTime = (Date.now() / 1000)
    if(currentTime > (boostStart + this.player.boostDuration)){
      this.player.boosted = false
    }
  }
  ifPickupOffscreen(i){
    if(this.pickups[i].x < -100){
      //delete pickup
      this.pickups[i].inHibernation = true
    }
  }
  addPickup(){
    switch(Math.round(Math.random()*3)){
      case 0:
        src = GLOBALS.pickups.harpoon.src;
        type = 'HARPOON';
        break;
      case 1:
        src = GLOBALS.pickups.boost.src;
        type = 'SPEED_BOOST';
        break;
      case 2:
        src = GLOBALS.pickups.health.src;
        type = 'HEALTH_REFRESH';
        break;
      case 3:
        src = GLOBALS.pickups.coin.src;
        type = 'COIN';
        break;
    }
      this.pickups.push({
        x: GLOBALS.dimensions.width+10,
        y: this.background.position.y + Math.random()*GLOBALS.dimensions.height -GLOBALS.dimensions.height,
        type,
        height: 35,
        width: 35,
        collided: false,
        inHibernation: false,
        src
      })


  }
  doubleCoins(){
    this.coinValue = 2
  }
  moveMissiles(){
    for(var i = 0; i < this.missiles.length; i++){
      this.missiles[i].x -= (5 + this.background.speed)
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
  resetHealth(){
    this.player.health = this.player.maxHealth
  }
  closeRewards(){
    this.getRewarded = false
    console.log('CLOSING REWARDS')
  }
  startGame(){
    this.navigationState = 'LEVEL'
    this.randomlyGenerateEnemies();
    this.randomlyGenerateBubbles();
    this.currentlyPlaying = true
  }
  resetGame(){
    this.player = getPlayerStats(this.selectedPlayer);
    this.enemies =[]
    lastInt = 0;
    offScreenCount = 0;
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
    this.shop.harpoons = this.player.maxHarpoons;
    this.points.clear()
  }
  pause(){
    // this.player.repeat = false
    this.currentlyPlaying = false
    this.alert = ''
    this.takingDamage = false
    this.paused = true
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
    // if(this.background.speed < 3){
    //   this.background.speed = ((Math.sqrt(-this.background.position.x*GLOBALS.pixelsInAMeter) - constant)/750)+7
    // }
    if(this.player.boosted){
      this.background.speed = this.player.boostSpeed
      this.stopBoost()
    } else {
      this.background.speed = this.player.speed
    }
    if((this.background.position.x + this.background.offset.x) < -(GLOBALS.initBackgroundDimensions.width-GLOBALS.dimensions.width)){
      this.background.offset.x += (GLOBALS.initBackgroundDimensions.width-GLOBALS.dimensions.width)
    }
    var speedX =  Math.abs((this.background.speed)*Math.cos(this.player.angle*(Math.PI/180)))
    // console.log('SPEED',speedX)
    this.background.position.x -= speedX;
    this.moveBackgroundComponents()
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
  moveBackgroundComponents(){
    for(var i = 0; i < this.backgroundComponents.length; i++){
      this.backgroundComponents[i].x -= (this.backgroundComponents[i].speed)
    }
  }
  isEnemyOffScreen(x){
    if(this.enemies[x].position.x < -300 && (this.enemies.length > 0 && this.checkExists(this.enemies[x]))){
      this.enemies[x].inHybernation = true;
    }
  }
  moveEnemies(){
    if(this.checkLength(this.enemies.length)){

        for(var x = 0; x < this.enemies.length ; x++){
          if(this.checkExists(this.enemies[x]) && (!this.enemies[x].inHybernation)){
            this.enemies[x].position.x -= (this.background.speed + this.enemies[x].speed);
            this.isEnemyOffScreen(x);
            this.checkCollisions(x);
            this.moveInWave(x);
          }
        }

    }
  }
  refreshEnemies(){
    console.log('REFRESH')
    // offScreenCount = 0
    // for(var x = 0; x < this.enemies.length ; x++){
    //   if(this.enemies[x].inHybernation){
    //     offScreenCount ++
    //   }
    // }
    // if(offScreenCount == this.enemies.length){
      this.enemies =[]
    // }
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
  randomlyGenerateBubbles(){
    bubbleCount++;
    if(bubbleCount > 30){
      this.bubbles.push({
        x: (Math.random() * 200)+10,
        y: 0,
      })
      bubbleCount = 0
    }
  }

  randomlyGenerateEnemies(){
    tick ++;
    if(tick > numberToReach) {
      tick = 0;
      numberOfEnemies = Math.round((Math.random() * 3));
      this.randomlyGeneratePickups()
      for(var i = 0; i < numberOfEnemies; i++){
        numberToReach = ((Math.random() * 100) + 25);
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
      if(Math.random() < .2){
        this.addMissile()
      }
    }
  }
  ifDustOffScreen(x){
    if(this.dust[x].x < -100){
      this.dust[x].x = (Math.random() * 200) + GLOBALS.dimensions.width
      this.dust[x].y = (Math.random()*GLOBALS.dimensions.height)-GLOBALS.dimensions.height+this.background.position.y
    }
  }
  randomlyGenerateDust(){
    dustTick ++;
    // distance between last
    if(dustTick > dustNumberToReach) {
      dustTick = 0;
      numberOfDust = Math.round((Math.random() * 3));
      for(var i = 0; (i < numberOfDust && this.dust.length < 10); i++){
        dustNumberToReach = ((Math.random() * 40) + 10);
        for(var x = 0; (x < Math.round(Math.random()*3)); x++){
          this.addDust()
        }
      }
    } else if (dustTick > dustNumberToReach) {
      dustTick = 0;
      dustNumberToReach = (Math.random() * 40) + 10;
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
  //
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
  //       if((checkPointY >= (slope * checkPointX) + b) && ((eachLine.x1 <= checkPointX ) && (checkPointX <= eachLine.x2))){
  //         console.log('in range of greater than line')
  //       }
  //     } else {
  //       if((checkPointY <= (slope * checkPointX) + b) && ((eachLine.x1 <= checkPointX ) && (checkPointX <= eachLine.x2))){
  //         console.log('in range of less than line')
  //       }
  //     }
  //   }
  // }


  checkCollisions(i){
    if(this.checkLength(this.enemies.length) && this.checkExists(this.enemies[i])){
        var here = ifBetween(this.absPlayerPosition.y-20 +this.background.position.y-GLOBALS.dimensions.height, this.enemies[i].position.y - (this.enemies[i].dimensions.height), this.enemies[i].position.y)
        if((this.player.boosted != true) && ((this.enemies[i].position.x < (this.absPlayerPosition.x) && here) && (this.enemies[i].position.x > 0 && this.enemies[i].health >0))){
          this.onHitByEnemy(i);
        }
        if(this.checkLength(this.projectiles.length)){
          for(var p = 0; p < this.projectiles.length; p++){
            var projectileInLine = ifBetween(this.projectiles[p].position.y -GLOBALS.dimensions.height,(this.enemies[i].position.y - this.background.position.y) ,(this.enemies[i].position.y + this.enemies[i].dimensions.height-this.background.position.y))
            var projectileOnX = ifBetween(this.projectiles[p].position.x ,(this.enemies[i].position.x) ,(this.enemies[i].position.x + this.enemies[i].dimensions.width))
            if ((projectileInLine && projectileOnX) && (this.enemies[i].position.x > 20 && this.enemies[i].position.x < GLOBALS.dimensions.width)) {
              this.onProjectileHitEnemy(p, i)
            }
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
    if(this.checkLength(this.enemies.length) && this.checkExists(this.enemies[id])){
      if(this.enemies[id].collided == false){
        this.enemies[id].collided = true;
        this.vibrate();
        this.loseLife(this.enemies[id].damage);
        this.takingDamage = true;
        this.stopAnimations = true;
        // this.enemies[id].inHybernation = true;
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
    if(!this.enemies[i].isDeleting && !this.enemies[i].inHybernation){
      if(this.projectiles[p].angle < 0){
        this.enemies[i].animationState = this.enemies[i].damageAnimations.up
        console.log('DIAGONAL UP DEATH')
      } else if(this.projectiles[p].angle > 0){
        this.enemies[i].animationState = this.enemies[i].damageAnimations.down
        console.log('DIAGONAL DOWN DEATH')
      } else if(this.projectiles[p].angle == 0){
        this.enemies[i].animationState = this.enemies[i].damageAnimations.straight
        console.log('STRAIGHT DEATH')
      }
    }
    this.enemies[i].isDeleting = true;
    this.projectiles.splice(p, 1);
    // this.enemies[i].health -= 1;
    // this.enemies[i].position.x = -GLOBALS.dimensions.width
    // this.enemies[i].position.y = 0
    // this.randomlyGenerateEnemies();
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
    let {type, dimensions, damage, wave, speed, widthInMeters, steps, src, distanceAway, damageAnimations} = enemy;
    var uniqueIdentifier = this.getUniqueId();
    var sign;
    var yStart;
    if(Math.random() > .5){
      sign = 1
    } else {
      sign = (-1)
    }
    yStart = this.background.position.y + (Math.random() * GLOBALS.dimensions.height) -GLOBALS.dimensions.height
    this.enemies.push({
      uniqueIdentifier,
      type,
      dimensions,
      damage,
      damageAnimations,
      inHybernation: false,
      animationState: 0,
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
