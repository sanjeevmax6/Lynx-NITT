import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {Button} from 'react-native-paper';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import * as color from '../../utils/colors';

const ActivityCard = ({
  notifier = 'Spider',
  notification,
  date,
  time,
  id,
  type = 0,
  url = 'https://images-na.ssl-images-amazon.com/images/I/51K4bzCIe3L.png',
  organizerUrl = 'https://media-exp1.licdn.com/dms/image/C510BAQF2qwmDE5B4UA/company-logo_200_200/0/1544248160311?e=2159024400&v=beta&t=g3fZgTrVPgM5pF_BYGaZW2InTI26WLfsFv4UOe0afew',

  organizerFollower = 150,
  navigation,
  data,
}) => {
  const getTimeGap = d => {
    let date = new Date(d);
    var today = new Date();
    var Difference_In_Time = Math.abs(today.getTime() - date.getTime());
    var Difference_In_Days = Math.floor(
      Difference_In_Time / (1000 * 3600 * 24),
    );
    // console.log(
    //   'Today: ' +
    //     time +
    //     ' That day: ' +
    //     d +
    //     ' Difference: ' +
    //     Difference_In_Days,
    // );
    if (Math.floor(Difference_In_Days / 365) >= 1) {
      return Math.floor(Difference_In_Days / 365) + ' yr';
    }
    if (Math.floor(Difference_In_Days / 30) >= 1) {
      return Math.floor(Difference_In_Days / 30) + ' mo';
    }
    if (Math.floor(Difference_In_Days / 7) >= 1) {
      return Math.floor(Difference_In_Days / 7) + ' w';
    }
    return Difference_In_Days + ' d';
  };

  return (
    <View style={{paddingVertical: 6}}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (type == 0) {
            navigation.navigate('AnnouncementDetail', {
              data: {
                organizer: notifier,
                url: url,
                links: 'awkjvbav',
                description: notification,
                time: getTimeGap(date),
                organizerUrl: organizerUrl,
                organizerFollower: organizerFollower,
              },
            });
          }
        }}>
        <View style={styles.cardLayout}>
          <Image style={styles.poster} source={{uri: url}} />
          <View style={styles.eventInfo}>
            <Text numberOfLines={3}>
              <Text style={styles.notifier}>{notifier}</Text>
              <Text style={styles.notifier}>: </Text>
              <Text
                style={{
                  fontSize: scale(12),
                }}>
                {notification}
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={{fontSize: scale(12), fontWeight: '500'}}>
                {date} | {time}
              </Text>
              <Text style={{textAlign: 'right', flex: 1, fontSize: scale(12)}}>
                {getTimeGap(date)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {type === 1 ? (
        <View style={styles.button}>
          <Button
            mode="outlined"
            color={color.Accent}
            style={styles.btn}
            contentStyle={{padding: 0}}
            onPress={() => {
              navigation.navigate('EventDescriptionScreen', {
                data: data,
              });
            }}
            labelStyle={{fontSize: scale(10), padding: 0, fontWeight: 'bold'}}>
            View event
          </Button>
        </View>
      ) : (
        <View></View>
      )}
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
