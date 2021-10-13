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
import Icon from 'react-native-vector-icons/Ionicons';
import {HorizontalPadding, ICON_SIZE} from '../../utils/UI_CONSTANTS';

const ClubSearchCard = ({
  clubIconUrl,
  clubName,
  clubDescription,
  isFollowing,
}) => {
  return (
    <TouchableOpacity>
      <View>
        <View style={styles.container}>
          <View style={styles.center}>
            <Image
              style={styles.clubIcon}
              PlaceholderContent={<ActivityIndicator color={color.Secondary} />}
              source={{uri: clubIconUrl}}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.headerText}>{clubName}</Text>
            <Text numberOfLines={1} style={styles.itemText}>
              {clubDescription}
            </Text>
            {isFollowing ? (
              <Text style={styles.followText}>Following</Text>
            ) : null}
          </View>
          <View style={styles.center}>
            <TouchableOpacity>
              <View style={styles.iconStyle}>
                <Icon
                  name="close"
                  justifyContent="center"
                  size={scale(ICON_SIZE)}
                  color={color.GRAY_DARK}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line} />
      </View>
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
    height: verticalScale(60),
    flex: 1,
  },

  clubIcon: {
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    width: scale(50),
    marginLeft: scale(5),
    height: verticalScale(50),
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

  center: {
    justifyContent: 'center',
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
