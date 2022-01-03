import React, {useEffect, useState} from 'react';
import {StyleSheet, View, StatusBar, Platform} from 'react-native';
import * as color from '../../utils/colors';
import * as Animatable from 'react-native-animatable';

import LottieView from 'lottie-react-native';
import splashLottie from '../../res/lottieFiles/splash.json';

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import ErrorScreen from '../../components/ErrorScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_NAV_STORE} from '../../mobx/AUTH_NAV_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';
import {ADMIN, CLUB, STUDENT} from '../../utils/USER_TYPE';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {USER_TOKEN, USER_TYPE} from '../../utils/STORAGE_KEYS';
import {GET_BASE_URL} from '../../utils/API_CONSTANTS';
import {API_STORE} from '../../mobx/API_STORE';
import {
  MAINTENANCE,
  NO_NETWORK,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';

const logo = require('../../res/images/nitt_logo.png');
const spiderLogo = require('../../res/images/spiderLogo.png');

const SplashScreen = () => {
  const [State, setState] = useState(0);
  const [API, setAPI] = useState(-3);

  const getToken = () => {
    AsyncStorage.getItem(USER_TYPE).then(value => {
      if (value != null) {
        if (value == STUDENT) USER_STORE.setUserType(STUDENT);
        else if (value == CLUB) USER_STORE.setUserType(CLUB);
        else if (value == ADMIN) USER_STORE.setUserType(ADMIN);
      } else USER_STORE.setUserType(null);
    });
    AsyncStorage.getItem(USER_TOKEN).then(value => {
      if (value != null) {
        USER_STORE.setUserToken(value);
      } else {
        USER_STORE.setUserToken(null);
      }
    });
  };

  const API_CALL = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        axios
          .get(GET_BASE_URL, {}, {timeout: 5000})
          .then(res => {
            console.log(res.data);

            if (res.data.trim() === 'maintain') {
              setAPI(-1);
              return;
            }

            API_STORE.setBaseUrl(res.data.trim());
            setAPI(1);
          })
          .catch(err => {
            setAPI(100);
          });
      } else {
        setAPI(2);
      }
    });
  };

  useEffect(() => {
    API_CALL();
    getToken();
  });

  setTimeout(() => {
    if (API === -1) {
      setState(2);
    } else if (API === 2) {
      setState(3);
    } else if (API === 1) {
      BOTTOM_NAV_STORE.setTabVisibility(true);
      AUTH_NAV_STORE.setSplashLoading(false);
    } else {
      setState(4);
    }
  }, 2000);

  return (
    <>
      <StatusBar
        backgroundColor={color.Tertiary}
        hidden={false}
        barStyle="light-content"
      />
      {State === 0 ? (
        <>
          <LottieView
            style={{height: '108%', backgroundColor: 'white'}}
            source={splashLottie}
            speed={1.5}
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
              delay={1000}
              animation="fadeIn"></Animatable.Image>
            <Animatable.Text
              style={styles.text}
              delay={1000}
              animation="fadeIn">
              NIT-T APP
            </Animatable.Text>
            <Animatable.Image
              source={spiderLogo}
              style={styles.spider}
              delay={1200}
              animation="fadeIn"
            />
          </View>
        </>
      ) : (
        <>
          {State === 2 ? (
            <>
              <ErrorScreen
                errorMessage={MAINTENANCE}
                lottieFileName="maintenanceLottie"
                showButton={false}
              />
            </>
          ) : (
            <>
              {State === 3 ? (
                <>
                  <ErrorScreen
                    errorMessage={NO_NETWORK}
                    fn={() => {
                      API_CALL();
                    }}
                  />
                </>
              ) : (
                <>
                  <ErrorScreen
                    errorMessage={UNEXPECTED_ERROR}
                    fn={() => {
                      API_CALL();
                    }}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
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
