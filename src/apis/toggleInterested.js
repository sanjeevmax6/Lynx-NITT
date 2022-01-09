import {API_FOLLOW_TOGGLE, API_TOGGLE_INTERESTED} from '../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../mobx/USER_STORE';

import axios from 'axios';
import {STUDENT} from '../utils/USER_TYPE';
import {API_STORE} from '../mobx/API_STORE';
import {ToastAndroid} from 'react-native';

const showToast = () => {
  ToastAndroid.show('Failed to follow/unfollow the club!', ToastAndroid.SHORT);
};

async function API_CALL(eventId, successCallback, failureCallBack) {
  try {
    if (USER_STORE.getUserType === STUDENT) {
      const response = await axios.put(
        API_STORE.getBaseUrl + API_TOGGLE_INTERESTED + eventId,
        {},
        {headers: {token: USER_STORE.getUserToken}},
      );
      console.log(response.data.message);
      successCallback();
    }
  } catch (error) {
    console.log(error.response);

    failureCallBack();
    showToast();
  }
}
export const toggleInterestedApi = (
  eventId,
  successCallback,
  failureCallBack,
) => {
  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      API_CALL(eventId, successCallback, failureCallBack);
    } else {
      showToast();
    }
  });
};
