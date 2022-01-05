import {API_EVENT_BY_ID, API_IS_FOLLOWING} from '../../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {NO_NETWORK, SERVER_ERROR} from '../../utils/ERROR_MESSAGES';
import {EVENT_DESCRIPTION_STORE} from '../../mobx/EVENT_DESCRIPTION_STORE';
import axios from 'axios';
import {STUDENT} from '../../utils/USER_TYPE';
import {API_STORE} from '../../mobx/API_STORE';

async function API_CALL() {
  try {
    const response = await axios.get(
      API_EVENT_BY_ID + '/' + EVENT_DESCRIPTION_STORE.getID,
      // Token from Mobux
      {headers: {token: USER_STORE.getUserToken}},
    );
    if (USER_STORE.getUserType === STUDENT) {
      const isFollowing = await axios.get(
        API_STORE.getBaseUrl + API_IS_FOLLOWING + response.data.events.club.id,
        {headers: {token: USER_STORE.getUserToken}},
      );
      console.log(
        'initially following the club: ',
        isFollowing.data.isFollowing,
      );
      EVENT_DESCRIPTION_STORE.setIsFollowingClub(isFollowing.data.isFollowing);
    }
    EVENT_DESCRIPTION_STORE.setData(response.data.events);
    EVENT_DESCRIPTION_STORE.setSuccess(true);
    EVENT_DESCRIPTION_STORE.setLoading(false);
  } catch (error) {
    if (error.response) {
      console.log(error);
      EVENT_DESCRIPTION_STORE.setErrorText(error.response.data.message);
    } else if (error.request) {
      console.log(error.request);
      EVENT_DESCRIPTION_STORE.setErrorText(SERVER_ERROR);
    }
    EVENT_DESCRIPTION_STORE.setError(true);
    EVENT_DESCRIPTION_STORE.setLoading(false);
  }
}
export const eventDescriptionAPI = () => {
  EVENT_DESCRIPTION_STORE.setError(false);

  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      EVENT_DESCRIPTION_STORE.setLoading(true);
      API_CALL();
    } else {
      EVENT_DESCRIPTION_STORE.setSuccess(false);
      EVENT_DESCRIPTION_STORE.setLoading(false);
      EVENT_DESCRIPTION_STORE.setErrorText(NO_NETWORK);
      EVENT_DESCRIPTION_STORE.setError(true);
    }
  });
};
