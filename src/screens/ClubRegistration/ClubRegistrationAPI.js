import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {API_STORE} from '../../mobx/API_STORE';
import {API_CLUB_REGISTER} from '../../utils/API_CONSTANTS';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import {CLUB_REGISTER_STORE} from '../../mobx/CLUB_REGISTER_STORE';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_TOKEN} from '../../utils/STORAGE_KEYS';
import axios from 'axios';
import * as ERROR_MESSAGES from '../../utils/ERROR_MESSAGES';

export const clubRegisterAPI = () => {
  console.log('HEY API CALL');

  CLUB_REGISTER_STORE.setError(false);
  CLUB_REGISTER_STORE.setLoading(true);

  const token = USER_STORE.getUserToken;

  const form = new FormData();

  form.append('profilePic', {
    uri: EDIT_CLUB_PROFILE_STORE.getClubImage.uri,
    type: EDIT_CLUB_PROFILE_STORE.getClubImage.type,
    name: EDIT_CLUB_PROFILE_STORE.getClubImage.name,
  });

  form.append('description', EDIT_CLUB_PROFILE_STORE.getClubDescription.trim());

  form.append('links[website]', EDIT_CLUB_PROFILE_STORE.getWebsiteLink.trim());

  form.append(
    'links[linkedin]',
    EDIT_CLUB_PROFILE_STORE.getLinkedInLink.trim(),
  );

  form.append('links[youtube]', EDIT_CLUB_PROFILE_STORE.getYoutubeLink.trim());

  form.append(
    'links[instagram]',
    EDIT_CLUB_PROFILE_STORE.getInstagramLink.trim(),
  );

  form.append('links[medium]', EDIT_CLUB_PROFILE_STORE.getMediumLink.trim());

  form.append(
    'links[facebook]',
    EDIT_CLUB_PROFILE_STORE.getFacebookLink.trim(),
  );

  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      axios
        .put(API_STORE.getBaseUrl + API_CLUB_REGISTER, form, {
          headers: {
            token: token,
          },
        })
        .then(response => {
          if (response.status == 200) {
            console.log('HEY API CALL');
            console.log(response.data.message);
            CLUB_REGISTER_STORE.setSuccess(true);
          } else {
            CLUB_REGISTER_STORE.setErrorText(ERROR_MESSAGES.UNEXPECTED_ERROR);
            CLUB_REGISTER_STORE.setError(true);
          }
          CLUB_REGISTER_STORE.setLoading(false);
        })
        .catch(error => {
          console.log('failure');
          if (error.response) {
            CLUB_REGISTER_STORE.setErrorText(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
            CLUB_REGISTER_STORE.setErrorText(ERROR_MESSAGES.SERVER_ERROR);
          }
          CLUB_REGISTER_STORE.setError(true);
          CLUB_REGISTER_STORE.setLoading(false);
        });
    } else {
      CLUB_REGISTER_STORE.setErrorText(ERROR_MESSAGES.NO_NETWORK);
      CLUB_REGISTER_STORE.setError(true);
      CLUB_REGISTER_STORE.setLoading(false);
    }
  });
};
