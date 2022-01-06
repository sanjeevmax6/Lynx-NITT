import {API_STUDENT_REGISTER} from '../../utils/API_CONSTANTS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {USER_TOKEN, USER_TYPE} from '../../utils/STORAGE_KEYS';
import {STUDENT} from '../../utils/USER_TYPE';
import {NO_NETWORK, SERVER_ERROR} from '../../utils/ERROR_MESSAGES';

export const studentRegisterAPI = (formData, setLoading, setErrorText) => {
  const token = USER_STORE.getUserRegToken;
  const axios = require('axios');
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      setLoading(true);
      axios
        .post(
          API_STUDENT_REGISTER,

          formData,

          {headers: {token: token}},
        )
        .then(response => {
          setLoading(false);
          console.log(response);
          if (response.status == 200) {
            AsyncStorage.setItem(USER_TOKEN, response.data.token);
            AsyncStorage.setItem(USER_TYPE, STUDENT); //stored items should be string
            USER_STORE.setUserType(STUDENT);
            USER_STORE.setUserToken(response.data.token);
            USER_STORE.setUserRegToken(null);
          }
        })
        .catch(error => {
          if (error.response) {
            setLoading(false);
            setErrorText(error.response.data.message);
          } else if (error.request) {
            setErrorText(SERVER_ERROR);
          }
        });
    } else {
      setErrorText(NO_NETWORK);
    }
  });
};
