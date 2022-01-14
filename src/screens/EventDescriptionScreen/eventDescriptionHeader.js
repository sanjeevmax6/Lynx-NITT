import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import * as colors from '../../utils/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import {HeaderHeight, HorizontalPadding} from '../../utils/UI_CONSTANTS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IconButton} from 'react-native-paper';

import {USER_STORE} from '../../mobx/USER_STORE';
import {CLUB, STUDENT} from '../../utils/USER_TYPE';
import {EVENT_DESCRIPTION_STORE} from '../../mobx/EVENT_DESCRIPTION_STORE';
import {observer} from 'mobx-react';
import {toggleInterestedApi} from '../../apis/toggleInterested';

const EventDescriptionHeader = observer(({navigation}) => {
  const [Api, setApi] = useState(false);
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

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // EVENT_DESCRIPTION_STORE.setLoading(true);
          navigation.goBack();
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
      {USER_STORE.getUserType === STUDENT ? (
        <IconButton
          onPress={() => {
            setApi(true);
            toggleInterestedApi(
              EVENT_DESCRIPTION_STORE.getID,
              () => {
                EVENT_DESCRIPTION_STORE.setWasStudentInterested(
                  !EVENT_DESCRIPTION_STORE.getWasStudentInterested,
                );
                setApi(false);
              },
              () => {
                setApi(false);
              },
            );
          }}
          disabled={Api}
          icon={
            EVENT_DESCRIPTION_STORE.getWasStudentInterested
              ? 'bookmark'
              : 'bookmark-outline'
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
