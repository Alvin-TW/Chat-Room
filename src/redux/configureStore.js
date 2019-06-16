import { createStore } from 'redux'

import rootReducer from './modules/reducer'

const store = createStore(
  rootReducer,
  window.devToolsExtension ? window.devToolsExtension() : undefined,
)

if(module.hot) {
  module.hot.accept('./modules/reducer', () => {
    const nextRootReducer = require('./modules/reducer').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
