import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {API_STORE} from '../../mobx/API_STORE';
import {API_CLUB_REGISTER} from '../../utils/API_CONSTANTS';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import {CLUB_REGISTER_STORE} from '../../mobx/CLUB_REGISTER_STORE';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_TOKEN} from '../../utils/STORAGE_KEYS';
import * as ERROR_MESSAGES from '../../utils/ERROR_MESSAGES';
export const clubRegisterAPI = () => {
  CLUB_REGISTER_STORE.setError(false);
  const token = USER_STORE.getUserToken;
  const axios = require('axios');

  const form = new FormData();

  form.append('profilePic', EDIT_CLUB_PROFILE_STORE.getClubImage);
  form.append('description', EDIT_CLUB_PROFILE_STORE.getClubDescription);
  const links = {
    website: EDIT_CLUB_PROFILE_STORE.getWebsiteLink,
    instagram: EDIT_CLUB_PROFILE_STORE.getInstagramLink,
    facebook: EDIT_CLUB_PROFILE_STORE.getFacebookLink,
    youtube: EDIT_CLUB_PROFILE_STORE.getYoutubeLink,
    linkedin: EDIT_CLUB_PROFILE_STORE.getLinkedInLink,
    medium: EDIT_CLUB_PROFILE_STORE.getMediumLink,
  };

  form.append('links', JSON.stringify(links));

  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      CLUB_REGISTER_STORE.setLoading(true);
      axios
        .put(API_STORE.getBaseUrl + API_CLUB_REGISTER, form, {
          headers: {
            token: token,
          },
        })
        .then(response => {
          CLUB_REGISTER_STORE.setLoading(false);
          if (response.status == 200) {
            USER_STORE.setRedirectUpdate(false);
            AsyncStorage.setItem(USER_TOKEN, USER_STORE.getUserToken); //user token stored locally
          }
        })
        .catch(error => {
          CLUB_REGISTER_STORE.setError(true);
          CLUB_REGISTER_STORE.setLoading(false);
          if (error.response) {
            CLUB_REGISTER_STORE.setErrorText(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
            CLUB_REGISTER_STORE.setError(ERROR_MESSAGES.SERVER_ERROR);
          }
        });
    } else {
      CLUB_REGISTER_STORE.setErrorText(ERROR_MESSAGES.NO_NETWORK);
    }
  });
};
