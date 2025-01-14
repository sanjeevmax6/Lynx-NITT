import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as color from '../../utils/colors';

import {HorizontalPadding, ICON_SIZE} from '../../utils/UI_CONSTANTS';
import {API_GET_IMAGE, NO_IMAGE_URL} from '../../utils/API_CONSTANTS';
import ImageView from '../ImageView';

const ClubSearchCard = ({
  clubIconUrl,
  clubName,
  clubDescription,
  navigation,
  id,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ClubDescription', {ClubId: id}, {initial: false});
      }}>
      <View style={styles.container}>
        <View style={styles.center}>
          <ImageView
            style={styles.clubIcon}
            PlaceholderContent={<ActivityIndicator color={color.Secondary} />}
            src={
              clubIconUrl === '' ? NO_IMAGE_URL : API_GET_IMAGE + clubIconUrl
            }
            resizeMode="cover"
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.headerText}>{clubName}</Text>
          <Text numberOfLines={2} style={styles.itemText}>
            {clubDescription}
          </Text>
        </View>
      </View>
      <View style={styles.line} />
    </TouchableOpacity>
  );
};

export default ClubSearchCard;

const styles = StyleSheet.create({
  containerOverall: {
    margin: scale(0),
    flexDirection: 'column',
    flex: 1,
  },

  container: {
    paddingHorizontal: scale(HorizontalPadding),
    flexDirection: 'row',
    paddingVertical: verticalScale(6),
    flex: 1,
    backgroundColor: 'white',
  },
  center: {
    height: scale(60),
    width: scale(60),
    marginLeft: scale(5),
    borderRadius: scale(150),
    justifyContent: 'center',
    elevation: 0,
    backgroundColor: color.WHITE,
  },
  clubIcon: {
    justifyContent: 'center',
    width: scale(60),
    height: scale(60),
    backgroundColor: color.WHITE,
    borderRadius: scale(2),
    elevation: 0,
  },

  headerText: {
    fontSize: scale(14),
    fontWeight: 'bold',
  },

  item: {
    flex: 1,
    marginLeft: scale(13),
    justifyContent: 'center',
    flexDirection: 'column',
  },

  itemText: {
    fontSize: scale(12),
  },

  iconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: scale(5),
  },

  line: {
    backgroundColor: color.GRAY_LIGHT,
    margin: moderateScale(0),
    height: verticalScale(1),
    marginHorizontal: scale(10),
  },

  followText: {
    fontSize: scale(12),
    color: color.GRAY_DARK,
  },
});
