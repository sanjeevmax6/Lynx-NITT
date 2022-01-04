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

export const getAllStudentDetails = async () => {
  reset();
  try {
    const netInfo = await NetInfo.fetch();
    const headerInfo = {
      headers: {
        'Content-Type': 'application/json',
        token: USER_STORE.getUserToken,
      },
    };
    if (netInfo.isConnected) {
      getDetails(headerInfo);
      getClubs(headerInfo);
      getInterests(headerInfo);
    } else {
      STUDENT_DETAILS_STORE.setIsError(true);
      STUDENT_DETAILS_STORE.setErrorText(NO_NETWORK);
    }
  } catch (e) {
    STUDENT_DETAILS_STORE.setIsError(true);
    STUDENT_DETAILS_STORE.setErrorText(e.message);
  }
};

export const getDetails = async headerInfo => {
  const response = await axios.get(API_GET_STUDENT_DETAILS, headerInfo);
  if (response.status === 200) {
    STUDENT_DETAILS_STORE.setIsError(false);
    STUDENT_DETAILS_STORE.setErrorText('');
    STUDENT_DETAILS_STORE.setHasDetailsLoaded(true);
    STUDENT_DETAILS_STORE.setDetails(response.data.details);
  } else {
    STUDENT_DETAILS_STORE.setIsError(true);
    STUDENT_DETAILS_STORE.setErrorText(response.data.message);
  }
};

export const getClubs = async headerInfo => {
  const response = await axios.get(API_GET_STUDENT_CLUBS, headerInfo);
  if (response.status === 200) {
    STUDENT_DETAILS_STORE.setIsError(false);
    STUDENT_DETAILS_STORE.setErrorText('');
    STUDENT_DETAILS_STORE.setHasClubsLoaded(true);
    STUDENT_DETAILS_STORE.setClubs(response.data.clubs);
  } else {
    STUDENT_DETAILS_STORE.setIsError(true);
    STUDENT_DETAILS_STORE.setErrorText(response.data.message);
  }
};

export const getInterests = async headerInfo => {
  const response = await axios.get(API_GET_STUDENT_INTERESTS, headerInfo);
  if (response.status === 200) {
    STUDENT_DETAILS_STORE.setIsError(false);
    STUDENT_DETAILS_STORE.setErrorText('');
    STUDENT_DETAILS_STORE.setHasInterestsLoaded(true);
    STUDENT_DETAILS_STORE.setInterests(response.data.intersetedEvents);
  } else {
    STUDENT_DETAILS_STORE.setIsError(true);
    STUDENT_DETAILS_STORE.setErrorText(response.data.message);
  }
};

const reset = () => {
  STUDENT_DETAILS_STORE.setIsError(false);
  STUDENT_DETAILS_STORE.setErrorText('');
  STUDENT_DETAILS_STORE.setHasDetailsLoaded(false);
  STUDENT_DETAILS_STORE.setHasClubsLoaded(false);
  STUDENT_DETAILS_STORE.setHasInterestsLoaded(false);
};
