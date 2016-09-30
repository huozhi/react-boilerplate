import {handleActions} from 'redux-actions'
import {UPDATE_FEEDS} from '../actions/feeds'

const initialState = []

export default handleActions({
  [UPDATE_FEEDS]: (state, {payload: feeds}) => feeds,
}, initialState)
