import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';
import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';
import {
  API_RESET_PASSWORD_CLUBS,
  API_RESET_PASSWORD_STUDENT,
} from '../../utils/API_CONSTANTS';

const SetNewPassword = ({forwardAction, backwardAction, buttonHome}) => {
  const axios = require('axios');
  const [newPassword, setNewPass] = useState('');
  const [newConfirmPassword, setNewConfirmPass] = useState('');

  const changePassword = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        //If it is a student account
        token = null;
        if (RESET_STORE.getIsStudent) {
          token = RESET_STORE.getStudentToken;
        } else {
          token = RESET_STORE.getClubsToken;
        }
        const axiosHeaders = {
          headers: {
            token: token,
            'Content-Type': 'application/json',
          },
        };
        console.log(newPassword);
        console.log(newConfirmPassword);
        const body = JSON.stringify({
          new_password: newPassword,
          new_cpassword: newConfirmPassword,
        });
        url = null;
        if (RESET_STORE.getIsStudent) {
          url = API_RESET_PASSWORD_STUDENT;
        } else {
          url = API_RESET_PASSWORD_CLUBS;
        }
        axios
          .post(url, body, axiosHeaders)
          .then(response => {
            if (response.data.message === 'Success') {
              // forwardAction();
              buttonHome();
              RESET_STORE.setStudentToken('');
            }
            // RESET_STORE.setStudentToken('');
          })
          .catch(error => {
            console.log(error);
            // RESET_STORE.setStudentToken('');
          });
        //If it is a clubs account
        // else {
        //   console.log(RESET_STORE.getClubsToken);
        // }
      } else {
        RESET_STORE.setErrorText(NO_NETWORK);
        RESET_STORE.setError(true);
      }
    });
  };
  return (
    <View
      style={{
        paddingHorizontal: moderateScale(20),
        backgroundColor: 'white',
        flex: 1,
        paddingTop: verticalScale(25),
      }}>
      <Text style={styles.title}>Set Password</Text>
      <Text style={{...styles.title, fontSize: scale(14)}}>
        Enter your new password
      </Text>

      <TextInput
        label="Password"
        placeholder="Enter your new password"
        mode="outlined"
        style={{backgroundColor: 'white', paddingTop: verticalScale(9)}}
        theme={{
          colors: {
            primary: 'black',
          },
        }}
        selectionColor={colors.WHITE}
        onChangeText={pass => {
          setNewPass(pass);
        }}
      />
      <TextInput
        label="Confirm Password"
        placeholder="Confirm your password"
        mode="outlined"
        style={{backgroundColor: 'white', paddingTop: verticalScale(9)}}
        theme={{
          colors: {
            primary: 'black',
          },
        }}
        selectionColor={colors.WHITE}
        onChangeText={pass => {
          setNewConfirmPass(pass);
        }}
      />
      <View style={styles.loginBtnView}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.Tertiary,
            borderRadius: verticalScale(22),
          }}
          onPress={() => {
            // forwardAction();
            changePassword();
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

export default SetNewPassword;

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
