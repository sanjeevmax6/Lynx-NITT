import {API_ADD_EVENT} from '../../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';

export const EventCreationAPI = (
  title,
  description,
  time,
  date,
  userToken,
  setLoading,
  setErrorText,
) => {
  const axios = require('axios');
  console.log(userToken);
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      setLoading(true);
      axios
        .post(
          API_ADD_EVENT,
          {title, description, time, date},

          {headers: {token: userToken}},
        )
        .then(response => {
          setLoading(false);
          //console.log('EventCreated',response.data.message);
          setErrorText(response.data.message);
        })
        .catch(error => {
          if (error.response) {
            setLoading(false);
            setErrorText(error.response.data.message);
          } else if (error.request) {
            setErrorText('Server Error');
          }
          console.log(error);
        });
    } else {
      setErrorText('No internet connection');
    }
  });
};
