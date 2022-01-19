import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform, Text} from 'react-native';
import * as colors from '../../utils/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import {HeaderHeight, HorizontalPadding} from '../../utils/UI_CONSTANTS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IconButton} from 'react-native-paper';
import {useToast} from 'react-native-toast-notifications';
import {USER_STORE} from '../../mobx/USER_STORE';
import {CLUB, STUDENT} from '../../utils/USER_TYPE';
import {EVENT_DESCRIPTION_STORE} from '../../mobx/EVENT_DESCRIPTION_STORE';
import {observer} from 'mobx-react';
import {toggleInterestedApi} from '../../apis/toggleInterested';
import {FEEDS_STORE} from '../../mobx/FEEDS_STORE';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';
import {INTERESTED_EVENTS_PROFILE} from '../../utils/screenNames';
import {getAllStudentDetails} from '../StudentUserScreen/apiCalls';
import {TOAST_ERROR_MESSAGE} from '../../utils/ERROR_MESSAGES';

const EventDescriptionHeader = observer(({navigation, route}) => {
  console.log(EVENT_DESCRIPTION_STORE.getData.club.id);

  const isAuthorized = () => {
    if (
      USER_STORE.getUserType === CLUB &&
      EVENT_DESCRIPTION_STORE.getData &&
      USER_STORE.getClubId === EVENT_DESCRIPTION_STORE.getData.club.id
    ) {
      return true;
    }
    return false;
  };
  const toast = useToast();

  const showToast = (msg = '', success = false) => {
    if (msg === '') toast.show(TOAST_ERROR_MESSAGE, {type: 'danger'});
    else {
      if (!success) toast.show(msg, {type: 'warning'});
      else toast.show(msg, {type: 'success', placement: 'top'});
    }
  };
  const removeEvent = (eventId, urlId) => {
    const events = STUDENT_DETAILS_STORE.getInterests;
    console.log(events);
    var index = events.map(item => item.eventId).indexOf(eventId);
    if (index <= -1) index = events.map(item => item.urlId).indexOf(urlId);
    events.splice(index, 1);
    STUDENT_DETAILS_STORE.setInterests(events);
    console.log(STUDENT_DETAILS_STORE.getInterests);
  };

  useEffect(() => {
    if (!EVENT_DESCRIPTION_STORE.getWasStudentInterested) {
      if (route.params.fromScreen === INTERESTED_EVENTS_PROFILE) {
        route.params.func(true);
      }
    }
  }, []);
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.button}
        disabled={EVENT_DESCRIPTION_STORE.getInterestedApi}
        onPress={() => {
          // EVENT_DESCRIPTION_STORE.setLoading(true);
          EVENT_DESCRIPTION_STORE.reset();
          // navigation.popToTop();
          navigation.pop();
        }}>
        {Platform.OS === 'ios' ? (
          <Icon
            name="arrow-back-ios"
            size={HeaderHeight / 1.6}
            color={colors.Tertiary}
          />
        ) : (
          <Icon
            name="arrow-back"
            size={HeaderHeight / 1.6}
            color={colors.Tertiary}
          />
        )}
      </TouchableOpacity>
      <View style={styles.textView}>
        <Text numberOfLines={1} style={styles.headerText}>
          {EVENT_DESCRIPTION_STORE.getData.Title}
        </Text>
      </View>
      {USER_STORE.getUserType === STUDENT ? (
        <IconButton
          onPress={() => {
            EVENT_DESCRIPTION_STORE.setInterestedApi(true);

            toggleInterestedApi(
              EVENT_DESCRIPTION_STORE.getID,
              () => {
                FEEDS_STORE.setInterested(
                  !EVENT_DESCRIPTION_STORE.getWasStudentInterested,
                  EVENT_DESCRIPTION_STORE.getID,
                );

                EVENT_DESCRIPTION_STORE.setWasStudentInterested(
                  !EVENT_DESCRIPTION_STORE.getWasStudentInterested,
                );
                // feedsAPI(true);
                getAllStudentDetails(true);
                // if (EVENT_DESCRIPTION_STORE.getWasStudentInterested) {
                //   if (route.params.fromScreen === INTERESTED_EVENTS_PROFILE) {
                //     route.params.func(true);
                //   } else if (STUDENT_DETAILS_STORE) {
                //     console.log('Student Detail Store defined');
                //     removeEvent(
                //       EVENT_DESCRIPTION_STORE.getID,
                //       EVENT_DESCRIPTION_STORE.getData.urlId,
                //     );
                //   }
                // }
                // if (!EVENT_DESCRIPTION_STORE.getWasStudentInterested) {
                //   if (route.params.fromScreen === INTERESTED_EVENTS_PROFILE) {
                //     route.params.func(false);
                //   }
                //   showToast(
                //     'You will receive notifications and updates from this event!',
                //     true,
                //   );
                // }

                EVENT_DESCRIPTION_STORE.setInterestedApi(false);
              },
              () => {
                toast.show('Failed to process your request!', {
                  type: 'danger',
                });

                EVENT_DESCRIPTION_STORE.setInterestedApi(false);
              },
            );
          }}
          disabled={EVENT_DESCRIPTION_STORE.getInterestedApi}
          icon={
            EVENT_DESCRIPTION_STORE.getWasStudentInterested
              ? 'star'
              : 'star-outline'
          }
          color={colors.Tertiary}
          style={{...styles.button, elevation: 0}}
        />
      ) : (
        <>
          {isAuthorized() ? (
            <>
              <IconButton
                onPress={() => {
                  navigation.navigate('EventEditScreen');
                }}
                disabled={false}
                icon={'border-color'}
                color={colors.Tertiary}
                style={{
                  ...styles.button,
                  elevation: 0,
                }}
              />
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: verticalScale(HeaderHeight + 2),
    shadowColor: colors.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 6,
    zIndex: 6,
    paddingBottom: verticalScale(2),
    paddingHorizontal: scale(HorizontalPadding),
    justifyContent: 'space-between',
  },
  textView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: scale(16),
    fontWeight: 'bold',
    width: '65%',
    textAlign: 'center',
    color: colors.HeaderText,
  },
  button: {
    justifyContent: 'center',
    elevation: 1,
    zIndex: 1,
  },
});

export default EventDescriptionHeader;
