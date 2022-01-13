import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ICON_SIZE} from '../../utils/UI_CONSTANTS';
import * as colors from '../../utils/colors';
import {scale} from 'react-native-size-matters';

const LiveEventComponent = ({isLive, onDeletePress}) => {
  return isLive ? (
    <View style={styles.container}>
      <Icon
        name={'circle'}
        size={scale(10)}
        style={{color: colors.EventCard_IsLive}}
      />
      <Text style={styles.textStyle}>LIVE</Text>
    </View>
  ) : (
    <TouchableOpacity onPress={onDeletePress}>
      <Icon
        name={'delete'}
        size={scale(ICON_SIZE)}
        style={{color: colors.Tertiary}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: scale(9),
    marginHorizontal: scale(2),
    fontWeight: 'bold',
    color: colors.GRAY_DARK,
  },
});

export default LiveEventComponent;