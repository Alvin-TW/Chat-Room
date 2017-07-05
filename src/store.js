import { createStore } from 'redux';
import rootReducer from './reducers/index';

const store = createStore(rootReducer, window.devToolsExtension ? window.devToolsExtension() : undefined)

if(module.hot) {
	module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('./reducers/index').default
		store.replaceReducer(nextRootReducer)
	})
}

export default store