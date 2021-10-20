import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import * as colors from '../../utils/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import {HeaderHeight} from '../../utils/UI_CONSTANTS';
import Icon from 'react-native-vector-icons/MaterialIcons';

const backheader = ({navigation}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back"
          size={HeaderHeight - 9}
          color={colors.Tertiary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default backheader;

const styles = StyleSheet.create({
  divider: {
    height: '2@vs',
    marginBottom: '3@vs',
    backgroundColor: colors.GRAY_LIGHT,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: verticalScale(HeaderHeight),
    shadowColor: colors.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 6,
    zIndex: 6,
    backgroundColor: colors.WHITE,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
});
