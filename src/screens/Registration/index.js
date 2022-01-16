import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  BackHandler,
} from 'react-native';
import {verticalScale, ScaledSheet} from 'react-native-size-matters';
import {useFocusEffect} from '@react-navigation/native';
import Name from './Name';
import DOB from './DOB';
import Documents from './Documents';
import ProfilePic from './ProfilePic';
import ResetPassword from './ResetPassword';

import * as colors from '../../utils/colors';

import {studentRegisterAPI} from './studentRegisterAPI';
import {reg_token} from '../../utils/API_CONSTANTS';

import {observer} from 'mobx-react';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
import LoaderPage from '../../components/LoadingScreen';
import {ACCENT_LOTTIE} from '../../utils/LOADING_TYPES';
import ErrorScreen from '../../components/ErrorScreen';
import SuccessScreen from '../../components/SuccessScreen';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_STORE} from '../../mobx/USER_STORE';
import {USER_TOKEN, USER_TYPE} from '../../utils/STORAGE_KEYS';
import {STUDENT} from '../../utils/USER_TYPE';

const WIDTH = Dimensions.get('window').width;

const Registration = observer(({navigation}) => {
  const scrollview = useRef(null);
  const [title, setTitle] = useState('Basic Information');
  const [subtitle, setSubTitle] = useState('Enter your name and department');
  const [page, setPage] = useState(0);

  const changeText = (title, stitle, page) => {
    setTitle(title);
    setSubTitle(stitle);
    setPage(page);
  };

  const handleAPICALL = () => {
    // setErrorText(null);
    const formData = new FormData();
    formData.append(
      'first_name',
      STUDENT_REGISTRATION_STORE.getFirstName.trim(),
    );
    formData.append('last_name', STUDENT_REGISTRATION_STORE.getLastName.trim());
    formData.append(
      'department',
      STUDENT_REGISTRATION_STORE.getDepartment.trim(),
    );
    formData.append(
      'new_password',
      STUDENT_REGISTRATION_STORE.getPassword.trim(),
    );
    formData.append(
      'confirm_password',
      STUDENT_REGISTRATION_STORE.getConfirmPassword.trim(),
    );
    formData.append('dob', '' + STUDENT_REGISTRATION_STORE.getBirthDay);
    formData.append('address', STUDENT_REGISTRATION_STORE.getAddress.trim());
    formData.append('aadhar_no', STUDENT_REGISTRATION_STORE.getAadhar.trim());
    formData.append('profileImg', {
      uri: STUDENT_REGISTRATION_STORE.getPicture.uri,
      type: STUDENT_REGISTRATION_STORE.getPicture.type,
      name: STUDENT_REGISTRATION_STORE.getPicture.name,
    });

    formData.append('reg_token', reg_token);
    formData.append(
      'countryCode',
      '+' + STUDENT_REGISTRATION_STORE.getCountryCode,
    );
    formData.append(
      'mobile_no',
      STUDENT_REGISTRATION_STORE.getMobileNumber.trim(),
    );
    formData.append('gender', STUDENT_REGISTRATION_STORE.getGender.trim());
    formData.append(
      'nationality',
      STUDENT_REGISTRATION_STORE.getNationality.trim(),
    );
    studentRegisterAPI(formData);
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (page == 0) {
          BackHandler.exitApp();
          return false;
        }
        setPage(page - 1);
        if (scrollview.current !== null) {
          scrollview.current.scrollTo({
            x: WIDTH * (page - 1),
            animated: true,
          });
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }),
  );

  return (
    <>
      {STUDENT_REGISTRATION_STORE.getApiCall ? (
        <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
      ) : (
        <>
          {STUDENT_REGISTRATION_STORE.getApiError ? (
            <ErrorScreen
              errorMessage={STUDENT_REGISTRATION_STORE.getApiErrorText}
              fn={() => {
                if (STUDENT_REGISTRATION_STORE.getApiErrorText === NO_NETWORK) {
                  handleAPICALL();
                } else {
                  STUDENT_REGISTRATION_STORE.setApiCall(false);
                  STUDENT_REGISTRATION_STORE.setApiErrorText('');
                  STUDENT_REGISTRATION_STORE.setApiError(false);
                }
              }}
            />
          ) : (
            <>
              {STUDENT_REGISTRATION_STORE.getApiSuccess ? (
                <SuccessScreen
                  fn={() => {
                    USER_STORE.setUserType(STUDENT);
                    AsyncStorage.setItem(
                      USER_TOKEN,
                      STUDENT_REGISTRATION_STORE.getApiResponse.data.token,
                    );
                    AsyncStorage.setItem(USER_TYPE, STUDENT); //stored items should be string

                    USER_STORE.setUserToken(
                      STUDENT_REGISTRATION_STORE.getApiResponse.data.token,
                    );
                    USER_STORE.setUserRegToken(null);
                    STUDENT_REGISTRATION_STORE.reset();
                  }}
                />
              ) : (
                <>
                  <SafeAreaView style={styles.container}>
                    <Text style={styles.header}>Registration</Text>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                    <ScrollView
                      ref={scrollview}
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      keyboardShouldPersistTaps="always"
                      style={{width: WIDTH, marginTop: verticalScale(20)}}
                      scrollEnabled={false}>
                      <Name scrollViewRef={scrollview} callback={changeText} />
                      <DOB scrollViewRef={scrollview} callback={changeText} />
                      <Documents
                        scrollViewRef={scrollview}
                        callback={changeText}
                      />
                      <ProfilePic
                        scrollViewRef={scrollview}
                        callback={changeText}
                      />
                      <ResetPassword
                        scrollViewRef={scrollview}
                        callback={changeText}
                        handleAPICALL={handleAPICALL}
                      />
                    </ScrollView>
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

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.regBackground,
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },
  header: {
    fontSize: '18@s',
    color: colors.FontColor,
    fontWeight: 'bold',
    marginTop: '40@vs',
  },
  title: {
    fontSize: '18@s',
    color: colors.FontColor,
    fontWeight: '500',
    marginTop: '10@vs',
  },
  subtitle: {
    fontSize: '12@s',
    color: '#555555',
    marginTop: '5@vs',
    textAlign: 'center',
  },
  input: {
    width: '100%',
  },
});

export default Registration;
