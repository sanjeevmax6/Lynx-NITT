import {
  API_CLUB_ACTIVITY,
  API_EVENT_BY_ID,
  API_STUDENT_ACTIVITY,
} from '../../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {NO_NETWORK, SERVER_ERROR} from '../../utils/ERROR_MESSAGES';
import {ACTIVITY_STORE} from '../../mobx/ACITIVITY_STORE';
import {API_STORE} from '../../mobx/API_STORE';
import {ADMIN, CLUB, STUDENT} from '../../utils/USER_TYPE';

const ActivityAPI = refreshing => {
  ACTIVITY_STORE.setError(false);
  const axios = require('axios');
  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      if (!refreshing) {
        ACTIVITY_STORE.setLoading(true);
      }
      let url = API_STUDENT_ACTIVITY;
      if (USER_STORE.getUserType === CLUB || USER_STORE.getUserType === ADMIN) {
        url = API_CLUB_ACTIVITY;
      }
      axios
        .get(
          API_STORE.getBaseUrl + url,
          // Token from Mobux
          {headers: {token: USER_STORE.getUserToken}},
        )
        .then(response => {
          console.log(response.status);
          if (response.status == 200) {
            ACTIVITY_STORE.setData(response.data.notifications);
            ACTIVITY_STORE.setSuccess(true);
          }
          ACTIVITY_STORE.setLoading(false);
          if (refreshing) {
            ACTIVITY_STORE.setRefreshing(false);
          }
        })
        .catch(error => {
          console.log(JSON.stringify(error));
          if (error.response) {
            console.log(error);
            ACTIVITY_STORE.setErrorText(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
            ACTIVITY_STORE.setErrorText(SERVER_ERROR);
          }
          ACTIVITY_STORE.setError(true);
          ACTIVITY_STORE.setLoading(false);
          if (refreshing) {
            ACTIVITY_STORE.setRefreshing(false);
          }
        });
    } else {
      ACTIVITY_STORE.setSuccess(false);
      ACTIVITY_STORE.setLoading(false);
      ACTIVITY_STORE.setErrorText(NO_NETWORK);
      ACTIVITY_STORE.setError(true);
      if (refreshing) {
        ACTIVITY_STORE.setRefreshing(false);
      }
    }
  });
};

export default ActivityAPI;
