import SearchScreenReducer from './searchScreen';
import LoginScreenReducer from './loginScreen';
import SplashScreenReducer from './splashScreen';
import {combineReducers} from 'redux';

export default combineReducers({
  searchScreen: SearchScreenReducer,
  logScreen: LoginScreenReducer,
  splashScreen: SplashScreenReducer,
});
