import React from 'react';
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
import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';

const Username = ({forward, navigation}) => {
  const forwardAction = () => {
    if (RESET_STORE.getUsername === '') return;
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
        return;
      }
      let email = RESET_STORE.getUsername.trim();
      RESET_STORE.setIsStudent(false);
      forward();
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
            forwardAction();
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
