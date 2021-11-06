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
import {useDispatch} from 'react-redux';
import * as colors from '../../utils/colors';
import LottieView from 'lottie-react-native';
import lottieFile from '../../res/lottieFiles/loginBackGround.json';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Error from '../../components/Error';
import {studentLogin} from './studentLogin';
import {clubLogin} from './clubLogin';

//scaling
const height2 = 737.1;
const screenHeight = Dimensions.get('window').height - getStatusBarHeight(true);
export function getHeight(height) {
  return Math.floor((height * screenHeight) / height2);
}

const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState();
  const [eyeIcon, setEyeIcon] = useState('eye-off');
  const [passwordToggle, setPasswordToggle] = useState(true);
  const [loading, setLoading] = useState();
  const [errorText, setErrorText] = useState(null);
  const dispatch = useDispatch();

  const onLogin = token => {
    setErrorText(null);

    //checking if user is purly numbers
    if (user != '' && user.match(/^[0-9]+$/) == null) {
      //if not purely numbers then check if '@' is present (of form a@b where len a/b >=1)
      if (!user.slice(user.slice(1, user.length - 1)).includes('@')) {
        setErrorText('Enter Valid UserID/Password');
        return;
      }
      let email = user.trim();
      clubLogin(email, password, setErrorText, setLoading, dispatch);
    } else {
      //if purely numbers then student login
      let rollNo = parseInt(user);
      studentLogin(rollNo, password, setErrorText, setLoading, dispatch);
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
