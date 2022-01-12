import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import {Button, Chip} from 'react-native-paper';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import * as color from '../../utils/colors';
import moment from 'moment';

const ActivityCard = ({
  date,
  title,
  desc,
  imageUrl,
  type,
  sender,
  navigation,
}) => {
  const dateString = moment(date).format('DD/MM/YYYY | H:mm');
  const getTimeGap = d => {
    let date = new Date(d);
    var today = new Date();
    var Difference_In_Time = Math.abs(today.getTime() - date.getTime());
    var Difference_In_Days = Math.floor(
      Difference_In_Time / (1000 * 3600 * 24),
    );
    if (Math.floor(Difference_In_Days / 365) >= 1) {
      return Math.floor(Difference_In_Days / 365) + ' Yr';
    }
    if (Math.floor(Difference_In_Days / 30) >= 1) {
      return Math.floor(Difference_In_Days / 30) + ' Mo';
    }
    if (Math.floor(Difference_In_Days / 7) >= 1) {
      return Math.floor(Difference_In_Days / 7) + ' W';
    }
    return Difference_In_Days + ' D';
  };

  return (
    <View style={{paddingVertical: 6}}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (type === 'circular') {
            // navigation.navigate('AnnouncementDetail', {
            //   data: {
            //     // organizer: notifier,
            //     // url: imageUrl,
            //     // links: 'awkjvbav',
            //     // description: notification,
            //     // time: getTimeGap(date),
            //     // organizerUrl: organizerUrl,
            //     // organizerFollower: organizerFollower,
            //   },
            // });
          } else if (type === 'event') {
            // navigation.navigate('EventDescriptionScreen', {
            //   // data: {
            //   //   eventId:
            //   // },
            // });
          }
        }}>
        <View style={styles.cardLayout}>
          <Image
            style={styles.poster}
            source={{
              uri: 'https://nittapp-spidertesting.cloudns.nz/v1.5//api/image?photo=0590bd55-6248-4346-b051-2ef573785840.jpg',
            }}
          />
          <View style={styles.eventInfo}>
            <Text numberOfLines={3}>
              <Text style={styles.notifier}>{sender.name}</Text>
              <Text style={styles.notifier}>: </Text>
              <Text
                style={{
                  fontSize: scale(14),
                }}>
                {title}
                {'\n'}
                {desc}
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: verticalScale(2),
              }}>
              <Text style={styles.date}>{type.toUpperCase()}</Text>
              <Text
                style={{
                  fontSize: scale(12),
                  fontWeight: '500',
                }}>
                {dateString}
              </Text>
              <Text style={{fontSize: scale(12), marginRight: scale(2)}}>
                {getTimeGap(date)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = ScaledSheet.create({
  cardLayout: {
    flexDirection: 'row',
    paddingHorizontal: scale(HorizontalPadding),
  },
  poster: {
    height: '60@s',
    width: '60@s',
    borderRadius: '30@s',
    alignSelf: 'center',
  },
  date: {
    fontSize: scale(10),
    color: color.Tertiary,
    borderColor: 'black',
    borderWidth: scale(1),
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    paddingVertical: verticalScale(2),
    paddingHorizontal: scale(5),
  },
  eventInfo: {
    marginLeft: '9@s',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  notificationView: {
    alignSelf: 'center',
    marginRight: 0,
  },
  button: {
    marginLeft: '79@s',
  },
  btn: {
    alignSelf: 'baseline',
  },
  notifier: {
    color: color.Tertiary,
    fontSize: scale(14),
    fontWeight: 'bold',
    lineHeight: 20,
  },
});
export default ActivityCard;
