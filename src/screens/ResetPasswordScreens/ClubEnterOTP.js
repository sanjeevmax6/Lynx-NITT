import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {HelperText, TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';
import {
  API_RESET_PASSWORD_GENERATE_OTP_CLUBS,
  API_RESET_PASSWORD_VALIDATE_OTP_CLUBS,
} from '../../utils/API_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';
import ErrorScreen from '../../components/ErrorScreen';

const ClubEnterOTP = ({forwardAction, backwardAction}) => {
  const [OTP, setOTP] = useState(0);
  const [validate, setValidate] = useState(false);
  const [over, setOver] = useState(false);
  const [sec, setSeconds] = useState(30);
  const [resendButton, sendResendButton] = useState(false);
  const [errorOTP, setErrorOTP] = useState(false);
  const axios = require('axios');
  const [Internet, setInternet] = useState(true);

  useEffect(() => {
    // sendClubOTP();
    const sleepTimer = setTimeout(function () {
      sendResendButton(true);
    }, 30000);

    return () => {
      clearTimeout(sleepTimer);
    };
  }, []);

  const sleepTimer = () => {
    setTimeout(function () {
      sendResendButton(true);
    }, 30000);
  };

  const sendClubOTP = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        setInternet(true);
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
              console.log(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        }
      } else {
        // RESET_STORE.setErrorText(NO_NETWORK);
        // RESET_STORE.setError(true);
        setInternet(false);
      }
    });
  };

  const validateOtp = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        setInternet(true);
        console.log('Processing');
        console.log('OTP type', typeof OTP);
        userEmail = RESET_STORE.getUsername;
        console.log(userEmail);
        const axiosHeaders = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify({
          otp: OTP,
          email: userEmail,
        });

        axios
          .post(API_RESET_PASSWORD_VALIDATE_OTP_CLUBS, body, axiosHeaders)
          .then(response => {
            console.log(response.data);
            if (response.data.message === 'Success') {
              RESET_STORE.setClubsToken(response.data.token);
              forwardAction();
            }
          })
          .catch(error => {
            console.log(error);
            setErrorOTP(true);
          });
      } else {
        // RESET_STORE.setErrorText(NO_NETWORK);
        // RESET_STORE.setError(true);
        setInternet(false);
      }
    });
  };

  const hasErrors = () => {
    return errorOTP;
  };

  return (
    <>
      {!Internet ? (
        <>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}>
            <ErrorScreen
              errorMessage={NO_NETWORK}
              fn={() => {
                NetInfo.fetch().then(state => {
                  if (state.isConnected == true) {
                    // RESET_STORE.setErrorText('');
                    // RESET_STORE.setError(false);
                    setInternet(true);
                  }
                });
              }}
            />
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              paddingHorizontal: moderateScale(20),
              backgroundColor: 'white',
              flex: 1,
              paddingTop: verticalScale(25),
            }}>
            <Text style={styles.title}>Verify Email</Text>
            <Text style={{...styles.title, fontSize: scale(14)}}>
              Enter your OTP
            </Text>
            <TextInput
              label="OTP"
              placeholder="Enter your OTP"
              mode="outlined"
              style={{backgroundColor: 'white', paddingTop: verticalScale(9)}}
              theme={{
                colors: {
                  primary: 'black',
                },
              }}
              selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              onChangeText={otp => {
                setOTP(parseInt(otp));
                console.log(5);
              }}
            />
            <HelperText type="error" visible={hasErrors()}>
              Invalid OTP
            </HelperText>
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
                  validateOtp();
                }}>
                <Icon
                  name="chevron-right"
                  size={verticalScale(44)}
                  color={colors.WHITE}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: scale(14),

                  marginTop: verticalScale(6),
                }}>
                <Text>The resend button will be available in</Text>

                <Text
                  style={{
                    color: 'darkgreen',
                    fontWeight: 'bold',
                  }}>
                  {' '}
                  {'30 seconds'}
                </Text>
              </Text>
            </View>
            {/* {resendButton && ( */}
            <View style={styles.otpButton}>
              <Button
                mode="contained"
                loading={!resendButton}
                disabled={!resendButton}
                onPress={() => {
                  sendClubOTP();
                  sendResendButton(false);
                  sleepTimer();
                }}>
                <Text style={styles.otpText}>Send OTP</Text>
              </Button>
            </View>
            {/* )} */}
          </View>
        </>
      )}
    </>
  );
};

export default ClubEnterOTP;

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
  otpText: {
    fontSize: '12@s',
    color: colors.FontColor,
    fontWeight: '500',
    marginTop: '10@vs',
    textAlign: 'center',
  },
  otpButton: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: moderateScale(0),
    paddingTop: verticalScale(9),
    flexDirection: 'row',
  },
});
