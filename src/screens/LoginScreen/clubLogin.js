import {
  API_CLUB_LOGIN,
  KEY_IS_STUDENT,
  KEY_USER_TOKEN,
} from '../../utils/API_CONSTANTS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {updateToken, updateIsStudent} from '../../redux/reducers/loginScreen';
import {USER_STORE} from '../../mobx/USER_STORE';
import {LOGIN_STORE} from '../../mobx/LOGIN_STORE';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';

export const clubLogin = (email, password, dispatch) => {
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
          if (response.data.message == 'Success') {
            AsyncStorage.setItem(KEY_USER_TOKEN, response.data.token); //user token stored locally
            AsyncStorage.setItem(KEY_IS_STUDENT, 'false');
            dispatch(updateIsStudent(false));
            dispatch(updateToken(response.data.token)); //user token received and updated
            USER_STORE.setUserToken(response.data.token);
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
