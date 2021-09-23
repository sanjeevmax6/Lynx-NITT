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
import Icon from 'react-native-vector-icons/FontAwesome';
import * as color from '../../utils/colors';

const RecentEventCard = () => {
  return (
    <View style={styles.cardlayout}>
      <Image
        style={styles.poster}
        source={require('../../assests/images/poster.png')}
      />
      <View style={styles.eventinfo}>
        <Text
          style={{
            fontSize: scale(15),
            fontWeight: 'bold',
          }}>
          Spider week
        </Text>
        <Text style={{fontSize: scale(14)}}>22-09-2021 12:30</Text>
      </View>
      <View style={styles.notiview}>
        <Icon name={'bell'} size={scale(20)} />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  cardlayout: {
    flexDirection: 'row',
    padding: '10@ms',
    marginTop: '10@vs',
    borderColor: 'grey',
    borderWidth: '0.5@s',
    borderRadius: '5@s',
  },
  poster: {
    height: '50@vs',
    width: '50@s',
  },
  eventinfo: {
    marginLeft: '10@s',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  notiview: {
    alignSelf: 'center',
    marginRight: 0,
  },
});
export default RecentEventCard;
