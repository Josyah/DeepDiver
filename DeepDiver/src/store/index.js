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
  @observable character = {
    position: {
      x: GLOBALS.initCharacterPosition.x,
      y: GLOBALS.initCharacterPosition.y
    },
    angle: 0
  };
  @observable navigationState = 'HOME'
  moveBackground () {
    this.background.position.x = this.background.position.x-(1.5*GLOBALS.gameSpeed)
  }
  pressScreen () {
    console.log('pressed');
    this.character.position.y = this.character.position.y + GLOBALS.jumpConstant
  }
}


const store = new ObservableListStore()
export default store
