import React from 'react';
import {View, Text} from 'react-native';
import * as colors from '../../utils/colors';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
const Dashboard = ({profileView, eventView}) => {
  return (
    <View style={styles.dashboard}>
      <View
        style={{
          marginHorizontal: scale(HorizontalPadding),
          paddingTop: verticalScale(6),
        }}>
        <Text style={styles.head}>DASHBOARD</Text>
        <View style={styles.card}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.number}>{profileView}</Text>
              <Text style={styles.text}>People who viewed your Profile</Text>
            </View>
            <View
              style={{backgroundColor: colors.GRAY_MEDIUM, width: scale(2)}}
            />
            <View style={{flex: 1}}>
              <Text style={styles.number}>{eventView}</Text>
              <Text style={styles.text}>People who viewed your Events</Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            alignSelf: 'flex-end',
            color: colors.Accent,
            fontSize: scale(10),
          }}>
          *Past 90 Days
        </Text>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = ScaledSheet.create({
  dashboard: {
    backgroundColor: colors.Tertiary,
    marginTop: '6@vs',
    paddingBottom: '6@vs',
  },
  head: {
    color: colors.WHITE,
    fontWeight: 'bold',
    fontSize: '14@s',
    paddingBottom: '6@vs',
  },
  card: {
    backgroundColor: colors.WHITE,
    borderRadius: '6@s',
  },
  text: {
    //flex: 1,
    padding: '6@s',
    paddingTop: 0,
    //backgroundColor: 'pink',
  },
  number: {
    color: 'blue',
    fontSize: '14@s',
    fontWeight: 'bold',
    padding: '6@s',
    paddingBottom: 0,
  },
});
