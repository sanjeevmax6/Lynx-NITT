import React, {useEffect} from 'react';
import {Text, View, ScrollView, SafeAreaView, BackHandler} from 'react-native';
import {Divider} from 'react-native-paper';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import Images from './Images';
import About from './About';
import Tags from './Tags';
import Links from './Links';
import ClubCard from './ClubCard';

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

const EventDescriptionScreen = observer(({route, navigation}) => {
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

            <Text style={styles.eventName}>
              {EVENT_DESCRIPTION_STORE.getData.Title}
            </Text>
            <Divider style={styles.divider} />
            <View style={{marginHorizontal: scale(3)}}>
              <ClubCard
                name={EVENT_DESCRIPTION_STORE.getData.club.name}
                // imgURL={EVENT_DESCRIPTION_STORE.getData[0].organizer.imgURL}
                imgID={EVENT_DESCRIPTION_STORE.getData.club.profilePic}
                isFollowing={EVENT_DESCRIPTION_STORE.getData.student_interest}
                followers={EVENT_DESCRIPTION_STORE.getData.club_followers}
                navigation={navigation}
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
    paddingTop: '10@vs',
    paddingBottom: '10@vs',
    paddingHorizontal: HorizontalPadding,
    fontWeight: 'bold',
    backgroundColor: colors.WHITE,

    color: colors.EventDescriptionScreen_Title,
  },
  divider: {
    // marginTop: '10@vs',
    height: '0.5@vs',
    backgroundColor: colors.GRAY_LIGHT,
  },
});
