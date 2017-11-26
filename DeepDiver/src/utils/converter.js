import {GLOBALS} from '../globals';
exports.bottomToTop = (bottom) => {
  return (
    GLOBALS.dimensions.height - bottom
  )
}
exports.topToBottom = (top) => {
  return (
    GLOBALS.dimensions.height - top
  )
}
