import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, BackHandler} from 'react-native';
import * as colors from '../../utils/colors';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import EventsView from './EventsView';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {Divider} from 'react-native-paper';
import Header from './Header';
import {useIsFocused} from '@react-navigation/native';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';

import {CLUB_DESCRIPTION_STORE} from '../../mobx/CLUB_DESCRIPTION_STORE';
import {clubDescriptionAPI} from './clubDescriptionAPI';
import LoaderPage from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';
import {observer} from 'mobx-react';
import {ACCENT_LOTTIE} from '../../utils/LOADING_TYPES';

const renderTopLayout = (data, navigation) => (
  <View>
    <Header
      name={data.name}
      email={data.email}
      followers={data.followers_count}
      url={data.profile_pic}
      description={data.description}
      navigation={navigation}
    />
    <Divider style={styles.divider} />
    {CLUB_DESCRIPTION_STORE.getLiveEvents.length === 0 &&
    CLUB_DESCRIPTION_STORE.getUpcomingEvents.length === 0 ? (
      <></>
    ) : (
      <Text
        style={{
          fontSize: scale(18),
          paddingTop: verticalScale(6),
          fontWeight: '500',
          color: colors.BLACK,
          marginHorizontal: scale(HorizontalPadding),
        }}>
        Events
      </Text>
    )}
  </View>
);

const ClubDescriptionScreen = observer(({route, navigation}) => {
  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(false);
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.pop();
        return true;
      },
    );
    CLUB_DESCRIPTION_STORE.setID(route.params.data.ClubId);
    BOTTOM_NAV_STORE.setTabVisibility(false);
    clubDescriptionAPI();
    return () => backHandler.remove();
  }, []);

  const goToEvent = eventId => {
    navigation.push('EventDescriptionScreen', {
      eventId: eventId,
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.WHITE, flex: 1}}>
      {CLUB_DESCRIPTION_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
      ) : CLUB_DESCRIPTION_STORE.getError ? (
        <ErrorScreen
          errorMessage={CLUB_DESCRIPTION_STORE.getErrorText}
          fn={() => {
            CLUB_DESCRIPTION_STORE.setErrorText('');
            CLUB_DESCRIPTION_STORE.setError(false);
            clubDescriptionAPI();
          }}
        />
      ) : (
        <EventsView
          liveEventArray={CLUB_DESCRIPTION_STORE.getLiveEvents}
          upcomingEventArray={CLUB_DESCRIPTION_STORE.getUpcomingEvents}
          topLayout={renderTopLayout(
            CLUB_DESCRIPTION_STORE.getData,
            navigation,
          )}
          goToEvent={goToEvent}
        />
      )}
    </SafeAreaView>
  );
});

export default ClubDescriptionScreen;

const styles = ScaledSheet.create({
  head: {
    color: colors.BLACK,
    fontWeight: 'bold',
    fontSize: '14@s',
    paddingTop: '10@vs',

    paddingHorizontal: scale(HorizontalPadding),
  },
  divider: {
    // marginTop: '10@vs',
    height: '2@vs',
    backgroundColor: colors.GRAY_LIGHT,
  },
});
