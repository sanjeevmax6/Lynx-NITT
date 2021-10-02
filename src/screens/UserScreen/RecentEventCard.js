import React from 'react';
import {View, Image} from 'react-native';
import {Text, Card} from 'react-native-paper';
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
  ms,
  vs,
  s,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import * as color from '../../utils/colors';
import {ICON_SIZE} from '../../utils/UI_CONSTANTS';
const RecentEventCard = ({name, date, time, id, url}) => {
  return (
    <View style={styles.cardLayout}>
      <Image style={styles.poster} source={{uri: url}} />
      <View style={styles.eventInfo}>
        <Text
          style={{
            fontSize: scale(14),
            fontWeight: 'bold',
            paddingRight: scale(10),
          }}
          numberOfLines={1}>
          {name}
        </Text>
        <Text style={{fontSize: scale(12)}}>
          {date} | {time}
        </Text>
      </View>
      <View style={styles.notificationView}>
        <Icon
          name={'notification'}
          size={scale(ICON_SIZE)}
          style={{color: color.Tertiary}}
        />
      </View>
    </View>
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
    height: '60@vs',
    width: '60@s',
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
