import {API_ADD_CALENDAR_NOTICE} from '../../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {CALENDAR_NOTICE_STORE} from '../../mobx/CALENDAR_NOTICE_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';
import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';
import {API_STORE} from './../../mobx/API_STORE';

export const CalendarNoticeCreation = () => {
  const axios = require('axios');
  const startDate = CALENDAR_NOTICE_STORE.getStartDate.toString();
  var endDate;
  {
    CALENDAR_NOTICE_STORE.getMultiDay
      ? (endDate = CALENDAR_NOTICE_STORE.getEndDate.toString())
      : (endDate = startDate);
  }
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      CALENDAR_NOTICE_STORE.setLoading(true);
      axios
        .post(
          API_ADD_CALENDAR_NOTICE,
          {
            title: CALENDAR_NOTICE_STORE.getTitle,
            description: CALENDAR_NOTICE_STORE.getDescription,
            startDate: startDate,
            endDate: endDate,
          },
          {
            headers: {
              token: USER_STORE.getUserToken,
            },
            'Content-Type': 'application/json',
          },
        )
        .then(response => {
          if (response.status === 201) {
            CALENDAR_NOTICE_STORE.setSuccess(true);
            CALENDAR_NOTICE_STORE.setLoading(false);
            console.log(response.data.message);
          }
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data.message);
            CALENDAR_NOTICE_STORE.setErrorText(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
            CALENDAR_NOTICE_STORE.setErrorText(SERVER_ERROR);
          } else {
            CALENDAR_NOTICE_STORE.setErrorText(UNEXPECTED_ERROR);
          }
          CALENDAR_NOTICE_STORE.setError(true);
          CALENDAR_NOTICE_STORE.setLoading(false);
        });
    } else {
      CALENDAR_NOTICE_STORE.setLoading(false);
      CALENDAR_NOTICE_STORE.setError(true);
      CALENDAR_NOTICE_STORE.setErrorText(NO_NETWORK);
    }
  });
};
