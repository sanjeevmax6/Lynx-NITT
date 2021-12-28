import React from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import * as colors from '../../utils/colors';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import {observer} from 'mobx-react';

const TEXT_INPUT = ({
  placeholder,
  label,
  icon,
  onTextChange,
  showCharCount,
  charCount,
  maxLength = 1000,
  keyboardType = 'default',
  multiline = false,
}) => {
  return (
    <TextInput
      underlineColor="transparent"
      label={label}
      maxLength={maxLength}
      style={{
        backgroundColor: colors.GRAY_LIGHT,
        borderTopRightRadius: moderateScale(6),
        borderTopLeftRadius: moderateScale(6),
        marginHorizontal: scale(HorizontalPadding),
        marginTop: verticalScale(3),
      }}
      placeholder={placeholder}
      multiline={multiline}
      keyboardType={keyboardType}
      theme={{
        colors: {
          primary: colors.BLACK,
        },
      }}
      onChangeText={text => {
        onTextChange(text);
      }}
      left={<TextInput.Icon name={icon} color={colors.Accent} />}
      right={
        showCharCount ? (
          <TextInput.Affix
            text={'/' + charCount}
            textStyle={{
              color: charCount < 0 ? colors.Tertiary : colors.GRAY_DARK,
            }}
          />
        ) : (
          <></>
        )
      }
    />
  );
};
const MAX_DESCRIPTION_CHAR_LIMIT = 500;
const EditDescription = observer(() => {
  return (
    <View>
      <TEXT_INPUT
        label={'Club Description'}
        placeholder={'Club Description'}
        icon={'information'}
        multiline={true}
        onTextChange={text => {
          EDIT_CLUB_PROFILE_STORE.setClubDescription(text);
        }}
        showCharCount={true}
        charCount={
          MAX_DESCRIPTION_CHAR_LIMIT -
          EDIT_CLUB_PROFILE_STORE.getClubDescription.length
        }
      />
    </View>
  );
});

export default EditDescription;
