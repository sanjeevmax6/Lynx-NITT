import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

import * as color from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HeaderHeight} from '../../utils/UI_CONSTANTS';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {clearData} from './createAnnouncementApi';
const AnnouncementCreationScreenHeader = ({
  navigation,
  validLength,
  createAnnouncement,
}) => {
  //const dispatch = useDispatch();

  function toggleTab(tabShow) {
    BOTTOM_NAV_STORE.setTabVisibility(tabShow);
  }

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
                    clearData();
                    toggleTab(true);
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
      <Text style={styles.headerText}>Create Announcement</Text>
      <View style={styles.twoButtonRight}>
        <TouchableOpacity
          onPress={() => {
            console.log('Create pressed');
            if (!validLength)
              Alert.alert('', 'The text entered exceeds the maximum length', [
                {
                  text: 'KEEP EDITING',
                  onPress: () => console.log('OK Pressed'),
                },
              ]);
            else {
              createAnnouncement();
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

export default AnnouncementCreationScreenHeader;
