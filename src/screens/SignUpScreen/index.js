import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
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

import {updateToken} from '../../redux/reducers/loginScreen';
import {useDispatch, useSelector} from 'react-redux';

import store from '../../redux/store';

const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [eyeIcon, setEyeIcon] = useState('eye-off');
  const [passwordToggle, setPasswordToggle] = useState(true);
  const imageHeight = useRef(new Animated.Value(verticalScale(150))).current;
  const [headerHt, setheaderHt] = useState(0);
  const marginHt = useRef(new Animated.Value(verticalScale(0))).current;
  const [temp, setTemp] = useState();

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      keyboardWillShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      keyboardWillHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const keyboardWillShow = event => {
    marginHt.setValue(headerHt / 4);
    Animated.timing(imageHeight, {
      duration: 10,
      useNativeDriver: false,
      toValue: verticalScale(120),
    }).start(({finished}) => {
      console.log(headerHt);
    });
  };

  const keyboardWillHide = event => {
    Animated.timing(imageHeight, {
      duration: 10,
      toValue: verticalScale(150),
      useNativeDriver: false,
    }).start(({finished}) => {
      console.log(headerHt);
      marginHt.setValue(headerHt / 2);
    });
  };

  const dispatch = useDispatch();

  const onLogin = token => {
    // console.log(token);
    dispatch(updateToken(token));
    setTemp(store.getState().logScreen.login.userToken);
    // console.log(temp);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View
          style={styles.headertextcontainer}
          onLayout={event => {
            setheaderHt(event.nativeEvent.layout.height);
            marginHt.setValue(event.nativeEvent.layout.height / 2);
          }}>
          <Text style={styles.logintext}>Login</Text>
          <TouchableOpacity>
            <Text style={styles.signuptext}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.inputLayout, {marginBottom: headerHt}]}>
          <Animated.View
            style={[styles.profileImgView, {marginBottom: marginHt}]}>
            <Animated.Image
              source={require('../../assests/images/nitt_logo.png')}
              style={{
                width: imageHeight,
                height: imageHeight,
              }}
            />
          </Animated.View>
          <View style={styles.textInput}>
            <TextInput
              label="Username"
              placeholder="Enter your username"
              mode="outlined"
              value={user}
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
          <Animated.View style={[styles.loginBtnView, {marginTop: marginHt}]}>
            <Button
              style={styles.loginButton}
              mode="outlined"
              loading={false}
              onPress={() => {
                onLogin(user);
              }}>
              Login
            </Button>
          </Animated.View>
        </Animated.View>
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
  },
  signuptext: {
    padding: '10@msr',
    fontSize: '18@s',
    marginRight: '15@s',
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
