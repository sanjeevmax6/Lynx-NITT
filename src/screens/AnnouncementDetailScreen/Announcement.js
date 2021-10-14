import React from 'react';
import {Text, View} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import * as colors from '../../utils/colors';

const Announcement = ({description}) => {
  return (
    <View style={{backgroundColor: colors.WHITE}}>
      <View style={styles.background}>
        <Text style={styles.text}>{description}</Text>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  text: {
    alignContent: 'center',
    fontSize: '14@s',
    padding: '6@vs',
    textAlign: 'justify',
    color: colors.WHITE,
  },
  background: {
    backgroundColor: colors.Tertiary,
    marginHorizontal: scale(HorizontalPadding),
    borderRadius: '6@ms',
    marginVertical: '6@vs',
  },
});

export default Announcement;
