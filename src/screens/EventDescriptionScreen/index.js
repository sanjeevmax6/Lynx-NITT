import React, {useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  BackHandler,
  Share,
  Alert,
} from 'react-native';
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
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {DEEP_LINKING_STORE} from '../../mobx/DEEP_LINKING_STORE';
import {IconButton} from 'react-native-paper';
import EventStatusTag from './EventStatusTag';
import EventDescriptionHeader from './eventDescriptionHeader';
import {getFormattedDate} from '../../utils/helperFunction/getFormattedDate';
import {getFormattedTime} from '../../utils/helperFunction/getFormattedTime';
import {useToast} from 'react-native-toast-notifications';

const EventDescriptionScreen = observer(({route, navigation}) => {
  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(false);
  }
  useEffect(() => {
    if (route.params.app !== true) {
      DEEP_LINKING_STORE.setAllow(true);
    }
    EVENT_DESCRIPTION_STORE.setLoading(true);
    BOTTOM_NAV_STORE.setTabVisibility(false);
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        EVENT_DESCRIPTION_STORE.reset();
        // navigation.popToTop();
        navigation.pop();
        return true;
      },
    );
    console.log('Doing API EVENT BY ID');
    console.log('eventId:', route.params.eventId);
    EVENT_DESCRIPTION_STORE.setID(route.params.eventId);
    BOTTOM_NAV_STORE.setTabVisibility(false);
    eventDescriptionAPI();
    return () => backHandler.remove();
  }, []);
  const toast = useToast();

  const showToast = msg => {
    toast.show(msg, {type: 'warning'});
  };

  return (
    <View
      style={{
        backgroundColor: colors.EventDescriptionScreen_Back,
        flex: 1,
      }}>
      <SafeAreaView>
        {EVENT_DESCRIPTION_STORE.getLoading ? (
          <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
        ) : EVENT_DESCRIPTION_STORE.getError ? (
          <ErrorScreen
            buttonText="GO BACK"
            errorMessage={EVENT_DESCRIPTION_STORE.getErrorText}
            fn={() => {
              EVENT_DESCRIPTION_STORE.reset();
              // navigation.popToTop();
              navigation.pop();
            }}
          />
        ) : (
          <>
            <EventDescriptionHeader navigation={navigation} route={route} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <Images
                images={EVENT_DESCRIPTION_STORE.getData.photos}
                navigation={navigation}
              />
              <EventStatusTag
                startTime={EVENT_DESCRIPTION_STORE.getData.startDate}
                endTime={EVENT_DESCRIPTION_STORE.getData.endDate}
              />
              <View
                style={{
                  paddingTop: verticalScale(27),
                  elevation: 1,
                  borderTopRightRadius: scale(16),
                  borderTopLeftRadius: scale(16),
                  paddingHorizontal: scale(HorizontalPadding * 1.45),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: verticalScale(10),
                  }}>
                  <Text style={styles.eventName} numberOfLines={5}>
                    {EVENT_DESCRIPTION_STORE.getData.Title}
                  </Text>
                  <IconButton
                    onPress={async () => {
                      try {
                        const result = await Share.share({
                          message: `https://nittapp.spider.nitt.edu/event/${EVENT_DESCRIPTION_STORE.getData.urlId}`,
                          url: `https://nittapp.spider.nitt.edu/event/${EVENT_DESCRIPTION_STORE.getData.urlId}`,
                          title: `${EVENT_DESCRIPTION_STORE.getData.Title} by ${EVENT_DESCRIPTION_STORE.getData.club.name}`,
                        });
                        if (result.action === Share.sharedAction) {
                          if (result.activityType) {
                            // shared with activity type of result.activityType
                          } else {
                            // shared
                          }
                        } else if (result.action === Share.dismissedAction) {
                          // dismissed
                        }
                      } catch (error) {
                        showToast(error.message);
                      }
                    }}
                    icon={'share-variant'}
                    color={colors.EventCard_ShareIcon}
                  />
                </View>
                <ClubCard
                  name={EVENT_DESCRIPTION_STORE.getData.club.name}
                  imgID={EVENT_DESCRIPTION_STORE.getData.club.profilePic}
                  navigation={navigation}
                  clubID={EVENT_DESCRIPTION_STORE.getData.club.id}
                  route={route}
                />
                {EVENT_DESCRIPTION_STORE.getData.tags.length > 0 ? (
                  <>
                    <Text style={styles.headings}>Tags</Text>
                    <Tags
                      tags={EVENT_DESCRIPTION_STORE.getData.tags}
                      navigation={navigation}
                      route={route}
                    />
                  </>
                ) : null}

                <Text style={styles.headings}>About</Text>
                <About
                  about={EVENT_DESCRIPTION_STORE.getData.Description}
                  startDate={getFormattedDate(
                    EVENT_DESCRIPTION_STORE.getData.startDate,
                  )}
                  startTime={getFormattedTime(
                    EVENT_DESCRIPTION_STORE.getData.startDate,
                  )}
                  endDate={getFormattedDate(
                    EVENT_DESCRIPTION_STORE.getData.endDate,
                  )}
                  endTime={getFormattedTime(
                    EVENT_DESCRIPTION_STORE.getData.endDate,
                  )}
                />

                {EVENT_DESCRIPTION_STORE.getData.links.length > 0 ? (
                  <>
                    <Text style={styles.headings}>Event Links</Text>
                    <Links links={EVENT_DESCRIPTION_STORE.getData.links} />
                  </>
                ) : (
                  <></>
                )}
                <View style={{height: verticalScale(100)}} />
              </View>
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </View>
  );
});

export default EventDescriptionScreen;
const styles = ScaledSheet.create({
  eventName: {
    fontSize: '24@s',
    paddingTop: '0@vs',
    fontWeight: 'bold',
    backgroundColor: colors.WHITE,
    marginTop: verticalScale(0),
    maxWidth: '90%',
    color: colors.EventDescriptionScreen_Title,
  },
  divider: {
    // marginTop: '10@vs',
    height: '0.5@vs',
    backgroundColor: colors.GRAY_LIGHT,
  },
  headings: {
    fontSize: '20@s',
    paddingTop: '0@vs',
    fontWeight: 'bold',
    backgroundColor: colors.WHITE,
    marginVertical: verticalScale(10),
    color: colors.BLACK,
  },
});
