import React, {useEffect} from 'react';
import {SafeAreaView, Text, View, Animated, ScrollView} from 'react-native';

import {Divider} from 'react-native-paper';

import {ScaledSheet, verticalScale, scale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {HorizontalPadding, HeaderHeight} from '../../utils/UI_CONSTANTS';
import {NO_IMAGE_URL} from '../../utils/API_CONSTANTS';
import CreatorDetails from './CreatorDetails';
import AnnouncementDetail from './AnnouncementDetail';
import {circularDescriptionApi} from './AnnouncementApi';
import {ANNOUNCEMENT_DETAILS_STORE} from '../../mobx/ANNOUNCEMENT_DETAILS_STORE';
import {observer} from 'mobx-react';
import LoaderPage from '../../components/LoadingScreen';
import {ACCENT_LOTTIE} from '../../utils/LOADING_TYPES';
import ErrorScreen from '../../components/ErrorScreen';
import {useIsFocused} from '@react-navigation/native';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import Header from '../../components/Header';

const AnnouncementDetailScreen = observer(({route, navigation}) => {
  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(false);
  }
  useEffect(() => {
    console.log('getting Circular by Id: ', route.params.circularId);
    ANNOUNCEMENT_DETAILS_STORE.setId(route.params.circularId);
    circularDescriptionApi();
  }, []);
  return (
    <>
      <Header
        props={{navigation: navigation}}
        title={
          ANNOUNCEMENT_DETAILS_STORE.getLoading
            ? ''
            : ANNOUNCEMENT_DETAILS_STORE.getData.title
        }
      />
      {ANNOUNCEMENT_DETAILS_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
      ) : (
        <>
          {ANNOUNCEMENT_DETAILS_STORE.getError ? (
            <ErrorScreen />
          ) : (
            <ScrollView
              style={{marginHorizontal: scale(HorizontalPadding)}}
              showsVerticalScrollIndicator={false}>
              <CreatorDetails navigation={navigation} />
              <AnnouncementDetail />
            </ScrollView>
          )}
        </>
      )}
    </>
  );
});

const styles = ScaledSheet.create({
  divider: {
    height: '2@vs',
    backgroundColor: colors.GRAY_MEDIUM,
  },
});
export default AnnouncementDetailScreen;
