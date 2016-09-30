import {createAction} from 'redux-actions'
import {http} from '../lib/http'

export const UPDATE_FEEDS = 'UPDATE_FEEDS'
export const updateFeeds = createAction(UPDATE_FEEDS)
