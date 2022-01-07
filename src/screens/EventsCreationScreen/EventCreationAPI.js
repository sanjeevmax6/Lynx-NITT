import {API_ADD_EVENT} from '../../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import { EVENT_CREATION_STORE } from '../../mobx/EVENT_CREATION_STORE';

export const EventCreationAPI = (
  formData,
) => {
  const axios = require('axios');
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      EVENT_CREATION_STORE.setLoading(true);
      axios
        .post(
          API_ADD_EVENT,
          
          formData,

          {headers: {token: USER_STORE.getUserToken}},
        )
        .then(response => {
          EVENT_CREATION_STORE.setLoading(false);
          //console.log('EventCreated',response.data.message);
          console.log(response.data);
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data.message);
            EVENT_CREATION_STORE.setLoading(false);
            EVENT_CREATION_STORE.setErrorText(error.response.data.message);
          } else if (error.request) {
            EVENT_CREATION_STORE.setErrorText('Server Error');
          }
          console.log(error);
        });
    } else {
      EVENT_CREATION_STORE.setErrorText('No internet connection');
    }
  });
};