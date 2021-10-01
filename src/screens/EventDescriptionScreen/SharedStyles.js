import {ScaledSheet} from 'react-native-size-matters';
import * as colors from '../../utils/colors';

const sharedStyles = ScaledSheet.create({
  fragment: {
    marginHorizontal: '10@s',
    marginVertical: '15@vs',
  },
  title: {
    marginBottom: '10@vs',
    fontSize: '16@s',
    fontWeight: 'bold',
    color: colors.EventDescriptionScreen_Title,
  },
  url: {
    paddingVertical: '4@vs',
    color: colors.EventDescriptionScreen_url,
    fontSize: '14@s',
  },
});
export default sharedStyles;
