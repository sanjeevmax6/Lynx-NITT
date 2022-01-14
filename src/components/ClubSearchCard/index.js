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
          <Image
            style={styles.clubIcon}
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color={color.Secondary} />}
            source={{
              uri:
                clubIconUrl === '' ? NO_IMAGE_URL : API_GET_IMAGE + clubIconUrl,
            }}
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
    marginTop: verticalScale(2),
    marginBottom: verticalScale(3),
    flex: 1,
  },
  center: {
    height: scale(60),
    width: scale(60),
    marginLeft: scale(5),
    borderRadius: scale(150),
    justifyContent: 'center',
    elevation: 1,
  },
  clubIcon: {
    justifyContent: 'center',
    width: scale(60),
    height: scale(60),
    backgroundColor: color.GRAY_LIGHT,
    borderRadius: scale(120),
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
    borderBottomColor: color.GRAY_MEDIUM,
    margin: moderateScale(2),
    borderBottomWidth: verticalScale(1),
  },

  followText: {
    fontSize: scale(12),
    color: color.GRAY_DARK,
  },
});
