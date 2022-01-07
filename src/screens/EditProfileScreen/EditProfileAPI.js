import {API_EDIT_PROFILE_STUDENT} from '../../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {STUDENT_EDIT_PROFILE_STORE} from '../../mobx/STUDENT_EDIT_PROFILE_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';
import { STUDENT_DETAILS_STORE } from '../../mobx/STUDENT_DETAILS_STORE';
import { getAllStudentDetails } from '../StudentUserScreen/apiCalls';
export const EditProfileAPI = (formData, navigation) => {
  const axios = require('axios');
  
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      STUDENT_EDIT_PROFILE_STORE.setLoading(true);
      axios
        .put(
          API_EDIT_PROFILE_STUDENT,

          formData,

          {headers: {token: USER_STORE.getUserToken}},
        )
        .then(response => {
          console.log(JSON.stringify(response));

          STUDENT_DETAILS_STORE.setRefresh(true);
          getAllStudentDetails();
          navigation.goBack();
          STUDENT_EDIT_PROFILE_STORE.setLoading(false);
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data.message);
            STUDENT_EDIT_PROFILE_STORE.setLoading(false);
            STUDENT_EDIT_PROFILE_STORE.setErrorText(
              error.response.data.message,
            );
          } else if (error.request) {
            STUDENT_EDIT_PROFILE_STORE.setErrorText('Server Error');
          }
          console.log(error);
        });
    } else {
      STUDENT_EDIT_PROFILE_STORE.setErrorText('No Internet Connection');
    }
  });
};
