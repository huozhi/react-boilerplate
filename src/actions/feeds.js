import {createAction} from 'redux-actions'
import {http} from '../lib/http'

export const FETCH_FEEDS
export const fetchFeeds = createAction(FETCH_FEEDS, (user) => {
  http(`/feeds/${user.id}`).then(r => ({...r}))
})
