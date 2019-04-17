import {
  combineReducers
} from 'redux-immutable'
import {
  reducer as commonReducer
} from './module/common';

export default combineReducers({
  common: commonReducer
})