import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import {EditProfileClubAPI} from './EditProfileClubAPI';
import EditClubLinks from './EditClubLinks';
import EditDescription from './EditDescription';
import EditProfilePicture from './EditProfilePicture';
import ScreenHeader from './ScreenHeader';

const EditClubProfileScreen = ({navigation}) => {
  const [profilePic, setProfilePic] = useState('');
  const [isProfilePicSelected, setProfilePicSelected] = useState(false);
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState([]);

  const PhotoStates = {
    profilePic,
    setProfilePic,
    isProfilePicSelected,
    setProfilePicSelected,
  };
  const inputStates = {
    description,
    setDescription,
  };
  const linksStates = [links, setLinks];
  const handleAPICALL = () => {
    EDIT_CLUB_PROFILE_STORE.setErrorText(null);
    const formData = new FormData();
    formData.append('profilePic', profilePic);
    formData.append('description', description);
    formData.append('links', JSON.stringify(links));
    EditProfileClubAPI(formData);
  };

  useEffect(() => {
    BOTTOM_NAV_STORE.setTabVisibility(false);
  }, []);
  return (
    <>
      <ScreenHeader
        navigation={navigation}
        isValid={true}
        handleAPICALL={handleAPICALL}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <EditProfilePicture PhotoStates={PhotoStates} />
        <EditDescription inputStates={inputStates} />
        <EditClubLinks linksStates={linksStates} />
        <View style={{height: verticalScale(20)}} />
      </ScrollView>
    </>
  );
};

export default EditClubProfileScreen;
