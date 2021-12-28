import React, {useState} from 'react';
import {
  View,
  Text,
  Animated,
  SafeAreaView,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {
  verticalScale,
  moderateScale,
  ScaledSheet,
  scale,
} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import LottieView from 'lottie-react-native';
import lottieFile from '../../res/lottieFiles/loginBackGround.json';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Error from '../../components/Error';
import {studentLogin} from './studentLogin';
import {clubLogin} from './clubLogin';
import {LOGIN_STORE, USER_STORE} from '../../mobx/LOGIN_STORE';
import LoaderPage from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';
import {observer} from 'mobx-react';
import {ACCENT_LOTTIE} from '../../utils/LOADING_TYPES';

//scaling
const height2 = 737.1;
const screenHeight = Dimensions.get('window').height - getStatusBarHeight(true);
export function getHeight(height) {
  return Math.floor((height * screenHeight) / height2);
}

const LoginScreen = observer(({navigation}) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState();
  const [eyeIcon, setEyeIcon] = useState('eye-off');
  const [passwordToggle, setPasswordToggle] = useState(true);

  const onLogin = () => {
    LOGIN_STORE.setErrorText('');

    //checking if user is purely numbers
    if (user != '' && user.match(/^[0-9]+$/) == null) {
      //if not purely numbers then check if '@' is present (of form a@b where len a/b >=1)
      if (!user.slice(user.slice(1, user.length - 1)).includes('@')) {
        LOGIN_STORE.setError(true);
        LOGIN_STORE.setErrorText('Enter Valid UserID/Password');
        return;
      }
      let email = user.trim();
      clubLogin(email, password);
    } else {
      let rollNo = parseInt(user);
      studentLogin(rollNo, password);
    }
  };

  return (
    <>
      {LOGIN_STORE.getLoading ? (
        <>
          <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
        </>
      ) : (
        <>
          {LOGIN_STORE.getError ? (
            <>
              <ErrorScreen
                errorMessage={LOGIN_STORE.getErrorText}
                fn={() => {
                  LOGIN_STORE.setErrorText('');
                  LOGIN_STORE.setError(false);
                }}
              />
            </>
          ) : (
            <>
              <View style={styles.container}>
                {Platform.OS === 'android' ? (
                  <LottieView
                    style={{
                      marginTop: getHeight(180),
                    }}
                    resizeMode="cover"
                    source={lottieFile}
                    progress={1}
                    autoPlay
                    loop
                  />
                ) : (
                  <LottieView
                    style={{
                      marginTop: getHeight(85),
                    }}
                    resizeMode="contain"
                    source={lottieFile}
                    progress={1}
                    autoPlay
                    loop
                  />
                )}
                <View>
                  <SafeAreaView>
                    <ScrollView keyboardShouldPersistTaps="always">
                      <View style={styles.headerTextContainer}>
                        <Text style={styles.loginText}>Login</Text>
                      </View>

                      <View style={{marginBottom: verticalScale(55)}}>
                        <View style={styles.textInput}>
                          <TextInput
                            label="Username"
                            placeholder="Enter your username"
                            mode="outlined"
                            value={user}
                            style={{backgroundColor: 'white'}}
                            theme={{
                              colors: {
                                primary: 'black',
                              },
                            }}
                            onChangeText={user => {
                              setUser(user);
                            }}
                          />
                        </View>
                        <View style={styles.textInput}>
                          <TextInput
                            autoCorrect={false}
                            label="Password"
                            placeholder="Enter your password"
                            style={{backgroundColor: 'white'}}
                            mode="outlined"
                            autoComplete={'off'}
                            autoCapitalize="none"
                            secureTextEntry={passwordToggle}
                            theme={{
                              colors: {
                                primary: 'black',
                              },
                            }}
                            right={
                              <TextInput.Icon
                                name={eyeIcon}
                                onPress={() => {
                                  setPasswordToggle(!passwordToggle);
                                  setEyeIcon(
                                    eyeIcon === 'eye' ? 'eye-off' : 'eye',
                                  );
                                }}
                              />
                            }
                            value={password}
                            onChangeText={password => setPassword(password)}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              navigation.push('Reset');
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: scale(14),

                                marginTop: verticalScale(6),
                              }}>
                              <Text>Forgot Password?</Text>

                              <Text
                                style={{
                                  color: 'darkgreen',
                                  fontWeight: 'bold',
                                }}>
                                {' '}
                                Reset
                              </Text>
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.loginBtnView}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: colors.Tertiary,
                              borderRadius: verticalScale(22),
                            }}
                            onPress={() => {
                              onLogin(user);
                            }}>
                            <Icon
                              name="chevron-right"
                              size={verticalScale(44)}
                              color={colors.WHITE}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ScrollView>
                  </SafeAreaView>
                </View>
              </View>
            </>
          )}
        </>
      )}
    </>
  );
});

const styles = ScaledSheet.create({
  container: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: '20@vs',
    justifyContent: 'space-between',
  },
  loginText: {
    padding: '10@msr',
    fontSize: '25@s',
    fontWeight: 'bold',
    color: 'black',
    marginLeft: '15@s',
    alignContent: 'flex-start',
  },
  textInput: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },
  loginBtnView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

    paddingHorizontal: moderateScale(20),
  },
});

export default LoginScreen;
