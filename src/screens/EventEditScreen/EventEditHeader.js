import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

import * as color from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HeaderHeight} from '../../utils/UI_CONSTANTS';
import {EVENT_EDIT_STORE} from '../../mobx/EVENT_EDIT_STORE';
import {EditEventApi} from './EditEventApi';

const EventEditHeader = ({navigation}) => {
  const conditionChecksPass = () => {
    if (
      EVENT_EDIT_STORE.getTitleError === 1 ||
      EVENT_EDIT_STORE.getDescError === 1
    ) {
      return {
        passed: false,
        reason: 'Please fill in all fields',
      };
    } else if (
      EVENT_EDIT_STORE.getTitleError === 2 ||
      EVENT_EDIT_STORE.getDescError === 2
    ) {
      return {
        passed: false,
        reason: 'Character limit exceeded',
      };
    } else if (
      EVENT_EDIT_STORE.getEditStartEvent.getTime() >=
      EVENT_EDIT_STORE.getEditEndEvent.getTime()
    ) {
      return {
        passed: false,
        reason: 'Start Date/Time must be before end Date/Time',
      };
    } else
      return {
        passed: true,
        reason: '',
      };
  };

  return (
    <View style={styles.header}>
      <View style={styles.twoButtonLeft}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              '',
              'Are you sure you want to discard this announcement?',
              [
                {
                  text: 'DISCARD',
                  onPress: () => {
                    EVENT_EDIT_STORE.clearData();
                    navigation.pop();
                  },
                  style: 'cancel',
                },
                {
                  text: 'KEEP EDITING',
                  onPress: () => console.log('OK Pressed'),
                },
              ],
            );
          }}
          style={styles.button}>
          <Icon
            name="close"
            size={HeaderHeight / 1.6}
            color={color.Tertiary}
            style={{marginLeft: scale(5)}}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerText}>Edit Event</Text>
      <View style={styles.twoButtonRight}>
        <TouchableOpacity
          onPress={() => {
            const conditionChecker = conditionChecksPass();
            if (!conditionChecker.passed)
              Alert.alert('', conditionChecker.reason, [
                {
                  text: 'KEEP EDITING',
                },
              ]);
            else {
              EditEventApi();
              //toggleTab(true); To be enabled after implementing save
            }
          }}
          style={styles.button}>
          <Icon
            name="check"
            size={HeaderHeight / 1.6}
            color={color.Green}
            style={{marginRight: scale(5)}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: verticalScale(HeaderHeight),
    shadowColor: color.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 6,
    zIndex: 6,
    backgroundColor: color.WHITE,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonTextTheme: {
    fontSize: 16,
    marginLeft: scale(10),
    color: color.WHITE,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  twoButtonLeft: {},
  twoButtonRight: {},
});

export default EventEditHeader;
