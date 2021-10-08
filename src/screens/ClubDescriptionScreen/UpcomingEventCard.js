import React from 'react';
import {View, Image} from 'react-native';
import {Text, Card} from 'react-native-paper';
import {scale, ScaledSheet} from 'react-native-size-matters';

const RecentEventCard = ({name, date, time, id, url}) => {
  return (
    <View style={styles.cardLayout}>
      <Image style={styles.poster} source={{uri: url}} />
      <View style={styles.eventInfo}>
        <Text
          style={{
            fontSize: scale(14),
            fontWeight: 'bold',
          }}
          numberOfLines={1}>
          {name}
        </Text>
        <Text style={{fontSize: scale(12)}}>
          {date} | {time}
        </Text>
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
