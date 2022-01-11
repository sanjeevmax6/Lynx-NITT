import {API_FOLLOW_TOGGLE, API_SUBSCRIBE_TOGGLE} from '../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../mobx/USER_STORE';

import axios from 'axios';
import {STUDENT} from '../utils/USER_TYPE';
import {API_STORE} from '../mobx/API_STORE';

async function API_CALL(clubId, successCallback, failureCallBack) {
  try {
    if (USER_STORE.getUserType === STUDENT) {
      console.log(1);

      const [responseFollow, responseSubscribe] = await axios.all([
        axios.put(
          API_STORE.getBaseUrl + API_FOLLOW_TOGGLE + clubId,
          {},
          {headers: {token: USER_STORE.getUserToken}},
        ),
        axios.put(
          API_STORE.getBaseUrl + API_SUBSCRIBE_TOGGLE + clubId,
          {},
          {headers: {token: USER_STORE.getUserToken}},
        ),
      ]);
      console.log(
        responseFollow.data.message + '\n' + responseSubscribe.data.message,
      );

      if (responseFollow.status == 200 && responseSubscribe.status == 200)
        successCallback();
      else {
        failureCallBack();
        showToast();
      }
    }
  } catch (error) {
    console.log(22);
    console.log(error.response);

    failureCallBack();
  }
}
export const toggleFollowApi = (clubID, successCallback, failureCallBack) => {
  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      API_CALL(clubID, successCallback, failureCallBack);
    } else {
      failureCallBack();
    }
  });
};
