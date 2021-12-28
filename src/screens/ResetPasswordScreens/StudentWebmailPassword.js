import React from 'react';
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

const StudentWebmailPassword = ({forwardAction, backwardAction}) => {
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
        onChangeText={user => {
          console.log(5);
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
