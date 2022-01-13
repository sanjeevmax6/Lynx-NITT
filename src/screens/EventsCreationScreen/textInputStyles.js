import * as colors from '../../utils/colors';
import {moderateScale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';

export default textInputStyles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: colors.GRAY_LIGHT,
    borderTopRightRadius: moderateScale(9),
    borderTopLeftRadius: moderateScale(9),
    borderBottomLeftRadius: moderateScale(9),
    borderBottomRightRadius: moderateScale(9),
  },
});
