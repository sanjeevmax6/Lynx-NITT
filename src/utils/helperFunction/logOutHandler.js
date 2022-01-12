import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACTIVITY_STORE} from '../../mobx/ACITIVITY_STORE';
import {CLUB_REGISTER_STORE} from '../../mobx/CLUB_REGISTER_STORE';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import {FEEDS_STORE} from '../../mobx/FEEDS_STORE';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';
import {CLUB_USER_ID, USER_TOKEN, USER_TYPE} from '../STORAGE_KEYS';

export const LogOutHandler = () => {
  AsyncStorage.removeItem(USER_TYPE);
  AsyncStorage.removeItem(USER_TOKEN);
  AsyncStorage.removeItem(CLUB_USER_ID);
  console.log('LOGOUT');
  FEEDS_STORE.reset();
  USER_STORE.reset();
  EDIT_CLUB_PROFILE_STORE.reset();
  CLUB_REGISTER_STORE.reset();
  ACTIVITY_STORE.reset();
  STUDENT_REGISTRATION_STORE.reset();
};
