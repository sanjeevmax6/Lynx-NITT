import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as colors from '../../utils/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import {HeaderHeight} from '../../utils/UI_CONSTANTS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const PageHeader = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: colors.headerBackground,
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: scale(16),
    fontWeight: 'bold',
    paddingHorizontal: scale(HorizontalPadding),
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default PageHeader;
