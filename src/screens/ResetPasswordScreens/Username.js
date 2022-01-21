import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {HelperText, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';
import NetInfo from '@react-native-community/netinfo';
import {
  API_RESET_PASSWORD_GENERATE_OTP_CLUBS,
  API_RESET_PASSWORD_VALIDATE_OTP_CLUBS,
} from '../../utils/API_CONSTANTS';

const Username = ({forward, navigation}) => {
  const [error, setError] = useState('');
  const [userDNE, setUserDNE] = useState(false);

  const hasErrors = () => {
    if (error == '') {
      return false;
    } else {
      return true;
    }
  };

  const sendClubOTP = () => {
    const axios = require('axios');
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        // setInternet(true);
        if (RESET_STORE.getUsername != '') {
          userEmail = RESET_STORE.getUsername;
          console.log('Processing');
          const axiosHeaders = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const body = JSON.stringify({
            email: userEmail,
          });
          axios
            .post(API_RESET_PASSWORD_GENERATE_OTP_CLUBS, body, axiosHeaders)
            .then(response => {
              console.log('Stat', response);
              userDNE = false;
              if (!userDNE) {
                forwardAction();
              } else {
                setError('User Does not exist');
              }
            })
            .catch(function (error) {
              console.log(error);
              // error = error.toString();
              // console.log(error);
              // // if (error.includes('404')) {
              // userDNE = true;
              setUserDNE(true);
              setError('User Does not exist');
              // }
            });
        }
      } else {
        // RESET_STORE.setErrorText(NO_NETWORK);
        // RESET_STORE.setError(true);
        // setInternet(false);
      }
    });
  };

  const forwardAction = () => {
    console.log('userdne', userDNE);
    console.log('fvjfsnvsjnkn');
    console.log('userdne', userDNE);
    if (RESET_STORE.getUsername === '') {
      setError('Please fill the field');
      return;
    }
    if (userDNE) {
      setError('User does not exist');
      return;
    }
    if (
      RESET_STORE.getUsername != '' &&
      RESET_STORE.getUsername.match(/^[0-9]+$/) == null
    ) {
      //if not purely numbers then check if '@' is present (of form a@b where len a/b >=1)
      if (
        !RESET_STORE.getUsername
          .slice(
            RESET_STORE.getUsername.slice(
              1,
              RESET_STORE.getUsername.length - 1,
            ),
          )
          .includes('@')
      ) {
        console.log('error');
        setError('Not a valid Username');
        return;
      }
      if (userDNE) {
        setError('User Does not exist');
      } else {
        let email = RESET_STORE.getUsername.trim();
        RESET_STORE.setIsStudent(false);
        forward();
      }
    } else {
      let rollNo = parseInt(RESET_STORE.getUsername);
      RESET_STORE.setIsStudent(true);
      forward();
    }
  };
  return (
    <View
      style={{
        paddingHorizontal: moderateScale(20),
        backgroundColor: 'white',
        flex: 1,
        paddingTop: verticalScale(25),
      }}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={{...styles.title, fontSize: scale(14)}}>
        Enter your username
      </Text>

      <TextInput
        label="Username"
        placeholder="Enter your username"
        mode="outlined"
        autoCapitalize="none"
        style={{backgroundColor: 'white', paddingTop: verticalScale(9)}}
        theme={{
          colors: {
            primary: 'black',
          },
        }}
        selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
        onChangeText={user => {
          RESET_STORE.setUsername(user);
        }}
      />
      <HelperText type="error" visible={hasErrors()}>
        {error}
      </HelperText>
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: scale(14),

            marginTop: verticalScale(6),
          }}>
          <Text>Have your password?</Text>

          <Text
            style={{
              color: 'darkgreen',
              fontWeight: 'bold',
            }}>
            {' '}
            Login
          </Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.loginBtnView}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.Tertiary,
            borderRadius: verticalScale(22),
          }}
          onPress={() => {
            sendClubOTP();
            // if (!userDNE) {
            //   setError('User does not exist');
            //   forwardAction();
            // }
          }}>
          <Icon
            name="chevron-right"
            size={verticalScale(44)}
            color={colors.WHITE}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Username;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.regBackground,
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },
  header: {
    fontSize: '18@s',
    color: colors.FontColor,
    fontWeight: 'bold',
    marginTop: '40@vs',
  },
  title: {
    fontSize: '18@s',
    color: colors.FontColor,
    fontWeight: '500',
    marginTop: '10@vs',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '12@s',
    color: '#555555',
    marginTop: '5@vs',
    textAlign: 'center',
  },
  input: {
    width: '100%',
  },
  loginBtnView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: moderateScale(0),
    paddingTop: verticalScale(9),
  },
});
