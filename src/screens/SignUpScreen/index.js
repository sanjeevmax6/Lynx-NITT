import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Image,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from 'react-native-size-matters';

import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
  MaterialCommunityIcons,
} from 'react-native-fontawesome';
import * as colors from '../../utils/colors';

import {updateToken} from '../../redux/reducers/loginScreen';
import {useDispatch, useSelector} from 'react-redux';

import store from '../../redux/store';

const LoginScreen = ({navigation}) => {
  const [rollno, setRollNo] = useState();
  const [password, setPassword] = useState();
  const [eyeIcon, setEyeIcon] = useState('eye-off');
  const [passwordToggle, setPasswordToggle] = useState(true);
  // const imageHeight = useRef(new Animated.Value(verticalScale(150))).current;
  // const [headerHt, setheaderHt] = useState(0);
  // const marginHt = useRef(new Animated.Value(verticalScale(27))).current;
  const [temp, setTemp] = useState();

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

  const verifyCred = () => {};

  const login = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View style={styles.headertextcontainer}>
            <TouchableOpacity onPress={login}>
              <Text style={styles.logintext}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.signuptext}>SignUp</Text>
          </View>
          <Animated.View style={styles.inputLayout}>
            <Animated.View style={styles.profileImgView}>
              <Image
                style={{
                  width: moderateScale(170),
                  height: moderateScale(170),
                  marginTop: verticalScale(90),
                  marginBottom: verticalScale(20),
                }}
                source={require('../../assests/images/nitt_logo.png')}
              />
            </Animated.View>
            <View style={styles.textInput}>
              <TextInput
                label="Roll Number"
                placeholder="Enter your Roll Number"
                mode="outlined"
                value={rollno}
                theme={{
                  colors: {
                    primary: 'black',
                  },
                }}
                onChangeText={rollno => {
                  setRollNo(rollno);
                }}
              />
            </View>
            <View style={styles.textInput}>
              <TextInput
                label=" Webmail Password"
                placeholder="Enter your Webmail Password"
                mode="outlined"
                secureTextEntry={passwordToggle}
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
                theme={{
                  colors: {
                    primary: 'black',
                  },
                }}
                onChangeText={password => setPassword(password)}
              />
            </View>
            <Animated.View style={styles.loginBtnView}>
              <Button
                style={styles.loginButton}
                mode="outlined"
                loading={false}
                color={colors.Accent}
                onPress={verifyCred}>
                Verify Credentials
              </Button>
            </Animated.View>
          </Animated.View>
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
  signuptext: {
    padding: '10@msr',
    fontSize: '25@s',
    fontWeight: 'bold',
    color: 'black',
    marginRight: '15@s',
    alignContent: 'flex-start',
  },
  logintext: {
    padding: '10@msr',
    fontSize: '18@s',
    marginLeft: '15@s',
    fontWeight: 'bold',
    color: '#ddd',
  },
  inputLayout: {
    flex: 1,
    justifyContent: 'center',
  },
  profileImgView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30@vs',
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
