import {handleActions} from 'redux-actions'
import {FETCH_FEEDS} from '../actions/feeds'

export default handleActions({
  [`${FETCH_FEEDS}_PENDING`]: (state) => {
    ...state,
    isPending: true,
  }
})
