import React, {useState} from 'react';
import {
  View,
  Text,
  Animated,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
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
import LottieView from 'lottie-react-native';
import lottieFile from '../../res/lottieFiles/loginBackGround.json';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [eyeIcon, setEyeIcon] = useState('eye-off');
  const [passwordToggle, setPasswordToggle] = useState(true);
  const [temp, setTemp] = useState();

  const dispatch = useDispatch();

  const onLogin = token => {
    // console.log(token);
    if (token) {
      dispatch(updateToken(true));
    }

    setTemp(store.getState().logScreen.login.userToken);
    // console.log(temp);
  };

  return (
    <View style={styles.container}>
      <LottieView
        style={{
          marginTop: verticalScale(160),
          backgroundColor: 'white',
        }}
        resizeMode="cover"
        source={lottieFile}
        progress={1}
        autoPlay
        loop
      />
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
              </View>
              <Animated.View style={styles.loginBtnView}>
                <TouchableOpacity
                  onPress={() => {
                    onLogin(user);
                  }}>
                  <Icon
                    name="chevron-right"
                    size={verticalScale(44)}
                    color={colors.WHITE}
                    style={{
                      backgroundColor: '#2F3F9E',
                      borderRadius: verticalScale(22),
                    }}
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
