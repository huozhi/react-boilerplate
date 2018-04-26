import {combineReducers} from 'redux'
import feeds from './feeds'
import notifications from './notifications'

export default combineReducers({
  feeds,
  notifications
})
