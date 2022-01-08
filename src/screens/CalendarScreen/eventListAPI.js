import {API_EVENT_LIST, API_ADMIN_EVENT_LIST} from '../../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';
import {CALENDAR_STORE} from '../../mobx/CALENDAR_STORE';

//API Call for both event list and admin event list

export const eventList = () => {
  const axios = require('axios');
  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      CALENDAR_STORE.setLoading(true);
      axios
        .all([
          axios.get(API_EVENT_LIST, {
            // Token from Mobux
            headers: {token: USER_STORE.getUserToken},
          }),
          axios.get(API_ADMIN_EVENT_LIST, {
            // Token from Mobux
            headers: {token: USER_STORE.getUserToken},
          }),
        ])
        .then(
          axios.spread((firstResponse, secondResponse) => {
            if (firstResponse.status == 200 && secondResponse.status == 200) {
              console.log(
                'Response from First API Call' +
                  JSON.stringify(firstResponse.data),
              );
              console.log(
                'Response from Second API Call' +
                  JSON.stringify(secondResponse.data),
              );
              CALENDAR_STORE.setEventData(firstResponse.data);
              CALENDAR_STORE.setAdminEventData(secondResponse.data);
              CALENDAR_STORE.setSuccess(true);
            }
            CALENDAR_STORE.setLoading(false);
          }),
        )
        .catch(error => {
          if (error.response) {
            console.log(error);
            CALENDAR_STORE.setErrorText(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
            CALENDAR_STORE.setErrorText(SERVER_ERROR);
          } else {
            CALENDAR_STORE.setErrorText(UNEXPECTED_ERROR);
          }
          CALENDAR_STORE.setError(true);
          CALENDAR_STORE.setLoading(false);
        });
    } else {
      CALENDAR_STORE.setSuccess(false);
      CALENDAR_STORE.setLoading(false);
      CALENDAR_STORE.setErrorText(NO_NETWORK);
      CALENDAR_STORE.setError(true);
    }
  });
};
