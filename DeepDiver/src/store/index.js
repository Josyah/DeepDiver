import {observable} from 'mobx';
import {GLOBALS} from '../globals';
let index = 0

class ObservableListStore {
  @observable background = {
    position: {
      x: GLOBALS.initBackgroundPosition.x,
      y: GLOBALS.initBackgroundPosition.y
    }
  }
  @observable enemy = {
    position: {
      x: 300,
      y: 300
    }
  }
  @observable enemies = []
  @observable gamePlay = false
  @observable navigationState = 'HOME'
  @observable forceUp = 0
  @observable shells = [
    {
      type: 'SHELL'
    }
  ];
  @observable player = {
    position: {
      x: GLOBALS.initCharacterPosition.x,
      y: GLOBALS.initCharacterPosition.y
    },
    width: this.scale * GLOBALS.tileHeight,
    height: this.scale * GLOBALS.tileWidth,
    angle: 90,
    animationState: 1
  };
 @observable scale = .5
  @observable backgroundX = 0;
  falling(){
    if(this.player.animationState != 2){
      this.player.animationState = 2
      this.player.angle = 100
    }
  }
  changeAnimation(direction){
    if(direction == 'UP'){
      if(this.player.animationState != 3){
        this.player.animationState = 3
        this.player.angle = 80
      }
    } else if (direction == 'DOWN'){
      if(this.player.animationState != 4){
        this.player.animationState = 4
        this.player.angle = 100
      }
    }
  }
  goingDown(){
    if(this.player.animationState != 4){
      this.player.animationState = 4
      this.player.angle = 80
    }
  }
  setPositions(position, backgroundX) {
    this.character.position = position;
    this.backgroundX = backgroundX;
  }
  moveBackground () {
    if(this.gamePlay){
      this.background.position.x = this.background.position.x-(1.5*GLOBALS.gameSpeed.horiziontal)
    }
  }
  moveBackgroundUp () {
    if(this.gamePlay){
      this.background.position.y = this.background.position.y-(1.5*GLOBALS.gameSpeed.vertical)
    }
  }
  pressScreen (upOrDown) {
    // console.log('pressed');
    // this.player.position.y = tis.player.position.y - GLOBALS.jumpConstant;
    if(this.gamePlay){
      switch(upOrDown){
        case 'UP':
          this.forceUp = -5
          break;
        case 'DOWN':
          this.forceUp = 5
          break;
      }
    }
  }
  releaseScreen () {
    // console.log('released');
    // this.player.position.y = tis.player.position.y - GLOBALS.jumpConstant;
    if(this.gamePlay){
      this.forceUp = 0
    }

  }
  checkPlayerPosition() {
    if(this.player.position.y < GLOBALS.topBoundary){
      // console.log('MOVE SCREEN UP BREH')
      this.background.position.y = this.background.position.y-(1.5*GLOBALS.gameSpeed.vertical)
    }
    if(this.player.position.y > (GLOBALS.dimensions.height-GLOBALS.bottomBoundary)){
      // console.log('MOVE SCREEN DOWN BREH')
      this.background.position.y = this.background.position.y+(1.5*GLOBALS.gameSpeed.vertical)
    }
  }
  die() {
    this.navigationState = 'DEAD'
  }
  onCollision() {

  }
}


const store = new ObservableListStore()
export default store
