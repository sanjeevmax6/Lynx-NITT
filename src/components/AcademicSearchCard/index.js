import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';
import * as colors from '../../utils/colors';
import {getFormattedDate} from '../../utils/helperFunction/getFormattedDate';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import ImageView from '../ImageView';

const AcademicSearchCard = ({title, desc, url, name, time}) => {
  console.log(url);
  return (
    <View style={styles.card}>
      <ImageView
        src={API_GET_IMAGE + url}
        style={styles.poster}
        resizeMode={'center'}
      />
      <View style={{flex: 1, marginLeft: scale(HorizontalPadding)}}>
        <Text numberOfLines={3}>
          <Text numberOfLines={1} style={styles.notifier}>
            {name}
          </Text>
          <Text style={styles.notifier}>: </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: scale(12),
              fontWeight: '500',
              textTransform: 'uppercase',
            }}>
            {title}
          </Text>
          <Text>{'\n'}</Text>
          <Text
            style={{
              flexShrink: 1,
              marginRight: scale(HorizontalPadding),
              fontSize: scale(12),
              fontWeight: '300',
            }}>
            {desc}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: scale(12),
            textAlign: 'right',
            marginRight: scale(2),
            color: colors.GRAY_DARK,
          }}>
          {getFormattedDate(time)}
        </Text>
      </View>
    </View>
  );
};

export default AcademicSearchCard;

const styles = ScaledSheet.create({
  card: {
    marginTop: '5@msr',
    marginBottom: '5@msr',
    paddingVertical: '2@msr',
    paddingHorizontal: '1@msr',
    display: 'flex',
    flexDirection: 'column',
    flexDirection: 'row',
    marginHorizontal: scale(HorizontalPadding),
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cardDetails: {
    margin: '5@s',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    marginBottom: '3@s',
    color: 'black',
    fontSize: '16@msr',
    fontWeight: 'bold',
  },
  desc: {},
  poster: {
    height: '60@s',
    width: '60@s',
    borderRadius: '30@s',
    alignSelf: 'center',
    elevation: 0,
    backgroundColor: 'white',
  },
  notifier: {
    color: colors.Tertiary,
    fontSize: scale(14),
    fontWeight: 'bold',
    lineHeight: 20,
  },
});
