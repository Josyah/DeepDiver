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
    this.background.position.x = this.background.position.x-(1.5*GLOBALS.gameSpeed)
  }
  pressScreen () {
    console.log('pressed');
    // this.player.position.y = tis.player.position.y - GLOBALS.jumpConstant;
    this.forceUp = -5
  }
  releaseScreen () {
    console.log('released');
    // this.player.position.y = tis.player.position.y - GLOBALS.jumpConstant;
    this.forceUp = 0
  }
}


const store = new ObservableListStore()
export default store
