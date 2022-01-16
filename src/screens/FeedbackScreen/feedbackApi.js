import {API_FEEDBACK} from '../../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {NO_NETWORK, SERVER_ERROR} from '../../utils/ERROR_MESSAGES';

import {API_STORE} from '../../mobx/API_STORE';

import {FEEDBACK_STORE} from '../../mobx/FEEDBACK_STORE';

import axios from 'axios';
import {CLUB, STUDENT} from '../../utils/USER_TYPE';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';

export const feedsAPI = () => {
  FEEDBACK_STORE.setLoading(true);
  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      axios
        .post(API_STORE.getBaseUrl + API_FEEDBACK, {
          userType: USER_STORE.getUserType === STUDENT ? 'student' : 'club',
          userId:
            USER_STORE.getUserType === CLUB
              ? USER_STORE.getClubId
              : STUDENT_DETAILS_STORE.getStudentId,
          detail: FEEDBACK_STORE.getFeedback,
          feedbackType: FEEDBACK_STORE.getType,
        })
        .then(response => {
          if (response.status === 200) {
            FEEDBACK_STORE.setSuccess(true);
          }
          FEEDBACK_STORE.setLoading(false);
        })
        .catch(error => {
          console.log('fail');

          if (error.response) {
            FEEDBACK_STORE.setErrorText(error.response.data.message);
          } else if (error.request) {
            FEEDBACK_STORE.setErrorText(SERVER_ERROR);
          }
          FEEDBACK_STORE.setError(true);
          FEEDBACK_STORE.setLoading(false);
        });
    } else {
      FEEDBACK_STORE.setSuccess(false);
      FEEDBACK_STORE.setLoading(false);
      FEEDBACK_STORE.setErrorText(NO_NETWORK);
      FEEDBACK_STORE.setError(true);
    }
  });
};
