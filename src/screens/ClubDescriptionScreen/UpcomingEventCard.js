import moment from 'moment';
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Text, Card} from 'react-native-paper';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';

const EventCard = ({
  isLive,
  name,
  date,
  description,
  url,
  eventId,
  goToEvent,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        goToEvent(eventId);
      }}>
      <View style={styles.cardLayout}>
        {isLive ? (
          <View
            style={{
              position: 'absolute',
              paddingHorizontal: scale(3),
              flexDirection: 'row',
              right: scale(9),
              top: verticalScale(1),
              borderRadius: scale(18),
              alignItems: 'center',
            }}>
            <Icon
              name="circle"
              color={colors.EventCard_IsLive}
              size={scale(10)}
            />
            <Text
              style={{
                fontSize: scale(9),
                color: colors.GRAY_DARK,
                fontWeight: 'bold',
              }}>
              {' '}
              LIVE
            </Text>
          </View>
        ) : (
          <></>
        )}
        <Image style={styles.poster} source={{uri: API_GET_IMAGE + url}} />
        <View style={styles.eventInfo}>
          <Text
            style={{
              fontSize: scale(18),
              fontWeight: 'bold',
            }}
            numberOfLines={1}>
            {name}
          </Text>
          <Text
            style={{
              fontSize: scale(14),
            }}
            numberOfLines={1}>
            {description}
          </Text>
          <Text style={{fontSize: scale(12)}}>{new Date(date).toString()}</Text>
        </View>
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
export default EventCard;
