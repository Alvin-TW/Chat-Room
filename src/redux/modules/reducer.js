import { combineReducers } from  'redux'

import commonReducer from './common'

const rootReducer = combineReducers({
  commonReducer,
})

export default rootReducer