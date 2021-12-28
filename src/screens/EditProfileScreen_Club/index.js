import React, {useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import EditClubLinks from './EditClubLinks';
import EditDescription from './EditDescription';
import EditProfilePicture from './EditProfilePicture';
import ScreenHeader from './ScreenHeader';

const EditClubProfileScreen = ({navigation}) => {
  useEffect(() => {
    BOTTOM_NAV_STORE.setTabVisibility(false);
  }, []);
  return (
    <>
      <ScreenHeader navigation={navigation} isValid={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <EditProfilePicture />
        <EditDescription />
        <EditClubLinks />
        <View style={{height: verticalScale(200)}} />
      </ScrollView>
    </>
  );
};

export default EditClubProfileScreen;
