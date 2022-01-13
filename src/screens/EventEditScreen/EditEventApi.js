import {API_CLUB_EDITEVENT} from '../../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';
import {API_STORE} from '../../mobx/API_STORE';
import {EVENT_EDIT_STORE} from '../../mobx/EVENT_EDIT_STORE';

const body = () => {
  const data = {
    title: EVENT_EDIT_STORE.getEditTitle,
    description: EVENT_EDIT_STORE.getEditDesc,
    startDate: EVENT_EDIT_STORE.getEditStartEvent,
    endDate: EVENT_EDIT_STORE.getEditEndEvent,
    tags: EVENT_EDIT_STORE.getEditTags,
    links: EVENT_EDIT_STORE.getEditLinks,
  };
  return data;
};

export const EditEventApi = () => {
  EVENT_EDIT_STORE.setIsLoading(true);
  const axios = require('axios');
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      axios
        .put(
          API_STORE.getBaseUrl +
            API_CLUB_EDITEVENT +
            '/' +
            EVENT_EDIT_STORE.getEventId,
          body(),
          // Token from Mobux
          {headers: {token: USER_STORE.getUserToken}},
        )
        .then(response => {
          if (response.status == 200) {
            EVENT_EDIT_STORE.setSuccess(true);
          } else {
            EVENT_EDIT_STORE.setIsError(true);
            EVENT_EDIT_STORE.setErrorText(UNEXPECTED_ERROR);
          }
          EVENT_EDIT_STORE.setIsLoading(false);
        })
        .catch(error => {
          if (error.response.status === 400) {
            EVENT_EDIT_STORE.setErrorText(error.response.data.message);
          } else {
            EVENT_EDIT_STORE.setErrorText(SERVER_ERROR);
          }
          EVENT_EDIT_STORE.setIsError(true);
          EVENT_EDIT_STORE.setIsLoading(false);
        });
    } else {
      EVENT_EDIT_STORE.setIsError(true);
      EVENT_EDIT_STORE.setIsLoading(false);
      EVENT_EDIT_STORE.setErrorText(NO_NETWORK);
    }
  });
};