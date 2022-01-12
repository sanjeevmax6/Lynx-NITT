import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as colors from '../../utils/colors';
import {scale} from 'react-native-size-matters';
import {HorizontalPadding, ICON_SIZE_LARGE} from '../../utils/UI_CONSTANTS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_STORE} from '../../mobx/USER_STORE';
import {CLUB_USER_ID, USER_TOKEN, USER_TYPE} from '../../utils/STORAGE_KEYS';
import {FEEDS_STORE} from '../../mobx/FEEDS_STORE';
import {LogOutHandler} from '../../utils/helperFunction/logOutHandler';

const ModalContent = ({ModalVisible, navigation}) => {
  const HandleLogout = () => {
    Alert.alert(
      'Logout?',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('LOGOUT');
            LogOutHandler();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={{flex: 1, width: '100%'}}>
      <TouchableOpacity onPress={() => ModalVisible(false)}>
        <Icon
          name="keyboard-arrow-down"
          color={colors.EventCard_ShareIcon}
          size={scale(ICON_SIZE_LARGE)}
          style={{
            alignSelf: 'center',
            paddingRight: scale(0),
            // backgroundColor: 'red',
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          {
            navigation.navigate('Settings');
            ModalVisible(false);
          }
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: scale(10),
            paddingTop: 0,
            paddingLeft: scale(HorizontalPadding),
          }}>
          <Icon
            name="settings"
            color={colors.EventCard_ShareIcon}
            size={scale(ICON_SIZE_LARGE)}
            style={{alignSelf: 'flex-end', paddingRight: scale(6)}}
          />
          <Text style={{flex: 1, alignSelf: 'center', fontSize: scale(14)}}>
            Settings
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          {
            navigation.navigate('EditProfile');
            ModalVisible(false);
          }
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: scale(HorizontalPadding),
            padding: scale(10),
          }}>
          <Icon
            name="edit"
            color={colors.EventCard_ShareIcon}
            size={scale(ICON_SIZE_LARGE)}
            style={{alignSelf: 'flex-end', paddingRight: scale(6)}}
          />
          <Text style={{flex: 1, alignSelf: 'center', fontSize: scale(14)}}>
            Edit Profile
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.push('FeedBackScreen');
          ModalVisible(false);
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: scale(HorizontalPadding),
            padding: scale(10),
          }}>
          <Icon
            name="rate-review"
            color={colors.EventCard_ShareIcon}
            size={scale(ICON_SIZE_LARGE)}
            style={{alignSelf: 'flex-end', paddingRight: scale(6)}}
          />
          <Text style={{flex: 1, alignSelf: 'center', fontSize: scale(14)}}>
            Send Feedback
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={HandleLogout}>
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: scale(HorizontalPadding),
            padding: scale(10),
          }}>
          <Icon
            name="logout"
            color={colors.EventCard_ShareIcon}
            size={scale(ICON_SIZE_LARGE)}
            style={{alignSelf: 'flex-end', paddingRight: scale(6)}}
          />
          <Text style={{flex: 1, alignSelf: 'center', fontSize: scale(14)}}>
            Log Out
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ModalContent;
