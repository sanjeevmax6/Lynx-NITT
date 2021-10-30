import React from 'react';
import {SafeAreaView, Dimensions, View} from 'react-native';
import {Text} from 'react-native-paper';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';

import * as colors from '../../utils/colors';

const WIDTH = Dimensions.get('window').width;

const Error = ({text}) => {
  return (
    <View style={styles.container}>
      <Icon name="exclamationcircle" color={colors.Tertiary} size={14} />
      <Text style={styles.errorText}>{text}</Text>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: '5@vs',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  errorText: {
    color: colors.Tertiary,
    marginLeft: '5@s',
  },
});

export default Error;
