import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  BackHandler,
  ScrollView,
} from 'react-native';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';

import EditProfileInputs from './EditProfileInputs';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import EditProfileScreenHeader from './EditProfileScreenHeader';
import {EditProfileAPI} from './EditProfileAPI';
import StudentPhoto from './StudentPhoto';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';

import {STUDENT_EDIT_PROFILE_STORE} from '../../mobx/STUDENT_EDIT_PROFILE_STORE';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';
import LoaderPage from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';
import SuccessScreen from '../../components/SuccessScreen';
import {ACCENT_LOTTIE} from '../../utils/LOADING_TYPES';
import {observer} from 'mobx-react';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';
import CustomAlert from '../../components/customAlert';
import {CLUB_USER_STORE} from '../../mobx/CLUB_USER_STORE';

const PopulateData = () => {
  console.log('Pop');
  STUDENT_EDIT_PROFILE_STORE.setFirstName(STUDENT_DETAILS_STORE.getFirstName);
  STUDENT_EDIT_PROFILE_STORE.setLastName(STUDENT_DETAILS_STORE.getLastName);
  STUDENT_EDIT_PROFILE_STORE.setDOB(new Date(STUDENT_DETAILS_STORE.getDob));
  STUDENT_EDIT_PROFILE_STORE.setAddress(STUDENT_DETAILS_STORE.getAddress);
  STUDENT_EDIT_PROFILE_STORE.setMobile(STUDENT_DETAILS_STORE.getMobileNo);
  STUDENT_EDIT_PROFILE_STORE.setAadhar(STUDENT_DETAILS_STORE.getAadhar);
  if (STUDENT_DETAILS_STORE.getProfilePic === '') {
    STUDENT_EDIT_PROFILE_STORE.setPic(STUDENT_DETAILS_STORE.getProfilePic);
  } else {
    STUDENT_EDIT_PROFILE_STORE.setPic(
      API_GET_IMAGE + STUDENT_DETAILS_STORE.getProfilePic,
    );
  }
};

const handleApiCall = () => {
  STUDENT_EDIT_PROFILE_STORE.setErrorText(null);

  const formData = new FormData();
  formData.append('first_name', STUDENT_EDIT_PROFILE_STORE.getFirstName);
  formData.append('last_name', STUDENT_EDIT_PROFILE_STORE.getLastName);
  formData.append('department', STUDENT_EDIT_PROFILE_STORE.getDepartment);
  formData.append('address', STUDENT_EDIT_PROFILE_STORE.getAddress);
  formData.append('aadhar_no', STUDENT_EDIT_PROFILE_STORE.getAadhar);

  formData.append('mobile_no', STUDENT_EDIT_PROFILE_STORE.getMobile);
  formData.append('dob', STUDENT_EDIT_PROFILE_STORE.getDOB.toString());
  if (
    STUDENT_EDIT_PROFILE_STORE.getPic ===
    API_GET_IMAGE + STUDENT_DETAILS_STORE.getProfilePic
  ) {
    console.log('Not updating profile Pic');
    formData.append('profileImg', '');
  } else {
    console.log('Updating profile Pic');
    console.log(
      STUDENT_EDIT_PROFILE_STORE.getPic,
      STUDENT_DETAILS_STORE.getProfilePic,
    );
    formData.append('profileImg', {
      uri: STUDENT_EDIT_PROFILE_STORE.getImage.uri,
      type: STUDENT_EDIT_PROFILE_STORE.getImage.type,
      name: STUDENT_EDIT_PROFILE_STORE.getImage.name,
    });
  }

  EditProfileAPI(formData);
};

const EditProfileScreen = observer(({navigation}) => {
  function toggleTab(tabShow) {
    BOTTOM_NAV_STORE.setTabVisibility(tabShow);
  }

  useEffect(() => {
    PopulateData();
    toggleTab(false);
    const backPress = BackHandler.addEventListener('backPress', onBackPress);

    return () => {
      backPress.remove();
    };
  }, []);

  const [modalTitle, setModalTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState({});

  const onBackPress = () => {
    setModalTitle('Confirmation');
    setModalMessage('Are you sure you want to discard unsaved changes?');
    setModalButtons([
      {
        text: 'DISCARD',
        func: () => {
          toggleTab(true);
          navigation.goBack();
        },
      },
      {
        text: 'KEEP EDITING',
        func: () => console.log('OK Pressed'),
      },
    ]);
    setModalVisible(true);
    return true;
  };

  return (
    <>
      {STUDENT_EDIT_PROFILE_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
      ) : (
        <>
          {STUDENT_EDIT_PROFILE_STORE.getError ? (
            <ErrorScreen
              errorMessage={STUDENT_EDIT_PROFILE_STORE.getErrorText}
              fn={() => {
                if (STUDENT_EDIT_PROFILE_STORE.getErrorText === NO_NETWORK) {
                  handleApiCall();
                } else {
                  STUDENT_EDIT_PROFILE_STORE.setErrorText('');
                  STUDENT_EDIT_PROFILE_STORE.setError(false);
                }
              }}
            />
          ) : (
            <>
              {STUDENT_EDIT_PROFILE_STORE.getSuccess ? (
                <SuccessScreen
                  fn={() => {
                    STUDENT_EDIT_PROFILE_STORE.setSuccess(false);
                    CLUB_USER_STORE.setRefresh(true);
                    navigation.pop();
                  }}
                />
              ) : (
                <>
                  <SafeAreaView style={styles.container}>
                    <CustomAlert
                      title={modalTitle}
                      message={modalMessage}
                      startDate={''}
                      endDate={''}
                      modalVisible={modalVisible}
                      setModalVisible={setModalVisible}
                      buttons={modalButtons}
                    />
                    <EditProfileScreenHeader
                      navigation={navigation}
                      isValid={
                        STUDENT_EDIT_PROFILE_STORE.getAddress.length >= 0 &&
                        STUDENT_EDIT_PROFILE_STORE.getFirstName.length > 0
                      }
                      handleApiCall={handleApiCall}
                    />
                    <>
                      <ScrollView>
                        <StudentPhoto />
                        <EditProfileInputs />
                        <View style={{height: verticalScale(20)}} />
                      </ScrollView>
                    </>
                  </SafeAreaView>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.Secondary,
  },
  viewScale: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(5),
  },
  divider: {
    height: verticalScale(2),
    backgroundColor: colors.GRAY_MEDIUM,
  },
  buttonViewTheme: {
    fontSize: 16,
    padding: moderateScale(8),
    backgroundColor: colors.CreationScreen_Button,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextTheme: {
    fontSize: 16,
    marginLeft: scale(10),
    color: colors.CreationScreen_ButtonText,
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: verticalScale(5),
  },
  twoButtonContainer: {
    flexDirection: 'row',
  },
  twoButtonLeft: {
    flex: 1,
    paddingRight: scale(5),
    paddingLeft: scale(20),
    paddingVertical: verticalScale(5),
  },
  twoButtonRight: {
    flex: 1,
    paddingRight: scale(20),
    paddingLeft: scale(5),
    paddingVertical: verticalScale(5),
  },
  uploadButton: {
    backgroundColor: colors.Tertiary,
    borderRadius: moderateScale(6),
    marginVertical: verticalScale(9),
    marginHorizontal: HorizontalPadding,
  },
});

export default EditProfileScreen;
