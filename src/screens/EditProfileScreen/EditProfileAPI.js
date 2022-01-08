import {API_EDIT_PROFILE_STUDENT} from '../../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {STUDENT_EDIT_PROFILE_STORE} from '../../mobx/STUDENT_EDIT_PROFILE_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';
import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';

const UpdateStudentStore = () => {};

export const EditProfileAPI = formData => {
  const axios = require('axios');

  NetInfo.fetch().then(state => {
    STUDENT_EDIT_PROFILE_STORE.setLoading(true);
    STUDENT_EDIT_PROFILE_STORE.setError(false);
    STUDENT_EDIT_PROFILE_STORE.setErrorText('');

    if (state.isConnected === true) {
      axios
        .put(
          API_EDIT_PROFILE_STUDENT,

          formData,

          {headers: {token: USER_STORE.getUserToken}},
        )
        .then(response => {
          if (response.status === 200) {
            UpdateStudentStore();
            STUDENT_EDIT_PROFILE_STORE.setSuccess(true);
            STUDENT_EDIT_PROFILE_STORE.setLoading(false);
          } else {
            STUDENT_EDIT_PROFILE_STORE.setErrorText(UNEXPECTED_ERROR);
            STUDENT_EDIT_PROFILE_STORE.setError(true);
            STUDENT_EDIT_PROFILE_STORE.setLoading(false);
          }
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data.message);
            STUDENT_EDIT_PROFILE_STORE.setErrorText(
              error.response.data.message,
            );
          } else {
            STUDENT_EDIT_PROFILE_STORE.setErrorText(SERVER_ERROR);
          }
          STUDENT_EDIT_PROFILE_STORE.setError(true);
          STUDENT_EDIT_PROFILE_STORE.setLoading(false);
        });
    } else {
      STUDENT_EDIT_PROFILE_STORE.setErrorText(NO_NETWORK);
      STUDENT_EDIT_PROFILE_STORE.setError(true);
      STUDENT_EDIT_PROFILE_STORE.setLoading(false);
    }
  });
};
