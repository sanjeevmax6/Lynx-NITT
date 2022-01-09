import {API_CLUB_LOGIN} from '../../utils/API_CONSTANTS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {LOGIN_STORE} from '../../mobx/LOGIN_STORE';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';
import {ADMIN, CLUB} from '../../utils/USER_TYPE';
import {CLUB_REGISTERED, USER_TOKEN, USER_TYPE} from '../../utils/STORAGE_KEYS';

export const clubLogin = (email, password) => {
  const axios = require('axios');
  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      LOGIN_STORE.setLoading(true);

      axios
        .post(API_CLUB_LOGIN, {
          email,
          password,
        })
        .then(response => {
          if (response.status == 200) {
            //Differentiate club and admin based on backend
            //console.log('IS ADMIN?' + response.data.isAdmin);
            if (response.data.isAdmin) {
              AsyncStorage.setItem(USER_TYPE, ADMIN);
              USER_STORE.setUserType(ADMIN);
            } else {
              USER_STORE.setUserType(CLUB);

              AsyncStorage.setItem(USER_TYPE, CLUB);
            }

            USER_STORE.setRedirectUpdate(response.data.redirectUpdate);

            USER_STORE.setUserToken(response.data.token);
            //console.log('Redirect Update' + USER_STORE.getRedirectUpdate);
            if (response.data.redirectUpdate === false)
              AsyncStorage.setItem(USER_TOKEN, response.data.token); //user token stored locally
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
