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
  const Description = adminNoticeData.Description;
  return (
    <View style={styles.cardcontainer}>
      <View
        style={{
          width: scale(6),
          backgroundColor: colors.AdminNoticeCardContainer,
          borderRadius: scale(5),
        }}
      />
      <View style={styles.noticeInfo}>
        <Text style={styles.noticeName} numberOfLines={1}>
          Admin : {Title}
        </Text>
        <Text
          style={styles.noticeDescription}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {Description}
        </Text>
      </View>
      <Avatar.Image
        size={moderateScale(50)}
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
  noticeInfo: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: '5@s',
  },
  noticeName: {
    fontSize: '16@s',
    fontWeight: 'bold',
  },
  noticeDescription: {
    fontSize: '14@s',
  },
  profImg: {
    alignSelf: 'center',
    backgroundColor: Colors.EventCard_imgbck,
    marginRight: '5@s',
  },
});

export default AdminNoticeCard;
