import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from '../reducers'

const middlewares = [
  thunkMiddleware,
  promiseMiddleware()
]

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    // @see https://github.com/zalmoxisus/redux-devtools-extension
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer.default)
    })
  }
  return store
}
