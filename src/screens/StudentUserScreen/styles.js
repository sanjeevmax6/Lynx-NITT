import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';
import * as color from '../../utils/colors';
import * as uiConstants from '../../utils/UI_CONSTANTS';

export const listItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: color.WHITE,
    alignItems: 'center',
    marginHorizontal: scale(uiConstants.HorizontalPadding),
    marginVertical: verticalScale(3),
    padding: moderateScale(10),
    borderRadius: moderateScale(6),
    elevation: 2,
  },
  textStyle: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    flex: 1,
    marginEnd: scale(8),
  },
  buttonStyles: {
    //flex: 1,
  },
  viewStyle: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: moderateScale(9),
    justifyContent: 'center',
    alignSelf: 'center',
    width: moderateScale(50),
    height: moderateScale(50),
    marginRight: scale(10),
    elevation: 0,
  },
});

export const listScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStyle: {
    flex: 1,
  },
});
