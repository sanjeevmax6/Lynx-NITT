import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Animated,
  RefreshControl,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import {observer} from 'mobx-react';
import ActivityCard from '../../components/ActivityCard';
import ErrorScreen from '../../components/ErrorScreen';
import LoaderPage from '../../components/LoadingScreen';
import {ACTIVITY_STORE} from '../../mobx/ACITIVITY_STORE';

import * as colors from '../../utils/colors';
import {ACCENT_ACTIVITY_SCREEN} from '../../utils/LOADING_TYPES';
import {HorizontalPadding, HeaderHeight} from '../../utils/UI_CONSTANTS';

import ActivityAPI from './ActivityAPI';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {useIsFocused} from '@react-navigation/native';

const ActivityScreen = observer(({navigation}) => {
  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(true);
  }
  const onRefresh = React.useCallback(() => {
    ACTIVITY_STORE.setRefreshing(true);
    ACTIVITY_STORE.setError(false);
    ACTIVITY_STORE.setErrorText('');
    ACTIVITY_STORE.setLoading(false);
    ACTIVITY_STORE.setSuccess(false);

    ActivityAPI(true);
  }, []);

  useEffect(() => {
    ActivityAPI(false);
  }, []);

  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, verticalScale(HeaderHeight));

  const interpolateY = diffClamp.interpolate({
    inputRange: [0, verticalScale(HeaderHeight)],
    outputRange: [0, verticalScale(-1 * HeaderHeight)],
  });
  return (
    <View style={{flex: 1}}>
      {ACTIVITY_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_ACTIVITY_SCREEN} />
      ) : ACTIVITY_STORE.getError ? (
        <ErrorScreen
          errorMessage={ACTIVITY_STORE.getErrorText}
          fn={() => {
            ACTIVITY_STORE.setErrorText('');
            ACTIVITY_STORE.setError(false);
            ActivityAPI();
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
                  ACTIVITIES
                </Text>
              </View>
            </SafeAreaView>
          </Animated.View>
          <FlatList
            data={ACTIVITY_STORE.getData}
            onScroll={e => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            showsVerticalScrollIndicator={false}
            style={{height: '100%'}}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={ACTIVITY_STORE.getRefreshing}
                colors={[colors.Accent]}
                onRefresh={onRefresh}
                progressViewOffset={verticalScale(50)}
              />
            }
            ListEmptyComponent={
              <Text
                style={{
                  marginTop: '75%',
                  fontSize: scale(16),
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                There are no notifications for you yet
              </Text>
            }
            ListHeaderComponent={
              <View style={{height: verticalScale(HeaderHeight)}}></View>
            }
            bounces={false}
            bouncesZoom={false}
            renderItem={({item}) => {
              return (
                <View>
                  <ActivityCard
                    date={item.createdAt}
                    title={item.title}
                    desc={item.body}
                    imageUrl={
                      item.type === 'event'
                        ? item.imageUrl
                        : API_GET_IMAGE + item.sender_id.profilePic
                    }
                    type={item.type}
                    sender={item.sender_id.name}
                    navigation={navigation}
                    id={item}
                  />
                  <Divider style={{height: verticalScale(1.5)}} />
                </View>
              );
            }}
            numColumns={1}
            keyExtractor={(item, index) => index}
          />
        </SafeAreaView>
      )}
    </View>
  );
});

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
