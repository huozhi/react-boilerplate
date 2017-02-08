import {handleActions} from 'redux-actions'
import {UPDATE_FEEDS} from '../actions/feeds'

const initialState = {
  feeds: [],
  loading: false
}

export default handleActions({
  [UPDATE_FEEDS]: (state, {payload: feeds}) => ({
    ...state,
    feeds
  })
}, initialState)
