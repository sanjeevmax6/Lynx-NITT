import {API_EDIT_PROFILE_CLUB} from '../../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import { EDIT_CLUB_PROFILE_STORE } from '../../mobx/EDIT_CLUB_PROFILE';
export const EditProfileClubAPI = formData => {
  const axios = require('axios');
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      EDIT_CLUB_PROFILE_STORE.setLoading(true);
      axios
        .put(
          API_EDIT_PROFILE_CLUB,

          formData,

          {headers: {token: USER_STORE.getUserToken}},
        )
        .then(response => {
          console.log(JSON.stringify(response));
          EDIT_CLUB_PROFILE_STORE.setLoading(false);
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data.message);
            EDIT_CLUB_PROFILE_STORE.setLoading(false);
            EDIT_CLUB_PROFILE_STORE.setErrorText(
              error.response.data.message,
            );
          } else if (error.request) {
            EDIT_CLUB_PROFILE_STORE.setErrorText('Server Error');
          }
          console.log(error);
        });
    } else {
      EDIT_CLUB_PROFILE_STORE.setErrorText('No Internet Connection');
    }
  });
};
