import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import {EditProfileClubAPI} from './EditProfileClubAPI';
import EditClubLinks from './EditClubLinks';
import EditDescription from './EditDescription';
import EditProfilePicture from './EditProfilePicture';
import {observer} from 'mobx-react';
import ScreenHeader from './ScreenHeader';
import LoaderPage from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';
import SuccessScreen from '../../components/SuccessScreen';
import {ACCENT_LOTTIE} from '../../utils/LOADING_TYPES';
import {CLUB_USER_STORE} from '../../mobx/CLUB_USER_STORE';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';

const EditClubProfileScreen = observer(({navigation}) => {
  const handleAPICALL = () => {
    EDIT_CLUB_PROFILE_STORE.setErrorText(null);
    const form = new FormData();

    if (
      EDIT_CLUB_PROFILE_STORE.getImage &&
      Object.keys(EDIT_CLUB_PROFILE_STORE.getImage).length !== 0
    ) {
      form.append('profilePic', {
        uri: EDIT_CLUB_PROFILE_STORE.getImage.uri,
        type: EDIT_CLUB_PROFILE_STORE.getImage.type,
        name: EDIT_CLUB_PROFILE_STORE.getImage.name,
      });
    }

    form.append(
      'description',
      EDIT_CLUB_PROFILE_STORE.getClubDescription.trim(),
    );

    form.append(
      'links[website]',
      EDIT_CLUB_PROFILE_STORE.getWebsiteLink.trim(),
    );

    form.append(
      'links[linkedin]',
      EDIT_CLUB_PROFILE_STORE.getLinkedInLink.trim(),
    );

    form.append(
      'links[youtube]',
      EDIT_CLUB_PROFILE_STORE.getYoutubeLink.trim(),
    );

    form.append(
      'links[instagram]',
      EDIT_CLUB_PROFILE_STORE.getInstagramLink.trim(),
    );

    form.append('links[medium]', EDIT_CLUB_PROFILE_STORE.getMediumLink.trim());

    form.append(
      'links[facebook]',
      EDIT_CLUB_PROFILE_STORE.getFacebookLink.trim(),
    );

    EditProfileClubAPI(form);
  };

  const populateData = () => {
    EDIT_CLUB_PROFILE_STORE.reset();
    const clubDetails = CLUB_USER_STORE.getClubDetail;
    EDIT_CLUB_PROFILE_STORE.setClubDescription(clubDetails.description);
    EDIT_CLUB_PROFILE_STORE.setClubImage(
      API_GET_IMAGE + clubDetails.profile_pic,
    );
    EDIT_CLUB_PROFILE_STORE.setInstagramLink(clubDetails.links.instagram);
    EDIT_CLUB_PROFILE_STORE.setWebsiteLink(clubDetails.links.website);
    EDIT_CLUB_PROFILE_STORE.setFacebookLink(clubDetails.links.facebook);
    EDIT_CLUB_PROFILE_STORE.setLinkedInLink(clubDetails.links.linkedin);
    EDIT_CLUB_PROFILE_STORE.setYoutubeLink(clubDetails.links.youtube);
    EDIT_CLUB_PROFILE_STORE.setMediumLink(clubDetails.links.medium);
  };

  useEffect(() => {
    populateData();
    BOTTOM_NAV_STORE.setTabVisibility(false);
  }, []);
  return (
    <>
      {EDIT_CLUB_PROFILE_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
      ) : (
        <>
          {EDIT_CLUB_PROFILE_STORE.getError ? (
            <ErrorScreen
              errorMessage={EDIT_CLUB_PROFILE_STORE.getErrorText}
              fn={() => {
                EDIT_CLUB_PROFILE_STORE.setErrorText('');
                EDIT_CLUB_PROFILE_STORE.setError(false);
                if (EDIT_CLUB_PROFILE_STORE.getErrorText === NO_NETWORK) {
                  handleAPICALL();
                }
              }}
            />
          ) : (
            <>
              {EDIT_CLUB_PROFILE_STORE.getSuccess ? (
                <SuccessScreen
                  buttonText={'BACK'}
                  showIconInButton={false}
                  fn={() => {
                    EDIT_CLUB_PROFILE_STORE.setSuccess(false);
                    navigation.pop();
                    BOTTOM_NAV_STORE.setTabVisibility(true);
                  }}
                />
              ) : (
                <>
                  <ScreenHeader
                    navigation={navigation}
                    isValid={
                      EDIT_CLUB_PROFILE_STORE.getClubDescription.length >= 0
                    }
                    handleAPICALL={handleAPICALL}
                  />
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <EditProfilePicture />
                    <EditDescription />
                    <EditClubLinks />
                    <View style={{height: verticalScale(20)}} />
                  </ScrollView>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
});

export default EditClubProfileScreen;
