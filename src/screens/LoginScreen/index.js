import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Button, Divider} from 'react-native-paper';
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from 'react-native-size-matters';
import {updateToken} from '../../redux/reducers/loginScreen';
import {useDispatch, useSelector} from 'react-redux';
import * as colors from '../../utils/colors';

import store from '../../redux/store';

const WIDTH = Dimensions.get('window').width;

const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [eyeIcon, setEyeIcon] = useState('eye-off');
  const [passwordToggle, setPasswordToggle] = useState(true);
  // const imageHeight = useRef(new Animated.Value(verticalScale(150))).current;
  // const marginHt = useRef(new Animated.Value(verticalScale(27))).current;
  const [temp, setTemp] = useState();
  const [student, setStudent] = useState(true);

  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener(
  //     'keyboardDidShow',
  //     keyboardWillShow,
  //   );
  //   const hideSubscription = Keyboard.addListener(
  //     'keyboardDidHide',
  //     keyboardWillHide,
  //   );

  //   return () => {
  //     showSubscription.remove();
  //     hideSubscription.remove();
  //   };
  // }, []);

  // const keyboardWillShow = event => {
  //   Animated.timing(imageHeight, {
  //     useNativeDriver: false,
  //     toValue: verticalScale(100),
  //   }).start();
  //   Animated.timing(marginHt, {
  //     toValue: verticalScale(7),
  //     useNativeDriver: false,
  //   }).start();
  // };

  // const keyboardWillHide = event => {
  //   Animated.timing(imageHeight, {
  //     toValue: verticalScale(150),
  //     useNativeDriver: false,
  //   }).start();

  //   Animated.timing(marginHt, {
  //     toValue: verticalScale(27),
  //     useNativeDriver: false,
  //   }).start();
  // };

  const dispatch = useDispatch();

  const onLogin = token => {
    // console.log(token);
    if (token) {
      dispatch(updateToken(true));
    }

    setTemp(store.getState().logScreen.login.userToken);
    // console.log(temp);
  };

  const toggle = bool => {
    setStudent(bool);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View style={styles.headertextcontainer}>
            <Text style={styles.logintext}>Login</Text>
          </View>

          <View style={[styles.inputLayout, {marginBottom: verticalScale(55)}]}>
            <View style={styles.profileImgView}>
              <Animated.Image
                style={{
                  width: moderateScale(170),
                  height: moderateScale(170),
                  marginTop: verticalScale(70),
                  marginBottom: verticalScale(20),
                }}
                source={require('../../assests/images/nitt_logo.png')}
              />
            </View>
            <View style={styles.toggle}>
              {/* <TouchableOpacity onPress={toggle(true)}> */}
              <Text
                style={{
                  ...styles.toggleTextL,
                  backgroundColor: student ? '#0080FF' : colors.Secondary,
                }}>
                Student
              </Text>
              {/* </TouchableOpacity> */}
              <Divider style={{width: 2, backgroundColor: 'grey', flex: 1}} />
              {/* <TouchableOpacity onPress={toggle(false)}> */}
              <Text
                style={{
                  ...styles.toggleTextR,
                  backgroundColor: student ? colors.Secondary : '#0080FF',
                }}>
                Club
              </Text>
              {/* </TouchableOpacity> */}
            </View>
            <View style={styles.textInput}>
              <TextInput
                label="Username"
                placeholder="Enter your username"
                mode="outlined"
                value={user}
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
                label="Password"
                placeholder="Enter your password"
                mode="outlined"
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
            </View>
            <Animated.View style={styles.loginBtnView}>
              <Button
                style={styles.loginButton}
                mode="outlined"
                loading={false}
                color="#3e863e"
                onPress={() => {
                  onLogin(user);
                }}>
                Login
              </Button>
            </Animated.View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: 'white',
    height: '100%',
    flexDirection: 'column',
    flex: 1,
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
    textDecorationLine: 'underline',
  },
  toggle: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: WIDTH / 2,
    marginBottom: verticalScale(20),
  },
  toggleTextL: {
    fontSize: scale(14),
    padding: '5@ms',
    width: WIDTH / 4,
    borderColor: colors.GRAY_DARK,
    borderWidth: 1,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    borderRightWidth: 0,
    textAlign: 'center',
  },
  toggleTextR: {
    fontSize: scale(14),
    padding: '5@ms',
    width: WIDTH / 4,
    borderColor: colors.GRAY_DARK,
    borderWidth: 1,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    textAlign: 'center',
  },
  inputLayout: {
    flex: 1,
    justifyContent: 'center',
  },
  profileImgView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },
  loginBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: verticalScale(70),
    // width: scale(10),
    marginTop: '30@vs',
    paddingHorizontal: moderateScale(20),
  },
  loginButton: {
    width: '100%',
  },
});

export default LoginScreen;
