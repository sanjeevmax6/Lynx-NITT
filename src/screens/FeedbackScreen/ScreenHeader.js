import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HeaderHeight} from '../../utils/UI_CONSTANTS';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';
import {getAllStudentDetails} from '../StudentUserScreen/apiCalls';
import {CHECK_VALUES_ENTERED} from '../../utils/ERROR_MESSAGES';
import {FEEDBACK_STORE} from '../../mobx/FEEDBACK_STORE';
import CustomAlert from '../../components/customAlert';

const ScreenHeader = ({navigation, isValid, handleApiCall}) => {
  const [modalTitle, setModalTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState({});
  return (
    <View style={styles.header}>
      <CustomAlert
        title={modalTitle}
        message={modalMessage}
        startDate={''}
        endDate={''}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        buttons={modalButtons}
      />
      <View style={styles.twoButtonLeft}>
        <TouchableOpacity
          onPress={() => {
            setModalTitle('Confirmation');
            setModalMessage('Are you sure you want to discard the feedback?');
            setModalButtons([
              {
                text: 'DISCARD',
                func: () => {
                  FEEDBACK_STORE.reset();
                  navigation.pop();
                },
              },
              {
                text: 'KEEP EDITING',
                func: () => console.log('OK Pressed'),
              },
            ]);
            setModalVisible(true);
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
      <Text style={styles.headerText}>Announcement</Text>
      <View style={styles.twoButtonRight}>
        <TouchableOpacity
          onPress={() => {
            if (!isValid) {
              setModalTitle('Verification');
              setModalMessage(CHECK_VALUES_ENTERED);
              setModalButtons([
                {
                  text: 'KEEP EDITING',
                  func: () => console.log('OK Pressed'),
                },
              ]);
              setModalVisible(true);
            } else {
              //toggleTab(true); To be enabled after implementing save
              setModalTitle('Verification');
              setModalMessage('Submit Feedback?');
              setModalButtons([
                {
                  text: 'KEEP EDITING',
                  func: () => console.log('OK Pressed'),
                },
                {
                  text: 'YES',
                  func: () => handleApiCall(),
                },
              ]);
              setModalVisible(true);
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
    backgroundColor: color.headerBackground,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    alignSelf: 'center',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  twoButtonLeft: {},
  twoButtonRight: {},
});

export default ScreenHeader;
