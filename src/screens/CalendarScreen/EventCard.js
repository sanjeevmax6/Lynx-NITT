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

const EventCard = props => {
  const data = props.data;
  return (
    <View style={styles.cardcontainer}>
      <View
        style={{
          width: scale(6),
          backgroundColor: '#444444',
          borderRadius: scale(5),
        }}
      />
      <View style={styles.eventinfo}>
        <Text style={styles.eventName} numberOfLines={1}>
          {data.title}
        </Text>
        <Text style={styles.time}>Time: {data.time}:00</Text>
      </View>
      <Avatar.Image
        size={moderateScale(50)}
        style={styles.profImg}
        source={{
          uri: data.organizer.imgURL,
        }}
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
