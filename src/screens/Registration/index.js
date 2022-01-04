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

const WIDTH = Dimensions.get('window').width;

const Registration = observer(({navigation}) => {
  const scrollview = useRef(null);
  const [title, setTitle] = useState('Basic Information');
  const [subtitle, setSubTitle] = useState('Enter your name and department');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState();

  const resetPasswordStates = {
    loading,
    setLoading,
    errorText,
    setErrorText,
  };

  const changeText = (title, stitle, page) => {
    setTitle(title);
    setSubTitle(stitle);
    setPage(page);
  };

  const handleAPICALL = () => {
    setErrorText(null);
    const formData = new FormData();
    formData.append('first_name', STUDENT_REGISTRATION_STORE.getFirstName);
    formData.append('last_name', STUDENT_REGISTRATION_STORE.getLastName);
    formData.append('department', STUDENT_REGISTRATION_STORE.getDepartment);
    formData.append('new_password', STUDENT_REGISTRATION_STORE.getPassword);
    formData.append(
      'confirm_password',
      STUDENT_REGISTRATION_STORE.getConfirmPassword,
    );
    formData.append(
      'dob',
      STUDENT_REGISTRATION_STORE.getBirthYear +
        '-' +
        STUDENT_REGISTRATION_STORE.getBirthMonth +
        '-' +
        STUDENT_REGISTRATION_STORE.getBirthDay +
        'T00:00:00.000Z',
    );
    formData.append('address', STUDENT_REGISTRATION_STORE.getAddress);
    formData.append('aadhar_no', STUDENT_REGISTRATION_STORE.getAadhar);
    formData.append('profileImg', STUDENT_REGISTRATION_STORE.getPicture);
    formData.append('passportImg', STUDENT_REGISTRATION_STORE.getPassport);
    formData.append('reg_token', reg_token);
    formData.append('mobile_no', STUDENT_REGISTRATION_STORE.getMobileNumber);
    studentRegisterAPI(formData, setLoading, setErrorText);
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Registration</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <ScrollView
        ref={scrollview}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{width: WIDTH, marginTop: verticalScale(20)}}
        scrollEnabled={false}>
        <Name scrollViewRef={scrollview} callback={changeText} />
        <DOB scrollViewRef={scrollview} callback={changeText} />
        <Documents scrollViewRef={scrollview} callback={changeText} />
        <ProfilePic scrollViewRef={scrollview} callback={changeText} />
        <ResetPassword
          scrollViewRef={scrollview}
          navigation={navigation}
          callback={changeText}
          handleAPICALL={handleAPICALL}
          resetPasswordStates={resetPasswordStates}
        />
      </ScrollView>
    </SafeAreaView>
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
