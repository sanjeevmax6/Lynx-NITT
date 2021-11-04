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
import {
  updateToken,
  updateRegisterToken,
} from '../../redux/reducers/loginScreen';
import {useDispatch, useSelector} from 'react-redux';
import * as colors from '../../utils/colors';
import store from '../../redux/store';
import LottieView from 'lottie-react-native';
import lottieFile from '../../res/lottieFiles/loginBackGround.json';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Error from '../../components/Error';
import {API_STUDENT_LOGIN} from '../../utils/API_CONSTANTS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

//scaling
const height2 = 737.1;
const screenHeight = Dimensions.get('window').height - getStatusBarHeight(true);
export function getHeight(height) {
  return Math.floor((height * screenHeight) / height2);
}

const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [eyeIcon, setEyeIcon] = useState('eye-off');
  const [passwordToggle, setPasswordToggle] = useState(true);
  const [temp, setTemp] = useState();
  const [loading, setLoading] = useState();
  const [errorText, setErrorText] = useState(null);
  const dispatch = useDispatch();

  const onLogin = token => {
    // console.log(token);
    // if (token) {
    //   dispatch(updateToken());
    // }

    setErrorText(null);

    if (user == '' || password == '') {
      setErrorText('Enter Valid Username/Password');
    } else {
      let rollNo = parseInt(user);

      NetInfo.fetch().then(state => {
        console.log(state.isConnected);
        if (state.isConnected == true) {
          setLoading(true);
          fetch(API_STUDENT_LOGIN, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              rollNo,
              password,
            }),
          })
            .then(response => response.json())
            .then(responseData => {
              setLoading(false);
              //console.log('response DATA ' + JSON.stringify(responseData));
              if (responseData.message == 'Success') {
                if (responseData.userExists) {
                  AsyncStorage.setItem('user_token', responseData.token);
                  setTemp(store.getState().logScreen.login.userToken);
                  //console.log('Temp: ' + temp);
                  dispatch(updateToken(responseData.token));
                } else {
                  dispatch(updateRegisterToken(responseData.token));
                }
              } else {
                setErrorText(responseData.message);
              }
            })
            .catch(error => {
              console.log(error);
              setLoading(false);
              setErrorText('Server Error');
            });
        } else {
          setErrorText('No internet connection');
        }
      });
    }
  };

  return (
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
            <View style={styles.headertextcontainer}>
              <Text style={styles.logintext}>Login</Text>
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
                        setEyeIcon(eyeIcon === 'eye' ? 'eye-off' : 'eye');
                      }}
                    />
                  }
                  value={password}
                  onChangeText={password => setPassword(password)}
                />
                {errorText && <Error text={errorText} />}

                {loading && (
                  <View style={{paddingTop: verticalScale(5)}}>
                    <ActivityIndicator size="small" color="#0000ff" />
                  </View>
                )}
              </View>

              {/* <Text style={{textAlign: 'center', fontSize: scale(12)}}>
                <Text> Don't have an Account? </Text>
                <Text
                  style={{
                    color: colors.Accent,
                    fontWeight: 'bold',
                    fontSize: scale(14),
                  }}>
                  SIGN UP
                </Text>
              </Text> */}
              <Animated.View style={styles.loginBtnView}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#2F3F9E',
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
              </Animated.View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  headertextcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: '20@vs',
    justifyContent: 'space-between',
  },
  logintext: {
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
    marginTop: '15@vs',
    paddingHorizontal: moderateScale(20),
  },
});

export default LoginScreen;
