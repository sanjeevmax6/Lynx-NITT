import {API_EVENT_BY_ID} from '../../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {NO_NETWORK, SERVER_ERROR} from '../../utils/ERROR_MESSAGES';
import {EVENT_DESCRIPTION_STORE} from '../../mobx/EVENT_DESCRIPTION_STORE';

export const eventDescriptionAPI = () => {
  EVENT_DESCRIPTION_STORE.setError(false);
  const axios = require('axios');
  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      EVENT_DESCRIPTION_STORE.setLoading(true);
      axios
        .get(
          API_EVENT_BY_ID + '/' + EVENT_DESCRIPTION_STORE.getID,
          // Token from Mobux
          {headers: {token: USER_STORE.getUserToken}},
        )
        .then(response => {
          if (response.status === 200) {
            EVENT_DESCRIPTION_STORE.setData(response.data.events);
            EVENT_DESCRIPTION_STORE.setSuccess(true);
          }
          EVENT_DESCRIPTION_STORE.setLoading(false);
        })
        .catch(error => {
          if (error.response) {
            console.log(error);
            EVENT_DESCRIPTION_STORE.setErrorText(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
            EVENT_DESCRIPTION_STORE.setErrorText(SERVER_ERROR);
          }
          EVENT_DESCRIPTION_STORE.setError(true);
          EVENT_DESCRIPTION_STORE.setLoading(false);
        });
    } else {
      EVENT_DESCRIPTION_STORE.setSuccess(false);
      EVENT_DESCRIPTION_STORE.setLoading(false);
      EVENT_DESCRIPTION_STORE.setErrorText(NO_NETWORK);
      EVENT_DESCRIPTION_STORE.setError(true);
    }
  });
};
