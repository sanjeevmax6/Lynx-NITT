import LoginScreenReducer from './loginScreen';
import SplashScreenReducer from './splashScreen';
import BottomNavReducer from './bottomNav';
import {combineReducers} from 'redux';

export default combineReducers({
  logScreen: LoginScreenReducer,
  splashScreen: SplashScreenReducer,
  bottomNav: BottomNavReducer,
});
