import {API_SEARCH} from '../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../mobx/USER_STORE';

import axios from 'axios';

import {API_STORE} from '../mobx/API_STORE';

import {NO_NETWORK} from '../utils/ERROR_MESSAGES';

async function API_CALL(query, type, successCallback, failureCallBack) {
  try {
    const response = await axios.post(
      API_STORE.getBaseUrl + API_SEARCH,
      {
        search: query,
        type: type,
      },
      {headers: {token: USER_STORE.getUserToken}},
    );
    console.log(response.data.message);
    successCallback(response.data);
  } catch (error) {
    failureCallBack(error.response.data.message);
  }
}
export const searchApi = (query, type, successCallback, failureCallBack) => {
  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      API_CALL(query, type, successCallback, failureCallBack);
    } else {
      failureCallBack(NO_NETWORK);
    }
  });
};
