import {observable} from 'mobx';
import {GLOBALS} from '../globals';
let index = 0
let add = true
var lastId = 0
var count = 1
var range = 5000000000
import {ifBetween} from '../utils/ifBetween'
import {coinLayouts} from '../utils/coinLayout'
class ObservableListStore {
  @observable background = {
    position: {
      x: 0,
      y: 0
    },
    dimensions: {
      height: GLOBALS.initBackgroundHeight,
      width: GLOBALS.initBackgroundWidth,
    },
    offset: {
      x: GLOBALS.initBackgroundPosition.x,
      y: GLOBALS.initBackgroundPosition.y
    },
    loaded: false
  };
  @observable enemies = [this.initialEnemies('HAMMERHEAD', 100)]
  @observable alerts = []
  @observable navigationState = 'HOME'
  @observable forceUp = 0
  @observable forceLeft = 2
  @observable gravity = {x: 0, y: -2, scale: 0.0005 }
  @observable repeat = true
  @observable unPausing = false
  @observable paused = false
  @observable coins = 0;
  @observable region = 'Beach Zone'
  @observable coinLayoutArray = [{
    position: {
      x: 1000,
      y: 100
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
    angle: 90,
    animationState: 2,
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
  initialEnemies(enemyType, position){
    return {
      enemyType,
      position: {
        x: 1000,
        y: this.background.position.y + position,
        x0: 1000,
        y0: this.background.position.y + position
      },
      dimensions: {
        height: 50,
        width: 50
      },
      collided: false,
      speed: 7,
      path: {
        type: 'STRAIGHT',
        frequency: 200,
        wavelength: 200
      },
      angle: 0,
      health: 3,
      loaded: false
    }

  }
  loseHeart(){
    if(this.player.health > 0){
      this.player.health -= 20
    } else{
      this.die()
    }
  }
  reset(){
    this.background.position = { x: 0, y: 0};
    this.background.offset = GLOBALS.initBackgroundPosition;
    coinArray = coinLayouts.SquareLayout;
    this.enemies = [this.initialEnemies('HAMMERHEAD', 100)]
    this.hearts = [
      {
        animationState: 0
      },
      {
        animationState: 0
      },
      {
        animationState: 0
      },
    ]
  }
  pause(){
    this.navigationState = 'PAUSED'
  }
  active(){
  }
  inactive(){
    this.navigationState = 'PAUSED'
  }
  falling(){
    if(this.player.animationState != this.player.animate.falling){
      this.player.animationState = this.player.animate.falling
      this.player.angle = 90
    }
  }
  moveBackground () {
    this.forceLeft = -GLOBALS.forceLeft
    if((this.background.position.x + this.background.offset.x) < -(GLOBALS.initBackgroundDimensions.width-GLOBALS.dimensions.width)){
      this.background.offset.x += (GLOBALS.initBackgroundDimensions.width-GLOBALS.dimensions.width)
    }
  }
  moveEnemies(){
    for(var x = 0; x < this.enemies.length ; x++){
      if(this.enemies[x].loaded){

        this.enemies[x].position.x -= this.enemies[x].speed;
        this.checkEnemyPosition(x);
        this.enemyPath(x);
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
  checkEnemyPosition(x){
    if(this.enemies[x].position.x < -300){
        this.randomlyGenerateEnemy();
        this.deleteEnemy(0);
    }
  }
  randomlyGenerateEnemy(){
    var randomStart;
    switch(this.region){
      case 'BEACH':
        // randomStart = (Math.random() * (GLOBALS.regions.beach.start-GLOBALS.regions.midsea.start)) + GLOBALS.regions.midsea.start
        randomStart = (Math.random() * 500)
        this.addEnemy(GLOBALS.regions.beach.enemies[Math.round(Math.random() *  (GLOBALS.regions.beach.enemies.length-1))], randomStart)
        break;
      case 'MIDSEA':
        // randomStart = (Math.random() * GLOBALS.regions.midsea.start-GLOBALS.regions.midnight.start) + GLOBALS.regions.midnight.start
        randomStart = (Math.random() * 500)
        this.addEnemy(GLOBALS.regions.midsea.enemies[Math.round(Math.random() *  (GLOBALS.regions.midsea.enemies.length-1))], randomStart)
        break;
      case 'MIDNIGHT':
        // randomStart = (Math.random() * GLOBALS.regions.midnight.start)
        randomStart = (Math.random() * 500)
        this.addEnemy(GLOBALS.regions.midnight.enemies[Math.round(Math.random() * (GLOBALS.regions.midnight.enemies.length-1))], randomStart)
        break;
    }
  }
  enemyPath(index){
    var type = this.enemies[index].path.type
    switch(type){
      case 'WAVE':
        this.moveInWave(index)
    }
  }
  moveInWave(index){
    if(this.enemies[index]){
      let {y0, y, x, path} = this.enemies[index].position
      let {frequency, wavelength} = this.enemies[index].path
      this.enemies[index].position.y = y0 + frequency* Math.sin(x / wavelength)
      var angle = Math.atan((frequency/wavelength) *Math.cos(x/wavelength))
      this.enemies[index].angle = angle* (180/Math.PI)
    }
  }
  pressScreen (upOrDown) {
    if(upOrDown == 'UP'){
      this.forceUp = GLOBALS.forceUp
      this.player.animationState = this.player.animate.goingUp
      this.player.angle = 80

    } else {
      this.forceUp = -GLOBALS.forceUp
        this.player.animationState = this.player.animate.goingDown
        this.player.angle = 100

    }
  }
  releaseScreen () {
    this.forceUp = 0
    this.player.angle = 90
  }
  addEnemy(enemyType, position) {
    this.enemies.push(this.initialEnemies(enemyType.type, position))
  }
  deleteEnemy(index){
    if(this.enemies.length != 0 && index > -1){
      this.enemies.splice(0, 1);
    }
  }
  checkCollisions(){
    for(var i = 0; i < this.enemies.length; i++){
      var here = ifBetween((GLOBALS.initCharacterPosition.y - ((GLOBALS.playerWidthInMeters*GLOBALS.pixelsInAMeter)/2)), this.enemies[i].position.y - (this.enemies[i].dimensions.height) -this.background.position.y, this.enemies[i].position.y -this.background.position.y)
      if((this.enemies[i].position.x < 175 && here) && this.enemies[i].position.x > 0){
        this.onEnemyCollision(i)
      }
      if(this.projectiles.length != 0){
        for(var p = 0; p < this.projectiles.length; p++){
          // console.log(this.projectiles[p].position.y, this.enemies[i].position.y - this.background.position.y)
          var projectileInLine = ifBetween(this.projectiles[p].position.y ,(this.enemies[i].position.y - this.background.position.y) ,(this.enemies[i].position.y + this.enemies[i].dimensions.height-this.background.position.y))
          if (projectileInLine && (this.enemies[i].position.x < 175)) {
            this.projectiles.splice(p, 1)
            this.enemies[i].health -= 1
          }
        }
      }
    }
    for(var i = 0; i < this.coinArray.length; i++){
      var here = ifBetween((GLOBALS.initCharacterPosition.y - ((GLOBALS.playerWidthInMeters*GLOBALS.pixelsInAMeter)/2)), ((this.coinArray[i].y*GLOBALS.coins.multiplier)+this.coinLayoutArray[0].position.y) - (GLOBALS.coins.height/2) -this.background.position.y, ((this.coinArray[i].y*GLOBALS.coins.multiplier)+this.coinLayoutArray[0].position.y) -this.background.position.y)
      if(((((this.coinLayoutArray[0].position.x+this.coinArray[i].x*GLOBALS.coins.multiplier) + this.background.position.x) < 200) && here) && (((this.coinLayoutArray[0].position.x+this.coinArray[i].x*GLOBALS.coins.multiplier) + this.background.position.x) > 0)){
        this.onCoinCollision(i)
      }
    }


  }
  createAlert(text){
    this.alerts.push({
      text
    })
  }
  die() {
    this.navigationState = 'DEAD'
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
    if(this.enemies.length!=0){
      if(this.enemies[id].collided == false){
        this.enemies[id].collided = true
        this.loseHeart()
      }
    }
  }
  onCoinCollision(id) {
    if(this.coinArray.length!=0){
      if(this.coinArray[id].collided == false){
        this.coinArray[id].collided = true
        this.coinArray.splice(id, 1);
        this.coins += 1
      }
    }
  }
}


const store = new ObservableListStore()
export default store
