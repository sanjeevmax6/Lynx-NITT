import {API_EVENT_LIST} from '../../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';
import {CALENDAR_STORE} from '../../mobx/CALENDAR_STORE';

export const eventList = () => {
  const axios = require('axios');
  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      CALENDAR_STORE.setLoading(true);
      axios
        .get(
          API_EVENT_LIST,
          // Token from Mobux
          {headers: {token: USER_STORE.getUserToken}},
        )
        .then(response => {
          if (response.status == 200) {
            // console.log(
            //   'Response from API Call' + JSON.stringify(response.data.events),
            // );
            CALENDAR_STORE.setData(response.data.events);
            CALENDAR_STORE.setSuccess(true);
          }
          CALENDAR_STORE.setLoading(false);
        })
        .catch(error => {
          if (error.response) {
            console.log(error);
            CALENDAR_STORE.setErrorText(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
            CALENDAR_STORE.setError(SERVER_ERROR);
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
