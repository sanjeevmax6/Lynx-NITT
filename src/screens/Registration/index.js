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

const WIDTH = Dimensions.get('window').width;

const Registration = ({navigation}) => {
  const scrollview = useRef(null);
  const [title, setTitle] = useState('Basic Information');
  const [subtitle, setSubTitle] = useState('Enter your name and department');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState();
  //data
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [address, setAddress] = useState('');

  const [aadhar, setAadhar] = useState('');
  const [passport, setPassport] = useState(null);

  const [pic, setPic] = useState(null);

  const [password, setPassword] = useState();
  const [cpassword, setCPassword] = useState();

  const [dept, setDept] = useState();

  const nameStates = {
    firstname,
    setFirstName,
    lastname,
    setLastName,
    dept,
    setDept,
  };

  const dobStates = {
    day,
    setDay,
    month,
    setMonth,
    year,
    setYear,
    address,
    setAddress,
  };

  const docStates = {
    aadhar,
    setAadhar,
    passport,
    setPassport,
  };
  const profilePicStates = {
    pic,
    setPic,
  };
  const resetPasswordStates = {
    password,
    setPassword,
    cpassword,
    setCPassword,
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
    formData.append('first_name', firstname);
    formData.append('last_name', lastname);
    formData.append('department', dept);
    formData.append('new_password', password);
    formData.append('confirm_password', cpassword);
    formData.append('dob', year + '-' + month + '-' + day + 'T00:00:00.000Z');
    formData.append('address', address);
    formData.append('aadhar_no', aadhar);
    formData.append('profileImg', pic);
    formData.append('passportImg', passport);
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
        <Name
          scrollViewRef={scrollview}
          callback={changeText}
          nameStates={nameStates}
        />
        <DOB
          scrollViewRef={scrollview}
          callback={changeText}
          dobStates={dobStates}
        />
        <Documents
          scrollViewRef={scrollview}
          callback={changeText}
          docStates={docStates}
        />
        <ProfilePic
          scrollViewRef={scrollview}
          callback={changeText}
          profilePicStates={profilePicStates}
        />
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
};

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
