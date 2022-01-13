import {API_STUDENT_REGISTER} from '../../utils/API_CONSTANTS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {API_STORE} from '../../mobx/API_STORE';
import {USER_TOKEN, USER_TYPE} from '../../utils/STORAGE_KEYS';
import {STUDENT} from '../../utils/USER_TYPE';
import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
import axios from 'axios';

export const studentRegisterAPI = formData => {
  STUDENT_REGISTRATION_STORE.setApiError(false);
  STUDENT_REGISTRATION_STORE.setApiCall(true);
  const token = USER_STORE.getUserRegToken;

  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      axios
        .post(API_STORE.getBaseUrl + API_STUDENT_REGISTER, formData, {
          headers: {token: token},
        })
        .then(response => {
          if (response.status === 200) {
            STUDENT_REGISTRATION_STORE.setApiResponse(response);
            STUDENT_REGISTRATION_STORE.setApiSuccess(true);
            STUDENT_REGISTRATION_STORE.setApiCall(false);
          }
        })
        .catch(error => {
          if (error.response) {
            STUDENT_REGISTRATION_STORE.setApiErrorText(
              error.response.data.message,
            );
          } else if (error.request) {
            STUDENT_REGISTRATION_STORE.setApiErrorText(SERVER_ERROR);
          } else {
            STUDENT_REGISTRATION_STORE.setApiErrorText(UNEXPECTED_ERROR);
          }

          STUDENT_REGISTRATION_STORE.setApiError(true);
          STUDENT_REGISTRATION_STORE.setApiCall(false);
        });
    } else {
      STUDENT_REGISTRATION_STORE.setApiErrorText(NO_NETWORK);
      STUDENT_REGISTRATION_STORE.setApiError(true);
      STUDENT_REGISTRATION_STORE.setApiCall(false);
    }
  });
};
