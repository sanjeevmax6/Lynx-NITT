import {API_STUDENT_LOGIN} from '../../utils/API_CONSTANTS';

import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {LOGIN_STORE} from '../../mobx/LOGIN_STORE';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';
import {USER_TYPE, USER_TOKEN} from '../../utils/STORAGE_KEYS';
import {STUDENT} from '../../utils/USER_TYPE';
import EncryptedStorage from 'react-native-encrypted-storage';

export const studentLogin = (rollNo, password, dispatch) => {
  const axios = require('axios');
  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      LOGIN_STORE.setLoading(true);
      const reg_token = USER_STORE.getFirebaseToken;
      console.log('reg: ', reg_token);
      axios
        .post(API_STUDENT_LOGIN, {
          rollNo,
          password,
          reg_token,
        })
        .then(response => {
          if (response.status == 200) {
            if (response.data.userExists) {
              EncryptedStorage.setItem(USER_TOKEN, response.data.token);
              EncryptedStorage.setItem(USER_TYPE, STUDENT);

              USER_STORE.setUserType(STUDENT);
              USER_STORE.setUserToken(response.data.token);
            } else {
              USER_STORE.setUserRegToken(response.data.token);
            }
          }
          LOGIN_STORE.setLoading(false);
        })
        .catch(error => {
          if (error.response) {
            console.log(error);

            LOGIN_STORE.setErrorText(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
            LOGIN_STORE.setError(SERVER_ERROR);
          }
          LOGIN_STORE.setError(true);
          LOGIN_STORE.setLoading(false);
        });
    } else {
      LOGIN_STORE.setErrorText(NO_NETWORK);
      LOGIN_STORE.setError(true);
    }
  });
};
