import AsyncStorage from '@react-native-async-storage/async-storage';
import {FEEDS_STORE} from '../../mobx/FEEDS_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';
import {CLUB_USER_ID, USER_TOKEN, USER_TYPE} from '../STORAGE_KEYS';

export const LogOutHandler = () => {
  AsyncStorage.removeItem(USER_TYPE);
  AsyncStorage.removeItem(USER_TOKEN);
  AsyncStorage.removeItem(CLUB_USER_ID);
  console.log('LOGOUT');
  FEEDS_STORE.reset();
  USER_STORE.reset();
};
