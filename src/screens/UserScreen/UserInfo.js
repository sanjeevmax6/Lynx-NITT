import React from 'react';
import {View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from 'react-native-size-matters';
import * as color from '../../utils/colors';

const UserInfo = () => {
  return (
    <View style={styles.userinfo}>
      <View style={styles.toprow}>
        <View>
          <Avatar.Image
            size={moderateScale(150)}
            style={styles.profImg}
            source={require('../../assests/images/user.png')}
          />
          <Text
            style={{
              fontWeight: 'bold',
              marginTop: verticalScale(10),
              fontSize: scale(18),
            }}>
            Firstname Lastname
          </Text>
        </View>
        <View style={styles.followers}>
          <Text style={styles.followTxt}>50</Text>
          <Text style={styles.followTxt}>Posts</Text>
          <Text
            style={{
              ...styles.followTxt,
              marginTop: verticalScale(25),
            }}>
            500
          </Text>
          <Text style={styles.followTxt}>Followers</Text>
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  userinfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  toprow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
  profImg: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: color.WHITE,
  },
  followers: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  followTxt: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: scale(15),
  },
});

export default UserInfo;
