import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import {Button, Chip} from 'react-native-paper';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import * as color from '../../utils/colors';
import moment from 'moment';
import ImageView from '../ImageView';
import {getFormatedDate} from 'react-native-modern-datepicker';
import {getFormattedTime} from '../../utils/helperFunction/getFormattedTime';

const ActivityCard = ({
  date,
  title,
  desc,
  imageUrl,
  type,
  sender,
  navigation,
  id,
}) => {
  const getTimeGap = d => {
    let date = new Date(d);
    var today = new Date();
    var Difference_In_Time = Math.abs(today.getTime() - date.getTime());
    var Difference_In_Days = Math.floor(
      Difference_In_Time / (1000 * 3600 * 24),
    );
    if (Math.floor(Difference_In_Days / 365) >= 1) {
      return Math.floor(Difference_In_Days / 365) + 'yr';
    }
    if (Math.floor(Difference_In_Days / 30) >= 1) {
      return Math.floor(Difference_In_Days / 30) + 'mo';
    }
    if (Math.floor(Difference_In_Days / 7) >= 1) {
      return Math.floor(Difference_In_Days / 7) + 'w';
    }
    return Difference_In_Days + 'd';
  };

  const navigationHandler = () => {
    if (type === 'event') {
      navigation.push('EventDescriptionScreen', {
        eventId: id.event_id,
      });
    } else {
      navigation.push('AnnouncementDetail', {
        circularId: id.circular_id,
      });
    }
  };
  return (
    <View style={{paddingVertical: verticalScale(6)}}>
      <TouchableOpacity
        disabled={type === 'event'}
        onPress={() => {
          if (type === 'circular') {
            navigationHandler();
          }
        }}>
        <View style={styles.cardLayout}>
          <View style={{...styles.poster, elevation: 1}}>
            <ImageView style={styles.poster} src={imageUrl} />
          </View>
          <View style={styles.eventInfo}>
            <Text numberOfLines={3}>
              <Text style={styles.notifier}>{sender}:</Text>
              <Text style={styles.title}> {title}</Text>
              <Text
                style={{
                  fontSize: scale(12),
                  //fontWeight: 'bold',
                  paddingRight: 10,
                }}>
                {'\n'}
                {desc}
              </Text>
            </Text>
            <View
              style={{
                //backgroundColor: 'red',
                flexDirection: 'row',
                //alignItems: 'flex-end',
              }}>
              <Text style={{fontSize: scale(12)}}>
                {getFormatedDate(date)} | {getFormattedTime(date)}
              </Text>
              <Text
                style={{
                  textAlign: 'right',
                  flex: 1,
                  fontSize: scale(12),
                  fontWeight: '300',
                }}>
                {getTimeGap(date)}
              </Text>
            </View>
          </View>
        </View>
        {type === 'event' ? (
          <View style={styles.button}>
            <Button
              mode="outlined"
              color={color.Tertiary}
              style={styles.btn}
              onPress={() => {
                navigationHandler();
              }}
              contentStyle={{padding: 0}}
              labelStyle={{fontSize: 12, padding: 0, fontWeight: 'bold'}}>
              View event
            </Button>
          </View>
        ) : (
          <View></View>
        )}
      </TouchableOpacity>
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
    fontWeight: '500',
  },
  title: {
    color: color.BLACK,
    fontSize: scale(14),
    fontWeight: '400',
  },
});
export default ActivityCard;
