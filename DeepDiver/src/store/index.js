import {observable} from 'mobx';
import {GLOBALS} from '../globals';
let index = 0
let add = true
var lastId = 0
var count = 1
var range = 5000000000
import {ifBetween} from '../utils/ifBetween'
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
    secondary: {
      position: {
        x: GLOBALS.initBackgroundWidth+10,
        y: GLOBALS.initBackgroundPosition.y
      },
      offset: {
        x: 0,
        y: 0
      }
    },
    offset: {
      x: GLOBALS.initBackgroundPosition.x,
      y: GLOBALS.initBackgroundPosition.y
    }
  };
  @observable enemies = [this.initialEnemies('HAMMERHEAD')
  ]
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
  @observable coinArray = [{
    position: {
      x: 1000,
      y: 100
    },
    speed: 3
  }];
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
  initialEnemies(enemyType){
    return {
      enemyType,
      position: {
        x: 1000,
        y: 100,
        x0: 1000,
        y0: 100,
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
  loseLife(){
    if(this.hearts.length != 1){
      this.hearts.splice(0, 1);
    } else{
      this.die()
    }
  }
  reset(){
    this.background.position = GLOBALS.initBackgroundPosition,
    this.enemies = [this.initialEnemies('HAMMERHEAD')]
    lastLife = 0;
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
    //coming into foreground
  }
  inactive(){
    this.navigationState = 'PAUSED'
    //going into background
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
      console.log('MOVED BACKGROUND')
    } else if((this.background.secondary.position.x + this.background.secondary.offset.x) < -(GLOBALS.initBackgroundDimensions.width+100)){
      console.log('MOVED SECOND BACKGROUND')
      this.background.secondary.offset.x += 2*GLOBALS.initBackgroundDimensions.width
    }
  }
  moveEnemies(){
    for(var x = 0; x < this.enemies.length ; x++){
      // console.log(this.enemies.length, this.enemies[x].position.x)
      this.enemies[x].position.x -= this.enemies[x].speed
      this.checkEnemyPosition(x)
      this.moveInWave(x, 100, 200)
      this.enemyPath(x)
    }
  }
  moveCoins(){
    for(var x = 0; x < this.coinArray.length ; x++){
      // console.log(this.enemies.length, this.enemies[x].position.x)
      this.coinArray[x].position.x -= this.coinArray[x].speed
      //this.checkEnemyPosition(x)
    }
  }
  checkEnemyPosition(x){
    if(this.enemies[x].position.x < -300){
        this.randomlyGenerateEnemy()
        this.deleteEnemy(0)
    }

  }
  randomlyGenerateEnemy(){
    switch(this.region){
      case 'BEACH':
        this.addEnemy(GLOBALS.regions.beach.enemies[Math.round(Math.random() *  (GLOBALS.regions.beach.enemies.length-1))])
        break;
      case 'MIDSEA':
        this.addEnemy(GLOBALS.regions.midsea.enemies[Math.round(Math.random() *  (GLOBALS.regions.midsea.enemies.length-1))])
        break;
      case 'MIDNIGHT':
        this.addEnemy(GLOBALS.regions.midnight.enemies[Math.round(Math.random() *  (GLOBALS.regions.midnight.enemies.length-1))])
        break;
    }
    // randomCount = (Math.random() * (range)) + count
    //
    // // console.log(randomCount, count)
    // if(randomCount == count){
    //   this.addEnemy('HAMMERHEAD')
    //   count = 0
    //   range = 10000
    // }
    // range = range*(7/8)
    // count++;
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
      // (wavelength / frequency) *Math.cos(x/wavelength)
      //arctan (slope of tangent line of enemy)
      var angle = Math.atan((frequency/wavelength) *Math.cos(x/wavelength))
      // console.log(angle* (180/Math.PI))
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
  addEnemy(enemyType) {

      this.enemies.push(this.initialEnemies(enemyType.type))
      // console.log(enemyType.type)

  }
  deleteEnemy(index){
    if(this.enemies.length != 0){

      if (index > -1) {
        this.enemies.splice(0, 1);
        // console.log('DELETED', this.enemies.length)
      }
    }
  }
  // checkCollisions(index, y, width, height){
  //       // console.log(GLOBALS.initCharacterPosition.y, this.enemies[i].position.y-this.background.position.y)
  //   var here = ifBetween(GLOBALS.initCharacterPosition.y, (y - height )-this.background.position.y, y-this.background.position.y)
  //
  //
  //     if(here){
  //       this.deleteCoin(index)
  //     }
  //
  //
  // }
  checkForCollisions() {
    for(var i = 0; i < this.enemies.length; i++){
      // console.log(i)
      // CHECK IF IT IS IN RANGE OF X
      if(this.enemies[i].position.x < 200 ){
          // console.log(GLOBALS.initCharacterPosition.y, this.enemies[i].position.y-this.background.position.y)
        var here = ifBetween(GLOBALS.initCharacterPosition.y, this.enemies[i].position.y - (this.enemies[i].dimensions.height) -this.background.position.y, this.enemies[i].position.y-this.background.position.y)
        if(this.enemies[i].position.x > 0){

          if(here){
            this.onCollision(i)
          }
        }
      }
    }

  }
  die() {
    this.navigationState = 'DEAD'
  }
  checkRegion(){
    // console.log(this.background.position.y-GLOBALS.initBackgroundPosition.y)
    var pos = this.background.position.y-GLOBALS.initBackgroundPosition.y
    if((pos < GLOBALS.regions.beach.start) && (pos > GLOBALS.regions.midsea.start)){
      this.region = 'BEACH'
    } else if((pos < GLOBALS.regions.midsea.start) && (pos > GLOBALS.regions.midnight.start)){
      this.region = 'MIDSEA'
    } else if((pos < GLOBALS.regions.midnight.start) && (pos > 0)){
      this.region = 'MIDNIGHT'
    }
  }
  onCollision(id) {
    console.log('COLLISION')
    if(this.enemies.length!=0){
      if(this.enemies[id].collided == false){
        this.enemies[id].collided = true
        // this.deleteEnemy(id)
        this.loseLife()
      }
    }
  }
}


const store = new ObservableListStore()
export default store
