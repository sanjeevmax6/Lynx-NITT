import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';
import * as colors from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import ImageView from '../ImageView';

const AcademicSearchCard = ({title, desc, url, name}) => {
  console.log(url);
  return (
    <View style={styles.card}>
      <ImageView src={API_GET_IMAGE + url} style={styles.poster} />
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
            }}>
            {desc}
          </Text>
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
    display: 'flex',
    flexDirection: 'column',
    flexDirection: 'row',
    marginHorizontal: scale(HorizontalPadding),
    alignItems: 'center',
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
    backgroundColor: colors.GRAY_MEDIUM,
  },
  notifier: {
    color: colors.Tertiary,
    fontSize: scale(14),
    fontWeight: 'bold',
    lineHeight: 20,
  },
});
