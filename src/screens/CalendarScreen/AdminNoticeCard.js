import React from 'react';
import {View} from 'react-native';
import {Colors, Text, Avatar} from 'react-native-paper';
import {
  scale,
  ScaledSheet,
  verticalScale,
  moderateScale,
  ms,
} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

const AdminNoticeCard = props => {
  const adminNoticeData = props.data;
  //console.log('Event Card' + JSON.stringify(adminNoticeData));

  const Title = adminNoticeData.Title;
  const startDate = moment(
    new Date(adminNoticeData.startDate).toLocaleString(),
  ).format('DD-MM-YYYY');
  const startTime = moment(
    new Date(adminNoticeData.startDate).toLocaleString(),
  ).format('hh:mm A');
  const endDate = moment(
    new Date(adminNoticeData.endDate).toLocaleString(),
  ).format('DD-MM-YYYY');
  const endTime = moment(
    new Date(adminNoticeData.endDate).toLocaleString(),
  ).format('hh:mm A');

  return (
    <View style={styles.cardcontainer}>
      <View
        style={{
          width: scale(6),
          backgroundColor: colors.AdminNoticeCardContainer,
          borderRadius: scale(5),
        }}
      />
      <View style={styles.eventinfo}>
        <Text style={styles.eventName} numberOfLines={1}>
          Admin : {Title}
        </Text>
        <View style={{flexDirection: 'row', marginVertical: verticalScale(2)}}>
          <Icon
            style={{paddingHorizontal: scale(0)}}
            name="calendar-plus-o"
            color={colors.AdminNoticeCard_CalendarIcon}
            size={scale(20)}
          />
          <Text style={styles.eventDate}>
            {' '}
            From : {startTime} | {startDate}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: verticalScale(2)}}>
          <Icon
            style={{paddingHorizontal: scale(0)}}
            name="calendar-minus-o"
            color={colors.AdminNoticeCard_CalendarIcon}
            size={scale(20)}
          />
          <Text style={styles.eventDate}>
            {' '}
            To : {endTime} | {endDate}
          </Text>
        </View>
      </View>
      <Avatar.Image
        size={moderateScale(75)}
        style={styles.profImg}
        source={require('../../res/images/nitt_logo.png')}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  cardcontainer: {
    flexDirection: 'row',
    borderColor: colors.cardborder,
    borderWidth: '1@s',
    borderRadius: '5@s',
    marginTop: '5@vs',
    padding: '5@s',
    marginHorizontal: '10@s',
    backgroundColor: colors.AdminNoticeCard_Back,
  },
  eventinfo: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: '5@s',
  },
  eventName: {
    fontSize: '16@s',
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  profImg: {
    alignSelf: 'center',
    backgroundColor: Colors.EventCard_imgbck,
    marginRight: '5@s',
  },
});

export default AdminNoticeCard;
