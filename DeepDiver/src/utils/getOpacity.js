import {GLOBALS} from '../globals'

exports.getOpacity = (distanceAway) => {
  var opacity = 1 - (distanceAway/GLOBALS.visibilityInMeters)
  return opacity
}
