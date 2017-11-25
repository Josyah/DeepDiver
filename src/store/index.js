import {observable} from 'mobx';
import {GLOBALS} from '../globals';
let index = 0

class ObservableListStore {
  @observable backgroundPosition = GLOBALS.initBackgroundPosition.x
  @observable characterPositionX = GLOBALS.initCharacterPosition.x
  @observable characterPositionY = GLOBALS.initCharacterPosition.y


  moveBackground () {
    this.backgroundPosition=this.backgroundPosition-(1.5*GLOBALS.gameSpeed)
  }

}


const observableListStore = new ObservableListStore()
export default observableListStore
