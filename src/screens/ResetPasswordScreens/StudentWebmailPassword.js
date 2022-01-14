import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';
import {API_RESET_PASSWORD_VALIDATE_STUDENT} from '../../utils/API_CONSTANTS';
import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';

const StudentWebmailPassword = ({forwardAction, backwardAction}) => {
  const axios = require('axios');

  const [password, setPass] = useState();

  const setPassword = () => {
    RESET_STORE.setStudentPassword(password);
  };

  const validateStudentLogin = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        if (
          RESET_STORE.getStudentPassword != '' &&
          RESET_STORE.getUsername != ''
        ) {
          studentRoll = RESET_STORE.getUsername;
          studentPassword = RESET_STORE.getStudentPassword;
          const axiosHeaders = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const body = JSON.stringify({
            rollNo: studentRoll,
            webmail_password: studentPassword,
          });

          axios
            .post(API_RESET_PASSWORD_VALIDATE_STUDENT, body, axiosHeaders)
            .then(response => {
              if (response.data.message === 'Success') {
                // console.log(response.data.token);
                RESET_STORE.setStudentToken(response.data.token);
                console.log(RESET_STORE.getStudentToken);
                RESET_STORE.setStudentTokenFetched(1);
                forwardAction();
              }
              // console.log(RESET_STORE.getStudentToken);
            })
            .catch(error => {
              console.log(error);
            });
        }
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
      <Text style={styles.title}>Reset Password</Text>
      <Text style={{...styles.title, fontSize: scale(14)}}>
        Enter your webmail password
      </Text>

      <TextInput
        label="Password"
        placeholder="Enter your webmail password"
        mode="outlined"
        style={{backgroundColor: 'white', paddingTop: verticalScale(9)}}
        theme={{
          colors: {
            primary: 'black',
          },
        }}
        selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
        onChangeText={pass => {
          setPass(pass);
        }}
      />
      <View style={styles.loginBtnView}>
        <Button
          icon={'chevron-left'}
          color={colors.Accent}
          onPress={() => {
            backwardAction();
          }}>
          Back
        </Button>
        <TouchableOpacity
          style={{
            backgroundColor: colors.Tertiary,
            borderRadius: verticalScale(22),
          }}
          onPress={() => {
            setPassword();
            validateStudentLogin();
            console.log(RESET_STORE.getStudentTokenFetched);
            // if (RESET_STORE.getStudentTokenFetched != 0) {
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

export default StudentWebmailPassword;

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
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: moderateScale(0),
    paddingTop: verticalScale(9),
    flexDirection: 'row',
  },
});
