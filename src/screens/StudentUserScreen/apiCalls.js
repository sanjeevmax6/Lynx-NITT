import {
  API_GET_STUDENT_DETAILS,
  API_GET_STUDENT_CLUBS,
  API_GET_STUDENT_INTERESTS,
} from '../../utils/API_CONSTANTS';
import {USER_STORE} from '../../mobx/USER_STORE';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';

export const getAllStudentDetails = async (refreshing = false) => {
  reset();

  try {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      STUDENT_DETAILS_STORE.setIsError(true);
      STUDENT_DETAILS_STORE.setErrorText(NO_NETWORK);
      return;
    }
    if (!refreshing) STUDENT_DETAILS_STORE.setIsLoading(true);

    const headerInfo = {
      headers: {
        'Content-Type': 'application/json',
        token: USER_STORE.getUserToken,
      },
    };
    const [detailsResponse, clubFollowResponse, interestedEventsResponse] =
      await axios.all([
        axios.get(API_GET_STUDENT_DETAILS, headerInfo),
        axios.get(API_GET_STUDENT_CLUBS, headerInfo),
        axios.get(API_GET_STUDENT_INTERESTS, headerInfo),
      ]);
    if (
      detailsResponse.status === 200 &&
      clubFollowResponse.status === 200 &&
      interestedEventsResponse.status === 200
    ) {
      STUDENT_DETAILS_STORE.setIsLoading(false);
      if (refreshing) STUDENT_DETAILS_STORE.setRefresh(false);

      STUDENT_DETAILS_STORE.setIsError(false);
      STUDENT_DETAILS_STORE.setErrorText('');

      STUDENT_DETAILS_STORE.setDetails(detailsResponse.data.details);
      STUDENT_DETAILS_STORE.setClubs(clubFollowResponse.data.clubs);
      STUDENT_DETAILS_STORE.setInterests(
        interestedEventsResponse.data.interestedEvents,
      );
    } else {
      STUDENT_DETAILS_STORE.setIsLoading(false);
      if (refreshing) STUDENT_DETAILS_STORE.setRefresh(false);

      STUDENT_DETAILS_STORE.setIsError(true);
      STUDENT_DETAILS_STORE.setErrorText(USER_DETAILS_FETCH);
    }
  } catch (e) {
    STUDENT_DETAILS_STORE.setIsLoading(false);
    if (refreshing) STUDENT_DETAILS_STORE.setRefresh(false);

    STUDENT_DETAILS_STORE.setIsError(true);
    STUDENT_DETAILS_STORE.setErrorText(e.message);
  }
};

const reset = () => {
  STUDENT_DETAILS_STORE.setIsError(false);
  STUDENT_DETAILS_STORE.setErrorText('');
  STUDENT_DETAILS_STORE.setIsLoading(false);
};
