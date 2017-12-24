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
      x: GLOBALS.initBackgroundPosition.x,
      y: GLOBALS.initBackgroundPosition.y
    },
    dimensions: {
      height: GLOBALS.initBackgroundHeight,
      width: GLOBALS.initBackgroundWidth,
    },
    offset: {
      x: GLOBALS.initBackgroundPosition.x,
      y: GLOBALS.initBackgroundPosition.y
    }
  };
  @observable enemies = [this.initialEnemies('HAMMERHEAD', 100)]
  @observable alerts = []
  @observable hearts = [
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
    }
  };
  @observable scale = .5;
  initialEnemies(enemyType, position){
    return {
      enemyType,
      position: {
        x: 1000,
        y: position,
        x0: 1000,
        y0: position
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
      angle: 0
    }

  }
  loseHeart(){
    if(this.hearts.length != 1){
      this.hearts.splice(0, 1);
    } else{
      this.die()
    }
  }
  reset(){
    this.background.position = GLOBALS.initBackgroundPosition,
    this.enemies = [this.initialEnemies('HAMMERHEAD')]
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
      this.enemies[x].position.x -= this.enemies[x].speed;
      this.checkEnemyPosition(x);
      this.moveInWave(x, 100, 200);
      this.enemyPath(x);
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
        randomStart = (Math.random() * (GLOBALS.regions.beach.start-GLOBALS.regions.midsea.start)) + GLOBALS.regions.midsea.start
        this.addEnemy(GLOBALS.regions.beach.enemies[Math.round(Math.random() *  (GLOBALS.regions.beach.enemies.length-1))], randomStart)
        break;
      case 'MIDSEA':
        randomStart = (Math.random() * GLOBALS.regions.midsea.start-GLOBALS.regions.midnight.start) + GLOBALS.regions.midnight.start
        this.addEnemy(GLOBALS.regions.midsea.enemies[Math.round(Math.random() *  (GLOBALS.regions.midsea.enemies.length-1))], randomStart)
        break;
      case 'MIDNIGHT':
        randomStart = (Math.random() * GLOBALS.regions.midnight.start)
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
      if((this.enemies[i].position.x < 200 && here) && this.enemies[i].position.x > 0){
        this.onEnemyCollision(i)
      }
    }
    for(var i = 0; i < this.coinArray.length; i++){
      // console.log((1000+this.coinArray[0].x*50) +this.background.position.x)
      var here = ifBetween((GLOBALS.initCharacterPosition.y - ((GLOBALS.playerWidthInMeters*GLOBALS.pixelsInAMeter)/2)), ((this.coinArray[i].y*50)+this.coinLayoutArray[0].position.y) - (12.5) -this.background.position.y, ((this.coinArray[i].y*50)+this.coinLayoutArray[0].position.y) -this.background.position.y)
      if(((((this.coinLayoutArray[0].position.x+this.coinArray[i].x*50) + this.background.position.x) < 200) && here) && (((this.coinLayoutArray[0].position.x+this.coinArray[i].x*50) + this.background.position.x) > 0)){
        // console.log('HIT COIN '+ i)
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
