import NetInfo from '@react-native-community/netinfo';
import {USER_STORE} from '../../mobx/USER_STORE';
import {API_STORE} from '../../mobx/API_STORE';
import {API_CLUB_REGISTER} from '../../utils/API_CONSTANTS';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import {CLUB_REGISTER_STORE} from '../../mobx/CLUB_REGISTER_STORE';
export const clubRegisterAPI = () => {
  const token = USER_STORE.getUserToken;
  const axios = require('axios');

  const formData = new FormData();
  formData.append('profilePic', EDIT_CLUB_PROFILE_STORE.getClubImage);
  formData.append('description', EDIT_CLUB_PROFILE_STORE.getClubDescription);
  const links = {
    website: EDIT_CLUB_PROFILE_STORE.getWebsiteLink,
    instagram: EDIT_CLUB_PROFILE_STORE.getInstagramLink,
    facebook: EDIT_CLUB_PROFILE_STORE.getFacebookLink,
    youtube: EDIT_CLUB_PROFILE_STORE.getYoutubeLink,
    linkedin: EDIT_CLUB_PROFILE_STORE.getLinkedInLink,
    medium: EDIT_CLUB_PROFILE_STORE.getMediumLink,
  };
  //console.log(links);

  formData.append('links', JSON.stringify(links));

  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      CLUB_REGISTER_STORE.setLoading(true);
      axios
        .put(
          API_STORE.getBaseUrl + API_CLUB_REGISTER,
          formData,

          {headers: {token: token}},
        )
        .then(response => {
          CLUB_REGISTER_STORE.setLoading(false);

          if (response.status == 200) {
            USER_STORE.setRedirectUpdate(false);
          }
        })
        .catch(error => {
          //console.log(JSON.stringify(error));
          CLUB_REGISTER_STORE.setLoading(false);
          if (error.response) {
            console.log(error.response);
            //CLUB_REGISTER_STORE.setErrorText(error.response.message);
          } else if (error.request) {
            console.log(error.request);
            //CLUB_REGISTER_STORE.setErrorText(error.response.message);
          }
        });
    } else {
      CLUB_REGISTER_STORE.setErrorText('No internet connection');
    }
  });
};
