import React, {useEffect} from 'react';
import {StyleSheet, View, StatusBar, Platform} from 'react-native';
import * as color from '../../utils/colors';
import * as Animatable from 'react-native-animatable';

import {useDispatch} from 'react-redux';

import {updateIsStudent, updateToken} from '../../redux/reducers/loginScreen';
import LottieView from 'lottie-react-native';
import splashLottie from '../../res/lottieFiles/splash.json';

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {TabVisibility} from '../../redux/reducers/bottomNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEY_IS_STUDENT, KEY_USER_TOKEN} from '../../utils/API_CONSTANTS';
import {AUTH_NAV_STORE} from '../../mobx/AUTH_NAV_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';

const SplashScreen = () => {
  const dispatch = useDispatch();
  function onEndNavigate() {
    dispatch(TabVisibility(true));
    AUTH_NAV_STORE.setSplashLoading(false);
  }
  const getToken = () => {
    AsyncStorage.getItem(KEY_IS_STUDENT).then(value => {
      if (value != null) {
        if (value == 'true') dispatch(updateIsStudent(true));
        else if (value == 'false') dispatch(updateIsStudent(false));
      } else dispatch(updateToken(null));
    });
    AsyncStorage.getItem(KEY_USER_TOKEN).then(value => {
      if (value != null) {
        dispatch(updateToken(value));
        USER_STORE.setUserToken(value);
      } else {
        dispatch(updateToken(null));
      }
    });
  };

  let logo = require('../../res/images/nitt_logo.png');
  let spiderLogo = require('../../res/images/spiderLogo.png');
  useEffect(() => {
    getToken();
  });

  setTimeout(() => {
    onEndNavigate();
  }, 3000);
  return (
    <>
      <StatusBar
        backgroundColor={color.Tertiary}
        hidden={false}
        barStyle="light-content"
      />
      <LottieView
        style={{height: '108%', backgroundColor: 'white'}}
        source={splashLottie}
        speed={0.78}
        resizeMode="cover"
        autoPlay
        width={500}
        loop={false}
      />
      <View
        style={{
          position: 'absolute',
          top: verticalScale(-55),
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animatable.Image
          source={logo}
          style={styles.image}
          delay={1500}
          animation="fadeIn"></Animatable.Image>
        <Animatable.Text style={styles.text} delay={1800} animation="fadeIn">
          NIT-T APP
        </Animatable.Text>
        <Animatable.Image
          source={spiderLogo}
          style={styles.spider}
          delay={2000}
          animation="fadeIn"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: color.spashScreenBackground,
    alignItems: 'center',
  },
  text: {
    fontSize: scale(24),
    margin: moderateScale(15),
    lineHeight: verticalScale(30),
    color: color.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'normal',
  },
  image: {
    width: moderateScale(180),
    height: moderateScale(180),
  },
  spider: {
    height: scale(50),
    width: scale(100),
    position: 'absolute',
    bottom: scale(24),
  },
});

export default SplashScreen;
