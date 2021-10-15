import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Dimensions,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {Card, Paragraph, Button} from 'react-native-paper';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import Icon from 'react-native-vector-icons/AntDesign';
import {ICON_SIZE} from '../../utils/UI_CONSTANTS';
import * as color from '../../utils/colors';

const WIDTH = Dimensions.get('window').width;

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
    let currentMonth = today.getMonth() + 1;
    let time = currentMonth + '/' + today.getDate() + '/' + today.getFullYear();
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
    if (Difference_In_Days < 8) {
      return Difference_In_Days + ' d';
    } else if (Difference_In_Days / 7 < 3) {
      return Math.floor(Difference_In_Days / 7) + ' w';
    } else if (Difference_In_Days / 30 < 12) {
      return Math.floor(Difference_In_Days / 30) + ' mo';
    } else return Math.floor(Difference_In_Days / 365) + ' yr';
  };
  //console.log(getTimeGap(date));

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
                  //fontWeight: 'bold',
                  paddingRight: 10,
                }}>
                {notification}
              </Text>
            </Text>
            <View
              style={{
                //backgroundColor: 'red',
                flexDirection: 'row',
                //alignItems: 'flex-end',
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
    //marginTop: '10@vs',
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
    //backgroundColor: 'red',
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
