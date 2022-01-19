import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as colors from '../../utils/colors';
import {scale} from 'react-native-size-matters';
import {HorizontalPadding, ICON_SIZE_LARGE} from '../../utils/UI_CONSTANTS';
import {STUDENT} from '../../utils/USER_TYPE';
import {USER_STORE} from '../../mobx/USER_STORE';
import {LogOutHandler} from '../../utils/helperFunction/logOutHandler';
import CustomAlert from '../../components/customAlert';

const ModalContent = ({ModalVisible, navigation}) => {
  const HandleLogout = () => {
    setModalTitle('Logout?');
    setModalMessage('You will return to login screen');
    setModalButtons([
      {
        text: 'NO',
        func: () => {},
      },
      {
        text: 'YES',
        func: () => LogOutHandler(),
      },
    ]);
    setModalVisible(true);
  };
  const [modalTitle, setModalTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState({});

  return (
    <View style={{flex: 1}}>
      <CustomAlert
        title={modalTitle}
        message={modalMessage}
        startDate={''}
        endDate={''}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        buttons={modalButtons}
      />
      <TouchableOpacity onPress={() => ModalVisible(false)}>
        <Icon
          name="close"
          color={colors.EventCard_ShareIcon}
          size={scale(ICON_SIZE_LARGE)}
          style={{
            alignSelf: 'flex-end',
            marginTop: scale(6),
            marginRight: scale(6),
          }}
        />
      </TouchableOpacity>
      {USER_STORE.getUserType === STUDENT ? (
        <TouchableOpacity
          onPress={() => {
            {
              navigation.navigate('Settings', {navigation});
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
      ) : null}

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
