import React from 'react';
import {View} from 'react-native';
import {Text, Button, Avatar} from 'react-native-paper';
import {
  scale,
  ScaledSheet,
  verticalScale,
  moderateScale,
  ms,
} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import moment from 'moment';
import {NO_IMAGE_URL, API_GET_IMAGE} from '../../utils/API_CONSTANTS';
import {getFormattedTime} from '../../utils/helperFunction/getFormattedTime';

const EventCard = props => {
  const eventData = props.data;
  //console.log('Event Card' + JSON.stringify(eventData));
  return (
    <View style={styles.cardcontainer}>
      <View
        style={{
          width: scale(6),
          backgroundColor: color.cardContainer,
          borderRadius: scale(5),
        }}
      />
      <View style={styles.eventinfo}>
        <Text style={styles.eventName} numberOfLines={1}>
          {eventData.Title}
        </Text>
        <Text style={styles.time}>
          From : {getFormattedTime(eventData.startDate)}
        </Text>
      </View>
      <Avatar.Image
        size={moderateScale(50)}
        style={styles.profImg}
        source={
          eventData.Club.profilePic == null
            ? {uri: NO_IMAGE_URL}
            : {uri: API_GET_IMAGE + eventData.Club.profilePic}
        }
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  cardcontainer: {
    flexDirection: 'row',
    borderColor: color.cardborder,
    borderWidth: '1@s',
    borderRadius: '5@s',
    marginTop: '5@vs',
    padding: '5@s',
    marginHorizontal: '10@s',
    backgroundColor: color.EventCard_Back,
  },
  eventinfo: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: '5@s',
  },
  profImg: {
    alignSelf: 'center',
    backgroundColor: color.EventCard_imgbck,
    marginRight: '5@s',
  },
  eventName: {
    fontSize: '16@s',
    fontWeight: 'bold',
  },
  time: {},
});

export default EventCard;
