import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import EventsCard from '../../components/EventsCard';
import SuggestedEventCard from '../../components/SuggestedEventCard';
import {FEEDS_STORE} from '../../mobx/FEEDS_STORE';
import * as colors from '../../utils/colors';
import {HorizontalPadding, HeaderHeight} from '../../utils/UI_CONSTANTS';
import {feedsAPI} from './feedsAPI';
import LoaderPage from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';
import {
  ACCENT_ACTIVITY_SCREEN,
  ACCENT_EVENT_SCREEN,
  ACCENT_LOTTIE,
} from '../../utils/LOADING_TYPES';
import {observer} from 'mobx-react';
import moment from 'moment';
import {USER_STORE} from '../../mobx/USER_STORE';
import {CLUB, STUDENT} from '../../utils/USER_TYPE';
import {isLive} from '../../utils/helperFunction/isLive';
import {useIsFocused} from '@react-navigation/native';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import NoEventScreen from '../../components/NoEventScreen';
import {NO_EVENTS} from '../../utils/ERROR_MESSAGES';

const FeedScreen = observer(({navigation}) => {
  const onRefresh = React.useCallback(() => {
    if (USER_STORE.getUserType === STUDENT) {
      FEEDS_STORE.setRefreshing(true);
      FEEDS_STORE.setError(false);
      FEEDS_STORE.setErrorText('');
      FEEDS_STORE.setLoading(false);
      FEEDS_STORE.setSuccess(false);

      feedsAPI(true);
    }
  }, []);

  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(true);
  }
  useEffect(() => {
    if (USER_STORE.getUserType === STUDENT) feedsAPI(false);
    else {
      FEEDS_STORE.setError(false);
      FEEDS_STORE.setLoading(false);
    }
  }, []);

  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, verticalScale(HeaderHeight));

  const interpolateY = diffClamp.interpolate({
    inputRange: [0, verticalScale(HeaderHeight)],
    outputRange: [0, verticalScale(-1 * HeaderHeight)],
  });

  const SuggestedEvents = () => {
    const Separator = () => <View style={{width: scale(HorizontalPadding)}} />;
    return (
      <>
        {FEEDS_STORE.getData.suggestedEvents != null &&
        FEEDS_STORE.getData.suggestedEvents.length > 0 ? (
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: scale(18),
                marginHorizontal: scale(HorizontalPadding),
                marginVertical: verticalScale(9),
              }}>
              Suggested Events
            </Text>

            <FlatList
              data={FEEDS_STORE.getData.suggestedEvents}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={<Separator />}
              ListFooterComponent={<Separator />}
              ItemSeparatorComponent={() => (
                <View style={{width: scale(HorizontalPadding)}} />
              )}
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('EventDescriptionScreen', {
                        eventId: item.EventId,
                      });
                    }}>
                    <SuggestedEventCard
                      eventImage={item.poster}
                      organizer={item.club.name}
                      eventName={item.Title}
                      isLive={isLive(item.startDate, item.endDate)}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      {FEEDS_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_EVENT_SCREEN} />
      ) : FEEDS_STORE.getError ? (
        <ErrorScreen
          errorMessage={FEEDS_STORE.getErrorText}
          fn={() => {
            FEEDS_STORE.setErrorText('');
            FEEDS_STORE.setError(false);
            feedsAPI();
          }}
        />
      ) : (
        <SafeAreaView>
          <Animated.View
            style={{
              elevation: 1,
              zIndex: 1,
              transform: [
                {
                  translateY: interpolateY,
                },
              ],
            }}>
            <SafeAreaView>
              <View
                style={{
                  left: 0,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  right: 0,
                  height: verticalScale(HeaderHeight),
                  backgroundColor: colors.EventScreen_headerBackground,
                  // borderBottomLeftRadius: scale(10),
                  // borderBottomRightRadius: scale(10),
                  elevation: 5,
                  zIndex: 100, //for IOS
                  alignContent: 'center',
                  justifyContent: 'center',
                  shadowColor: colors.GRAY_DARK,
                }}>
                <Text
                  style={{
                    fontSize: verticalScale(18),
                    paddingLeft: scale(HorizontalPadding),
                    color: 'white',
                    fontWeight: 'bold',
                    color: colors.HeaderText,
                  }}>
                  EVENTS
                </Text>
              </View>
            </SafeAreaView>
          </Animated.View>
          <FlatList
            data={[
              ...FEEDS_STORE.getData.liveEvents,
              ...FEEDS_STORE.getData.upcomingEvents,
            ]}
            showsVerticalScrollIndicator={false}
            style={{height: '100%'}}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={<NoEventScreen errorMessage={NO_EVENTS} />}
            ListHeaderComponent={
              <View style={{height: verticalScale(HeaderHeight)}}></View>
            }
            ListFooterComponent={<SuggestedEvents />}
            onScroll={e => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            refreshControl={
              <RefreshControl
                refreshing={FEEDS_STORE.getRefreshing}
                colors={[colors.Accent]}
                onRefresh={onRefresh}
                progressViewOffset={verticalScale(50)}
              />
            }
            bounces={false}
            bouncesZoom={false}
            renderItem={({item}) => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('EventDescriptionScreen', {
                      eventId: item.EventId,
                    });
                  }}>
                  <EventsCard
                    date={moment(item.startDate).format('DD/MM/YY')}
                    time={moment(item.startDate).format('HH:mm')}
                    name={item.Title}
                    desc={item.Description}
                    eventImage={item.poster}
                    organizer={item.club.name}
                    isLive={item.isLive}
                    wasInterested={item.isInterested}
                    eventId={item.EventId}
                  />
                </TouchableOpacity>
              </View>
            )}
            numColumns={1}
            keyExtractor={(item, index) => index}
          />
        </SafeAreaView>
      )}
    </View>
  );
});

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
