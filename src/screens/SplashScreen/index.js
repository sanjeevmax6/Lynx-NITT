import React, {useEffect, useState} from 'react';
import {StyleSheet, View, StatusBar, Platform, Linking} from 'react-native';
import * as color from '../../utils/colors';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import splashLottie from '../../res/lottieFiles/splash.json';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import ErrorScreen from '../../components/ErrorScreen';
import CustomAlert from '../../components/customAlert';
import {AUTH_NAV_STORE} from '../../mobx/AUTH_NAV_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';
import {ADMIN, CLUB, STUDENT} from '../../utils/USER_TYPE';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {DEEP_LINKING_STORE} from '../../mobx/DEEP_LINKING_STORE';
import {
  CLUB_REGISTERED,
  CLUB_USER_ID,
  USER_TOKEN,
  USER_TYPE,
} from '../../utils/STORAGE_KEYS';
import {GET_BASE_URL, APP_PLAYSTORE_URL} from '../../utils/API_CONSTANTS';
import {API_STORE} from '../../mobx/API_STORE';
import {
  MAINTENANCE,
  NO_NETWORK,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';
import EncryptedStorage from 'react-native-encrypted-storage';
import DeviceInfo from 'react-native-device-info';
import VersionCheck from 'react-native-version-check';

const logo = require('../../res/images/nitt_logo.png');
const spiderLogo = require('../../res/images/spiderLogo.png');

async function loadCache() {
  try {
    DEEP_LINKING_STORE.setAllow(true);

    const userToken = await EncryptedStorage.getItem(USER_TOKEN);
    const userType = await EncryptedStorage.getItem(USER_TYPE);

    if (userType === null) {
      userType = '';
    }

    if (userType != STUDENT) {
      const userClubId = await EncryptedStorage.getItem(CLUB_USER_ID);
      USER_STORE.setClubId(userClubId);
    }

    USER_STORE.setUserToken(userToken);
    USER_STORE.setUserType(userType);
  } catch (error) {
    USER_STORE.setUserToken(null);
  }
}
const SplashScreen = () => {
  const [State, setState] = useState(0);
  const [API, setAPI] = useState(0);
  //0 Splash
  //1 error
  //2 maintain
  //3 no net
  const [updateVisible, setUpdateVisible] = useState(false);

  const API_CALL = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        axios
          .get(GET_BASE_URL, {}, {timeout: 5000})
          .then(res => {
            if (res.status === 200) {
              console.log('Base URl: ', 'https://nittapp.spider-nitt.org/');
              if (res.data.trim() === 'maintain') {
                setAPI(2);
                return;
              }

              API_STORE.setBaseUrl('https://nittapp.spider-nitt.org/');
              setAPI(200);
            } else {
              setAPI(1);
            }
          })
          .catch(err => {
            setAPI(1);
          });
      } else {
        setAPI(3);
      }
    });
  };

  const checkVersion = () => {
    VersionCheck.needUpdate({
      depth: 4,
    }).then(res => {
      if (res.isNeeded) {
        setUpdateVisible(true);
      }
    });
  };

  useEffect(() => {
    checkVersion();
    API_CALL();
    loadCache();
    ID();
  }, []);

  setTimeout(() => {
    if (API === 200) {
      console.log('called out');
      console.log(updateVisible);
      if (!updateVisible) {
        BOTTOM_NAV_STORE.setTabVisibility(true);
        AUTH_NAV_STORE.setSplashLoading(false);
        return;
      }
    }
    setState(API);
  }, 2000);

  setTimeout(() => {
    if (!updateVisible && State === 200) {
      BOTTOM_NAV_STORE.setTabVisibility(true);
      AUTH_NAV_STORE.setSplashLoading(false);
    }
  }, 100);

  const ID = () => {
    try {
      const str = DeviceInfo.getUniqueId();
      console.log('Android ID: ', str);
      USER_STORE.setUniqueId(str);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor={color.Tertiary}
        hidden={false}
        barStyle="light-content"
      />
      {State === 0 || State === 200 ? (
        <>
          <CustomAlert
            image={require('../../res/images/nitt_logo.png')}
            title={''}
            message={
              'We have made some changes to improve the app performance. Please update your app to the latest version.'
            }
            startDate={''}
            endDate={''}
            modalVisible={State === 200 ? updateVisible : false}
            setModalVisible={setUpdateVisible}
            buttons={[
              {
                text: 'CANCEL',
                func: () => {
                  setUpdateVisible(false);
                  BOTTOM_NAV_STORE.setTabVisibility(true);
                  AUTH_NAV_STORE.setSplashLoading(false);
                },
              },
              {
                text: 'UPDATE',
                func: () => {
                  Linking.openURL(APP_PLAYSTORE_URL);
                  BOTTOM_NAV_STORE.setTabVisibility(true);
                  AUTH_NAV_STORE.setSplashLoading(false);
                },
              },
            ]}
          />
          <LottieView
            style={{backgroundColor: 'white'}}
            source={splashLottie}
            speed={1}
            resizeMode="center"
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
              delay={800}
              animation="fadeIn"></Animatable.Image>
            <Animatable.Text style={styles.text} delay={800} animation="fadeIn">
              NITT APP
            </Animatable.Text>
            <Animatable.Image
              source={spiderLogo}
              style={styles.spider}
              delay={1000}
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
