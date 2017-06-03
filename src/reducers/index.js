import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import KidsReducer from './KidsReducer';

export default combineReducers({
  auth: AuthReducer,
  kids: KidsReducer
});
