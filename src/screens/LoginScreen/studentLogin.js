import {API_STUDENT_LOGIN} from '../../utils/API_CONSTANTS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {
  updateToken,
  updateRegisterToken,
  updateIsStudent,
} from '../../redux/reducers/loginScreen';
import {USER_STORE} from '../../mobx/USER_STORE';

export const studentLogin = (
  rollNo,
  password,
  setErrorText,
  setLoading,
  dispatch,
) => {
  const axios = require('axios');
  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      setLoading(true);

      axios
        .post(API_STUDENT_LOGIN, {
          rollNo,
          password,
        })
        .then(response => {
          setLoading(false);

          if (response.data.message == 'Success') {
            if (response.data.userExists) {
              AsyncStorage.setItem('user_token', response.data.token); //user token stored locally
              AsyncStorage.setItem('is_student', 'true'); //Is student bool stored locally
              dispatch(updateIsStudent(true));
              dispatch(updateToken(response.data.token)); //user token recieved and updated
              USER_STORE.setUserToken(response.data.token);
            } else {
              dispatch(updateRegisterToken(response.data.token));
            }
          }
        })
        .catch(error => {
          if (error.response) {
            console.log(error);
            setLoading(false);
            setErrorText(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
            setErrorText('Server Error');
          }
        });
    } else {
      setErrorText('No internet connection');
    }
  });
};
