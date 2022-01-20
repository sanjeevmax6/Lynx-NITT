import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {HelperText, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';
import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';
import {
  API_RESET_PASSWORD_CLUBS,
  API_RESET_PASSWORD_STUDENT,
} from '../../utils/API_CONSTANTS';

import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';
import axios from 'axios';

const SetNewPassword = ({navigation}) => {
  const [newPassword, setNewPass] = useState('');
  const [newConfirmPassword, setNewConfirmPass] = useState('');

  const changePassword = () => {
    RESET_STORE.setLoading(true);
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        //If it is a student account
        let token = null;
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

        const body = JSON.stringify({
          new_password: newPassword,
          new_cpassword: newConfirmPassword,
        });
        let url = null;
        if (RESET_STORE.getIsStudent) {
          url = API_RESET_PASSWORD_STUDENT;
        } else {
          url = API_RESET_PASSWORD_CLUBS;
        }
        axios
          .post(url, body, axiosHeaders)
          .then(response => {
            if (response.status === 200) {
              RESET_STORE.setSuccess(true);
              RESET_STORE.setLoading(false);
            }
          })
          .catch(error => {
            if (error.response) {
              RESET_STORE.setErrorText(error.response.data.message);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              RESET_STORE.setErrorText(SERVER_ERROR);
            } else {
              // Something happened in setting up the request that triggered an Error
              RESET_STORE.setErrorText(UNEXPECTED_ERROR);
            }
            RESET_STORE.setError(true);
            RESET_STORE.setLoading(false);
          });
      } else {
        RESET_STORE.setErrorText(NO_NETWORK);
        RESET_STORE.setError(true);
        RESET_STORE.setLoading(false);
      }
    });
  };

  return (
    <>
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
          autoCapitalize="none"
          label="Password"
          placeholder="Enter your new password"
          mode="outlined"
          style={{
            backgroundColor: 'white',
            paddingTop: verticalScale(9),
          }}
          theme={{
            colors: {
              primary: 'black',
            },
          }}
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          onChangeText={pass => {
            setNewPass(pass);
          }}
        />
        <TextInput
          label="Confirm Password"
          placeholder="Confirm your password"
          mode="outlined"
          style={{
            backgroundColor: 'white',
            paddingTop: verticalScale(9),
          }}
          theme={{
            colors: {
              primary: 'black',
            },
          }}
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          autoCapitalize="none"
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
    </>
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
