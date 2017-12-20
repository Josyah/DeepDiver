import {observable} from 'mobx';
import {GLOBALS} from '../globals';
let index = 0
let add = true
let count = true
import {ifBetween} from '../utils/ifBetween'
class ObservableListStore {
  @observable background = {
    position: {
      x: GLOBALS.initBackgroundPosition.x,
      y: GLOBALS.initBackgroundPosition.y
    }
  };
  @observable enemies = []
  @observable gamePlay = false
  @observable navigationState = 'HOME'
  @observable forceUp = 0
  @observable repeat = true
  @observable player = {
    position: {
      x: GLOBALS.initCharacterPosition.x,
      y: GLOBALS.initCharacterPosition.y
    },
    width: this.scale * GLOBALS.tileHeight,
    height: this.scale * GLOBALS.tileWidth,
    angle: 90,
    animationState: 1,
    isStatic: false
  };
  @observable scale = .5;
  reset(){
    this.player.position = GLOBALS.initCharacterPosition,
    this.background.position = GLOBALS.initBackgroundPosition,
    this.enemies = []
  }
  pause(){
    this.navigationState = 'PAUSED'
  }
  active(){
  }
  falling(){
    if(this.player.animationState != 2){
      this.player.animationState = 2
      this.player.angle = 90
    }
  }
  changeAnimation(direction){
    if(direction == 'UP'){
      if(this.player.animationState != 3){
        this.player.animationState = 3
        this.player.angle = 100
      }
    } else if (direction == 'DOWN'){
      if(this.player.animationState != 4){
        this.player.animationState = 4
        this.player.angle = 80
      }
    }
  }
  setPositions(position, backgroundX) {
    this.character.position = position;
    this.backgroundX = backgroundX;
  }
  moveBackground () {
    if(this.gamePlay){
      this.background.position.x -= (1.5*GLOBALS.gameSpeed.horiziontal)
      for(var i = 0; i < this.enemies.length; i++){
        this.enemies[i].position.x -= (1.5*GLOBALS.gameSpeed.horiziontal)
        // console.log('moved'+this.enemies[i].position.x)
      }
    }
    if(this.enemies.length != 0){

      if(this.enemies[0].position.x < -300){
        if(count){

          this.addEnemy('DEFAULT')
          count = false
        }
      }
    }
    // console.log('move background')
  }
  moveBackgroundDown() {
    if(this.gamePlay){
      this.background.position.y -= (1.5*GLOBALS.gameSpeed.vertical)
      for(var i = 0; i < this.enemies.length; i++){
        this.enemies[i].position.y -=(1.5*GLOBALS.gameSpeed.vertical)
      }
    }
  }
  moveBackgroundUp() {
    if(this.gamePlay){
      this.background.position.y += (1.5*GLOBALS.gameSpeed.vertical)
      for(var i = 0; i < this.enemies.length; i++){
        this.enemies[i].position.y +=(1.5*GLOBALS.gameSpeed.vertical)
      }
    }
  }
  pressScreen (upOrDown) {
    // console.log('pressed');
    // this.player.position.y = tis.player.position.y - GLOBALS.jumpConstant;
    if(this.gamePlay){
      switch(upOrDown){
        case 'UP':
          this.forceUp = GLOBALS.forceUp
          break;
        case 'DOWN':
          this.forceUp = -GLOBALS.forceUp
          break;
      }
    }
  }
  releaseScreen () {
    // console.log('released');
    // this.player.position.y = tis.player.position.y - GLOBALS.jumpConstant;
    if(this.gamePlay){
      this.forceUp = 0
      this.player.angle = 90
    }

  }
  addEnemy(type, position, dimensions) {
    switch(type){
      case 'DEFAULT':
        this.enemies.push({
          type: 'DEFAULT',
          position: {
            x: 1000,
            y: 100
          },
          dimensions: {
            height: 75,
            width: 75
          }
        })
        console.log('ADDED DEFAULT')
      case 'SHARK':
        this.enemies.push({
          type: 'SHARK',
          position: {
            x: 1000,
            y: 100
          },
          dimensions: {
            height: 75,
            width: 75
          }

        })
        console.log('ADDED DEFAULT')

    }
  }
  deleteEnemy(index){
    if(this.enemies.length != 0){

      if (index > -1) {
        this.enemies.splice(0, 1);
        console.log('DELETED', this.enemies.length)
      }
    }
  }
  checkPlayerPosition() {
    for(var i = 0; i < this.enemies.length; i++){
      if(this.enemies[i].position.x - this.player.position.x < this.enemies[i].dimensions.width){
        if(this.enemies[i].position.x>0){
          // if(this.player.position.x - this.enemies[i].position.x)
          console.log('MIN',this.enemies[i].position.y - (this.enemies[i].dimensions.height))
          console.log('MAX',this.enemies[i].position.y)
          console.log('PLAYER',this.player.position.y)

          var here = ifBetween(this.player.position.y, this.enemies[i].position.y - (this.enemies[i].dimensions.height), this.enemies[i].position.y)
          if(here){
            this.onCollision()
          }
        }
      }
    }
    if(this.player.position.y < GLOBALS.topBoundary){
      // console.log('MOVE SCREEN UP BREH')
      this.moveBackgroundUp()
      // this.background.position.y = this.background.position.y+(1.5*GLOBALS.gameSpeed.vertical)
      // GLOBALS.forceUp = 1
      this.player.isStatic = true
    }
    else if(this.player.position.y > (GLOBALS.dimensions.height-GLOBALS.bottomBoundary)){
      // console.log('MOVE SCREEN DOWN BREH')
      this.moveBackgroundDown()
      // this.background.position.y = this.background.position.y-(1.5*GLOBALS.gameSpeed.vertical)
      this.player.isStatic = true
    }
    else {
      GLOBALS.forceUp = 5
      // console.log('false')
      this.player.isStatic = false
    }

  }
  die() {
    this.navigationState = 'DEAD'
  }
  onCollision() {
    console.log('COLLIDED')
    if(this.navigationState == 'LEVEL'){

      this.navigationState = 'DEAD'
    }
  }
}


const store = new ObservableListStore()
export default store
