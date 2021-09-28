import SearchScreenReducer from './searchScreen';
import LoginScreenReducer from './loginScreen';
import {combineReducers} from 'redux';

export default combineReducers({
  searchScreen: SearchScreenReducer,
  logScreen: LoginScreenReducer,
});
