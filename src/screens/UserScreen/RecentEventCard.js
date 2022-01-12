import moment from 'moment';
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {scale, ScaledSheet} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {isLive} from '../../utils/helperFunction/isLive';
import LiveEventComponent from './LiveEventComponent';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';

const DATE_FORMAT = 'DD/MM/YYYY';
const TIME_FORMAT = 'hh:mm A';

const RecentEventCard = ({eventItem, functions}) => {
  const formattedDate = moment(eventItem.startDate).format(DATE_FORMAT);
  const formattedTime = moment(eventItem.startDate).format(TIME_FORMAT);
  const liveCheck = isLive(eventItem.startDate, eventItem.endDate);
  return (
    <TouchableOpacity
      style={styles.cardLayout}
      onPress={() => {
        functions.onEventClick(eventItem.EventId);
      }}>
      <Image
        style={styles.poster}
        source={{uri: API_GET_IMAGE + eventItem.poster}}
      />
      <View style={styles.eventInfo}>
        <Text
          style={{
            fontSize: scale(14),
            fontWeight: 'bold',
            paddingRight: scale(10),
          }}
          numberOfLines={1}>
          {eventItem.Title}
        </Text>
        <Text style={{fontSize: scale(12)}}>
          {formattedDate} | {formattedTime}
        </Text>
      </View>
      <View style={styles.notificationView}>
        <LiveEventComponent
          isLive={liveCheck}
          onDeletePress={() => {
            functions.onDeleteClick(eventItem.EventId, eventItem.Title);
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  cardLayout: {
    flexDirection: 'row',
    padding: '10@ms',
    marginTop: '10@vs',
    borderColor: 'grey',
    borderWidth: '0.5@s',
    borderRadius: '5@s',
    marginHorizontal: scale(HorizontalPadding),
    backgroundColor: color.WHITE,
  },
  poster: {
    height: '60@msr',
    width: '60@msr',
    borderRadius: '2@sr',
  },
  eventInfo: {
    marginLeft: '10@s',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  notificationView: {
    alignSelf: 'center',
    marginRight: 0,
  },
});
export default RecentEventCard;
