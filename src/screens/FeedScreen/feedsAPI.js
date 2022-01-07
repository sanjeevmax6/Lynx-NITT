import {API_EVENT_BY_ID, API_UPCOMING_EVENTS} from '../../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {NO_NETWORK, SERVER_ERROR} from '../../utils/ERROR_MESSAGES';
import {FEEDS_STORE} from '../../mobx/FEEDS_STORE';
import {API_STORE} from '../../mobx/API_STORE';

export const feedsAPI = refreshing => {
  console.log(refreshing);
  FEEDS_STORE.setError(false);
  const axios = require('axios');
  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      if (!refreshing) {
        console.log('e', refreshing);
        FEEDS_STORE.setLoading(true);
      }

      axios
        .get(
          API_STORE.getBaseUrl + API_UPCOMING_EVENTS,
          // Token from Mobux
          {headers: {token: USER_STORE.getUserToken}},
        )
        .then(response => {
          if (response.status == 200) {
            // console.log(
            //   'Response from FEEDS API Call' + JSON.stringify(response.data),
            // );
            FEEDS_STORE.setData(response.data);
            FEEDS_STORE.setSuccess(true);
          }
          FEEDS_STORE.setLoading(false);
          if (refreshing) {
            FEEDS_STORE.setRefreshing(false);
          }
        })
        .catch(error => {
          console.log(JSON.stringify(error));
          if (error.response) {
            console.log(error);
            FEEDS_STORE.setErrorText(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
            FEEDS_STORE.setErrorText(SERVER_ERROR);
          }
          FEEDS_STORE.setError(true);
          FEEDS_STORE.setLoading(false);
          if (refreshing) {
            FEEDS_STORE.setRefreshing(false);
          }
        });
    } else {
      FEEDS_STORE.setSuccess(false);
      FEEDS_STORE.setLoading(false);
      FEEDS_STORE.setErrorText(NO_NETWORK);
      FEEDS_STORE.setError(true);
      if (refreshing) {
        FEEDS_STORE.setRefreshing(false);
      }
    }
  });
};
