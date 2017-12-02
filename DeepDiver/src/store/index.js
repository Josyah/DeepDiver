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
  @observable gamePlay = false
  @observable player = {
    position: {
      x: GLOBALS.initCharacterPosition.x,
      y: GLOBALS.initCharacterPosition.y
    },
    angle: 0
  };
  @observable navigationState = 'HOME'
  @observable forceUp = 0
  moveBackground () {
    if(this.gamePlay){
      this.background.position.x = this.background.position.x-(1.5*GLOBALS.gameSpeed.horiziontal)
    }
  }
  pressScreen () {
    // console.log('pressed');
    // this.player.position.y = tis.player.position.y - GLOBALS.jumpConstant;
    if(this.gamePlay){
      this.forceUp = -5
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
}


const store = new ObservableListStore()
export default store
