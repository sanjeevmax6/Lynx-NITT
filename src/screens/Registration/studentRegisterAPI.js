import {
  API_STUDENT_REGISTER,
  KEY_IS_STUDENT,
  KEY_USER_TOKEN,
} from '../../utils/API_CONSTANTS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {
  updateToken,
  updateIsStudent,
  updateRegisterToken,
} from '../../redux/reducers/loginScreen';

export const studentRegisterAPI = (
  token,
  formData,
  setLoading,
  setErrorText,
  dispatch,
) => {
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
          if (response.data.message == 'Success') {
            AsyncStorage.setItem(KEY_USER_TOKEN, response.data.token);
            AsyncStorage.setItem(KEY_IS_STUDENT, 'true'); //stored items should be string
            dispatch(updateToken(response.data.token));
            dispatch(updateRegisterToken(null));
            dispatch(updateIsStudent(true));
          }
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response);
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
