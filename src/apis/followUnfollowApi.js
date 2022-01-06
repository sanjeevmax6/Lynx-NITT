import {API_FOLLOW_TOGGLE} from '../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../mobx/USER_STORE';

import axios from 'axios';
import {STUDENT} from '../utils/USER_TYPE';
import {API_STORE} from '../mobx/API_STORE';
import {ToastAndroid} from 'react-native';

const showToast = () => {
  ToastAndroid.show('Failed to follow/unfollow the club!', ToastAndroid.SHORT);
};

async function API_CALL(clubId, successCallback, failureCallBack) {
  try {
    if (USER_STORE.getUserType === STUDENT) {
      console.log(1);
      const response = await axios.put(
        API_STORE.getBaseUrl + API_FOLLOW_TOGGLE + clubId,
        {},
        {headers: {token: USER_STORE.getUserToken}},
      );
      console.log(response.data.message);
      successCallback();
    }
  } catch (error) {
    console.log(22);
    console.log(error.response);

    failureCallBack();
    showToast();
  }
}
export const toggleFollowApi = (clubID, successCallback, failureCallBack) => {
  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      API_CALL(clubID, successCallback, failureCallBack);
    } else {
      showToast();
    }
  });
};