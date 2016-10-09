import {routerReducer as routing} from 'react-router-redux'
import {combineReducers} from 'redux'
import feeds from './feeds'
import notifications from './notifications'

export default combineReducers({
  routing,
  feeds,
  notifications,
})
