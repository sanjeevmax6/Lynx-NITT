import axios from 'axios';
import {DEEP_LINKING_STORE} from '../../mobx/DEEP_LINKING_STORE';
import {ACTIVITY_STORE} from '../../mobx/ACITIVITY_STORE';
import {ANNOUNCEMENT_CREATION_STORE} from '../../mobx/ANNOUNCEMENT_CREATION_STORE';
import {API_STORE} from '../../mobx/API_STORE';
import {AUTH_NAV_STORE} from '../../mobx/AUTH_NAV_STORE';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {CALENDAR_NOTICE_STORE} from '../../mobx/CALENDAR_NOTICE_STORE';
import {CALENDAR_STORE} from '../../mobx/CALENDAR_STORE';
import {CLUB_DESCRIPTION_STORE} from '../../mobx/CLUB_DESCRIPTION_STORE';
import {CLUB_REGISTER_STORE} from '../../mobx/CLUB_REGISTER_STORE';
import {CLUB_USER_STORE} from '../../mobx/CLUB_USER_STORE';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import {EVENT_DESCRIPTION_STORE} from '../../mobx/EVENT_DESCRIPTION_STORE';
import {EVENT_EDIT_STORE} from '../../mobx/EVENT_EDIT_STORE';
import {FEEDBACK_STORE} from '../../mobx/FEEDBACK_STORE';
import {FEEDS_STORE} from '../../mobx/FEEDS_STORE';
import {LOGIN_STORE} from '../../mobx/LOGIN_STORE';
import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';
import {STUDENT_EDIT_PROFILE_STORE} from '../../mobx/STUDENT_EDIT_PROFILE_STORE';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';
import {API_LOGOUT_CLUB, API_LOGOUT_STUDENT} from '../API_CONSTANTS';
import {CLUB_USER_ID, USER_TOKEN, USER_TYPE} from '../STORAGE_KEYS';
import {STUDENT} from '../USER_TYPE';
import NetInfo from '@react-native-community/netinfo';
import EncryptedStorage from 'react-native-encrypted-storage';

export const LogOutHandler = () => {
  if (USER_STORE.getUserType === STUDENT) {
    STUDENT_DETAILS_STORE.setIsLoading(true);
  } else {
    CLUB_USER_STORE.setIsLoading(true);
  }
  NetInfo.fetch().then(state => {
    if (state.isConnected) {
      axios
        .post(
          API_STORE.getBaseUrl +
            (USER_STORE.getUserType === STUDENT
              ? API_LOGOUT_STUDENT
              : API_LOGOUT_CLUB),
          {reg_token: USER_STORE.getFirebaseToken},
          {headers: {token: USER_STORE.getUserToken}},
        )
        .then(async response => {
          if (response.status === 200) {
            await EncryptedStorage.removeItem(CLUB_USER_ID);
            await EncryptedStorage.removeItem(USER_TOKEN);
            await EncryptedStorage.removeItem(USER_TYPE);
            console.log('LOGOUT');

            // //reset stores
            DEEP_LINKING_STORE.reset();
            ACTIVITY_STORE.reset();
            ANNOUNCEMENT_CREATION_STORE.reset();
            CALENDAR_NOTICE_STORE.reset();
            CALENDAR_STORE.reset();
            CLUB_DESCRIPTION_STORE.reset();
            CLUB_REGISTER_STORE.reset();
            CLUB_USER_STORE.reset();
            EDIT_CLUB_PROFILE_STORE.reset();
            EVENT_DESCRIPTION_STORE.reset();
            EVENT_EDIT_STORE.clearData();
            FEEDBACK_STORE.reset();
            FEEDS_STORE.reset();
            LOGIN_STORE.reset();
            RESET_STORE.reset();
            STUDENT_DETAILS_STORE.reset();
            STUDENT_EDIT_PROFILE_STORE.reset();
            STUDENT_REGISTRATION_STORE.reset();
            BOTTOM_NAV_STORE.reset();
            USER_STORE.reset();
            // // API_STORE.reset();
            // // AUTH_NAV_STORE.reset();
          }
        })
        .catch(() => {
          if (USER_STORE.getUserType === STUDENT) {
            STUDENT_DETAILS_STORE.setIsLoading(false);
          } else {
            CLUB_USER_STORE.setIsLoading(false);
          }
          alert(
            'Failed to logout, check your internet connection or try again after some time',
          );
        });
    } else {
      if (USER_STORE.getUserType === STUDENT) {
        STUDENT_DETAILS_STORE.setIsLoading(false);
      } else {
        CLUB_USER_STORE.setIsLoading(false);
      }
      alert(
        'Failed to logout, check your internet connection or try again after some time',
      );
    }
  });
};
