import {handleActions} from 'redux-actions'
import {FETCH_NOTIFICATION} from '../actions/notifications'

const initialState = {
  message: null,
  loading: false
}

export default handleActions({
  [`${FETCH_NOTIFICATION}_PENDING`]: (state) => ({
    ...state,
    message: null,
    loading: true
  }),
  [`${FETCH_NOTIFICATION}_REJECTED`]: (state) => ({
    ...state,
    loading: false
  }),
  [`${FETCH_NOTIFICATION}_FULFILLED`]: (state, {payload: message}) => ({
    ...state,
    message,
    loading: false
  })
}, initialState)
