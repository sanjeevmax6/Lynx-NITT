import SearchScreenReducer from './searchScreen';
import LoginScreenReducer from './loginScreen';
import SplashScreenReducer from './splashScreen';
import BottomNavReducer from './bottomNav';
import {combineReducers} from 'redux';

export default combineReducers({
  searchScreen: SearchScreenReducer,
  logScreen: LoginScreenReducer,
  splashScreen: SplashScreenReducer,
  bottomNav: BottomNavReducer,
});
