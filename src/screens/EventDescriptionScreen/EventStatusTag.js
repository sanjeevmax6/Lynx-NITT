import React from 'react';
import {View, Text} from 'react-native';
import {isLive} from '../../utils/helperFunction/isLive';
import * as colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scale, verticalScale} from 'react-native-size-matters';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const UI = ({text, color}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginHorizontal: scale(HorizontalPadding),
        elevation: 1,
        justifyContent: 'center',
        //marginTop: verticalScale(-6),
      }}>
      <Icon name="circle" color={color} size={scale(10)} />
      <Text
        style={{
          fontSize: scale(14),
          color: colors.GRAY_DARK,
        }}>
        {' '}
        {text}
      </Text>
    </View>
  );
};
const EventStatusTag = ({startTime, endTime}) => {
  return (
    <View>
      {isLive(startTime, endTime) ? (
        <>
          <UI text={'Live'} color={colors.LIVE} />
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default EventStatusTag;
