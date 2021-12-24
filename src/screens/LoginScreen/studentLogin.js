import {API_STUDENT_LOGIN} from '../../utils/API_CONSTANTS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {LOGIN_STORE} from '../../mobx/LOGIN_STORE';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';
import {USER_TYPE, USER_TOKEN} from '../../utils/STORAGE_KEYS';
import {STUDENT} from '../../utils/USER_TYPE';
export const studentLogin = (rollNo, password, dispatch) => {
  const axios = require('axios');
  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      LOGIN_STORE.setLoading(true);
      axios
        .post(API_STUDENT_LOGIN, {
          rollNo,
          password,
        })
        .then(response => {
          if (response.status == 200) {
            console.log('USER STORE MSG GOT2' + USER_STORE.getUserToken);
            if (response.data.userExists) {
              AsyncStorage.setItem(USER_TOKEN, response.data.token); //user token stored locally
              AsyncStorage.setItem(USER_TYPE, STUDENT); //Is student bool stored locally
              USER_STORE.setUserType(STUDENT);
              USER_STORE.setUserToken(response.data.token);
              console.log('USER STORE MSG GOT' + USER_STORE.getUserToken);
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
