
import { combineReducers } from 'redux'
import mapReducer from './mapReduser'
import availableReducer from './availableReducer'


const rootReducer =  combineReducers({
  parks: mapReducer,
  available: availableReducer,
  all: mapReducer
})


export default rootReducer