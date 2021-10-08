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
  return (
    <View style={styles.cardcontainer}>
      <View
        style={{
          width: scale(6),
          backgroundColor: color.cardstrip,
          borderRadius: scale(5),
        }}
      />
      <View style={styles.eventinfo}>
        <Text style={styles.eventName}>Spider Week</Text>
        <Text style={styles.time}>Time: 12:30:00</Text>
      </View>
      <Avatar.Image
        size={moderateScale(50)}
        style={styles.profImg}
        source={{
          uri: 'https://media-exp1.licdn.com/dms/image/C510BAQF2qwmDE5B4UA/company-logo_200_200/0/1544248160311?e=2159024400&v=beta&t=g3fZgTrVPgM5pF_BYGaZW2InTI26WLfsFv4UOe0afew',
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
  },
  eventinfo: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: '5@s',
  },
  profImg: {
    alignSelf: 'center',
    backgroundColor: color.imgbck,
    marginRight: '5@s',
  },
  eventName: {
    fontSize: '16@s',
    fontWeight: 'bold',
  },
  time: {},
});

export default EventCard;
