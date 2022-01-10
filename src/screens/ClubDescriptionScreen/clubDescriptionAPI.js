import {
  API_CLUB_DATA_BY_ID,
  API_CLUB_UPCOMING_EVENTS_BY_ID,
  API_CLUB_PAST_EVENTS_BY_ID,
  API_IS_FOLLOWING,
} from '../../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {NO_NETWORK, SERVER_ERROR} from '../../utils/ERROR_MESSAGES';
import {CLUB_DESCRIPTION_STORE} from '../../mobx/CLUB_DESCRIPTION_STORE';
import axios from 'axios';
import {STUDENT} from '../../utils/USER_TYPE';
import {API_STORE} from '../../mobx/API_STORE';

async function API_CALL() {
  try {
    // const responseData = await axios.get(
    //   API_CLUB_DATA_BY_ID + '/' + CLUB_DESCRIPTION_STORE.getID,
    // );
    // const responseUpcomingLive = await axios.get(
    //   API_CLUB_UPCOMING_EVENTS_BY_ID + '/' + CLUB_DESCRIPTION_STORE.getID,
    // );
    // const responsePast = await axios.get(
    //   API_CLUB_PAST_EVENTS_BY_ID + '/' + CLUB_DESCRIPTION_STORE.getID,
    // );

    const [responseData, responseUpcomingLive, responsePast] = await axios.all([
      axios.get(API_CLUB_DATA_BY_ID + '/' + CLUB_DESCRIPTION_STORE.getID),
      axios.get(
        API_CLUB_UPCOMING_EVENTS_BY_ID + '/' + CLUB_DESCRIPTION_STORE.getID,
      ),
      axios.get(
        API_CLUB_PAST_EVENTS_BY_ID + '/' + CLUB_DESCRIPTION_STORE.getID,
      ),
    ]);

    if (USER_STORE.getUserType === STUDENT) {
      const isFollowing = await axios.get(
        API_STORE.getBaseUrl + API_IS_FOLLOWING + CLUB_DESCRIPTION_STORE.getID,
        {headers: {token: USER_STORE.getUserToken}},
      );
      CLUB_DESCRIPTION_STORE.setIsFollowingClub(isFollowing.data.isFollowing);
    }
    if (
      responseData.status == 200 &&
      responseUpcomingLive.status == 200 &&
      responsePast.status == 200
    ) {
      CLUB_DESCRIPTION_STORE.setData(responseData.data.details);
      CLUB_DESCRIPTION_STORE.setLiveEvents(
        responseUpcomingLive.data.liveEvents,
      );
      CLUB_DESCRIPTION_STORE.setUpcomingEvents(
        responseUpcomingLive.data.upcomingEvents,
      );
      CLUB_DESCRIPTION_STORE.setPastEvents(responsePast.data.pastEvents);
      CLUB_DESCRIPTION_STORE.setSuccess(true);
    } else {
      CLUB_DESCRIPTION_STORE.setSuccess(false);
      CLUB_DESCRIPTION_STORE.setError(true);
      CLUB_DESCRIPTION_STORE.setErrorText(USER_DETAILS_FETCH);
    }
    CLUB_DESCRIPTION_STORE.setLoading(false);
  } catch (error) {
    if (error.response) {
      console.log(error);
      CLUB_DESCRIPTION_STORE.setErrorText(error.response.data.message);
    } else if (error.request) {
      console.log(error.request);
      CLUB_DESCRIPTION_STORE.setErrorText(SERVER_ERROR);
    }
    CLUB_DESCRIPTION_STORE.setError(true);
    CLUB_DESCRIPTION_STORE.setLoading(false);
  }
}
export const clubDescriptionAPI = () => {
  CLUB_DESCRIPTION_STORE.setError(false);

  //using netinfo to check if online
  NetInfo.fetch().then(state => {
    if (state.isConnected === true) {
      CLUB_DESCRIPTION_STORE.setLoading(true);
      API_CALL();
    } else {
      CLUB_DESCRIPTION_STORE.setSuccess(false);
      CLUB_DESCRIPTION_STORE.setLoading(false);
      CLUB_DESCRIPTION_STORE.setErrorText(NO_NETWORK);
      CLUB_DESCRIPTION_STORE.setError(true);
    }
  });
};
