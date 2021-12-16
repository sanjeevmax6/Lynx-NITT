import LoginScreenReducer from './loginScreen';
import BottomNavReducer from './bottomNav';
import {combineReducers} from 'redux';

export default combineReducers({
  logScreen: LoginScreenReducer,
  bottomNav: BottomNavReducer,
});
