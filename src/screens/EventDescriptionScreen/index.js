import React, {useEffect} from 'react';
import {Text, View, ScrollView, SafeAreaView, BackHandler} from 'react-native';
import {Divider} from 'react-native-paper';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import Images from './Images';
import About from './About';
import Tags from './Tags';
import Links from './Links';
import ClubCard from './ClubCard';
import {useIsFocused} from '@react-navigation/native';

import * as colors from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {EVENT_DESCRIPTION_STORE} from '../../mobx/EVENT_DESCRIPTION_STORE';
import {eventDescriptionAPI} from './eventDescriptionAPI';
import LoaderPage from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';
import {observer} from 'mobx-react';
import {ACCENT_LOTTIE} from '../../utils/LOADING_TYPES';
import moment from 'moment';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {isLive} from '../../utils/helperFunction/isLive';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EventStatusTag from './EventStatusTag';

const EventDescriptionScreen = observer(({route, navigation}) => {
  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(false);
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BOTTOM_NAV_STORE.setTabVisibility(true);
        navigation.pop();
        return true;
      },
    );

    console.log('Doing API  EVENT BY ID');
    console.log('eventId: ', route.params.eventId);
    EVENT_DESCRIPTION_STORE.setID(route.params.eventId);
    BOTTOM_NAV_STORE.setTabVisibility(false);
    eventDescriptionAPI();
    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{backgroundColor: colors.EventDescriptionScreen_Back, flex: 1}}>
      <SafeAreaView>
        {EVENT_DESCRIPTION_STORE.getLoading ? (
          <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
        ) : EVENT_DESCRIPTION_STORE.getError ? (
          <ErrorScreen
            errorMessage={EVENT_DESCRIPTION_STORE.getErrorText}
            fn={() => {
              EVENT_DESCRIPTION_STORE.setErrorText('');
              EVENT_DESCRIPTION_STORE.setError(false);
              eventDescriptionAPI();
            }}
          />
        ) : (
          <ScrollView>
            <Images
              images={EVENT_DESCRIPTION_STORE.getData.photos}
              navigation={navigation}
            />
            <Divider style={styles.divider} />
            <EventStatusTag
              startTime={EVENT_DESCRIPTION_STORE.getData.startDate}
              endTime={EVENT_DESCRIPTION_STORE.getData.endDate}
            />
            <Text style={styles.eventName}>
              {EVENT_DESCRIPTION_STORE.getData.Title}
            </Text>

            <Divider style={styles.divider} />
            <View style={{marginHorizontal: scale(3)}}>
              <ClubCard
                name={EVENT_DESCRIPTION_STORE.getData.club.name}
                imgID={EVENT_DESCRIPTION_STORE.getData.club.profilePic}
                followers={EVENT_DESCRIPTION_STORE.getData.club_followers}
                navigation={navigation}
                clubID={EVENT_DESCRIPTION_STORE.getData.club.id}
              />
            </View>
            <Divider style={styles.divider} />

            <About
              about={EVENT_DESCRIPTION_STORE.getData.Description}
              startDate={moment(
                new Date(
                  EVENT_DESCRIPTION_STORE.getData.startDate,
                ).toLocaleString(),
              ).format('DD-MM-YYYY')}
              startTime={moment(
                new Date(
                  EVENT_DESCRIPTION_STORE.getData.startDate,
                ).toLocaleString(),
              ).format('hh:mm A')}
              endDate={moment(
                new Date(
                  EVENT_DESCRIPTION_STORE.getData.endDate,
                ).toLocaleString(),
              ).format('DD-MM-YYYY')}
              endTime={moment(
                new Date(
                  EVENT_DESCRIPTION_STORE.getData.endDate,
                ).toLocaleString(),
              ).format('hh:mm A')}
            />
            <Divider style={styles.divider} />
            {EVENT_DESCRIPTION_STORE.getData.links.length > 0 ? (
              <>
                <Links links={EVENT_DESCRIPTION_STORE.getData.links} />
              </>
            ) : (
              <></>
            )}

            <Divider style={styles.divider} />
            <Tags
              tags={EVENT_DESCRIPTION_STORE.getData.tags}
              navigation={navigation}
            />
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
});

export default EventDescriptionScreen;
const styles = ScaledSheet.create({
  eventName: {
    fontSize: '18@s',
    paddingTop: '0@vs',
    paddingBottom: '10@vs',
    paddingHorizontal: HorizontalPadding,
    fontWeight: 'bold',
    backgroundColor: colors.WHITE,
    marginTop: verticalScale(-6),
    color: colors.EventDescriptionScreen_Title,
  },
  divider: {
    // marginTop: '10@vs',
    height: '0.5@vs',
    backgroundColor: colors.GRAY_LIGHT,
  },
});
