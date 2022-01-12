import axios from 'axios';
import {API_STORE} from '../mobx/API_STORE';
import {USER_STORE} from '../mobx/USER_STORE';
import {API_GET_DELETE_CLUB_EVENTS} from '../utils/API_CONSTANTS';
import Netinfo from '@react-native-community/netinfo';
import {NO_NETWORK} from '../utils/ERROR_MESSAGES';

export const deleteEvent = async (
  EventID,
  successCallback,
  failureCallBack,
) => {
  const url = API_STORE.getBaseUrl + API_GET_DELETE_CLUB_EVENTS + EventID;
  console.log(url);
  const headerInfo = {
    headers: {
      'Content-Type': 'application/json',
      token: USER_STORE.getUserToken,
    },
  };

  try {
    const netInfo = await Netinfo.fetch();

    if (!netInfo.isConnected) {
      failureCallBack(NO_NETWORK);
      return;
    }

    const response = await axios.get(url, headerInfo);

    if (response.status === 200) {
      successCallback();
    } else {
      failureCallBack(response.data.message);
    }
  } catch (e) {
    failureCallBack(e.message);
  }
};
