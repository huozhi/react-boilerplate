import {createAction} from 'redux-actions'
import http from '../lib/http'

export const FETCH_NOTIFICATION = 'FETCH_NOTIFICATION'
export const fetchNotification = createAction(FETCH_NOTIFICATION, () => (
  http('/notifications')
))
