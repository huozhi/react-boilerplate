import {routerReducer as routing} from 'react-router-redux'
import {combineReducers} from 'redux'
import feeds from './feeds'

export default combineReducers({
  routing,
  feeds,
})
