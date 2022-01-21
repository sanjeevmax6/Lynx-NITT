import React from 'react';
import {View, Text} from 'react-native';
import {
  moderateScale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {TextInput, Button} from 'react-native-paper';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import {observer} from 'mobx-react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CLUB_DESCRIPTION_MAX_SIZE} from '../../utils/UI_CONSTANTS';
import {useToast} from 'react-native-toast-notifications';

const ClubDescription = observer(({forwardAction}) => {
  const toast = useToast();

  const showToast = msg => {
    toast.show(msg, {type: 'warning'});
  };

  const checkError = () => {
    if (EDIT_CLUB_PROFILE_STORE.getClubDescription.trim() === '')
      showToast('Fill in your club description');
    else {
      forwardAction();
    }
  };

  const remainCharacter =
    CLUB_DESCRIPTION_MAX_SIZE -
    EDIT_CLUB_PROFILE_STORE.getClubDescription.length;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.Secondary,
      }}>
      <Text style={{...styles.title, marginTop: verticalScale(5)}}>
        Give your club a description!
      </Text>
      <TextInput
        underlineColor="transparent"
        value={EDIT_CLUB_PROFILE_STORE.getClubDescription}
        label="Club Description"
        style={{
          backgroundColor: colors.GRAY_LIGHT,
          borderTopRightRadius: moderateScale(9),
          borderTopLeftRadius: moderateScale(9),
          borderBottomLeftRadius: moderateScale(9),
          borderBottomRightRadius: moderateScale(9),
          width: '90%',
          marginTop: verticalScale(10),
        }}
        placeholder="Club Description"
        multiline={true}
        theme={{
          colors: {
            primary: colors.BLACK,
          },
        }}
        selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
        onChangeText={text => {
          EDIT_CLUB_PROFILE_STORE.setClubDescription(text);
        }}
        left={<TextInput.Icon name={'lead-pencil'} color={colors.Accent} />}
        right={
          <TextInput.Affix
            text={'/' + remainCharacter}
            textStyle={{
              color: remainCharacter < 0 ? colors.Tertiary : colors.GRAY_DARK,
            }}
          />
        }
      />
      <View style={{width: '90%'}}></View>
      <Button
        style={styles.next}
        mode="contained"
        disabled={remainCharacter < 0 ? true : false}
        onPress={checkError}
        labelStyle={{color: colors.regNext}}>
        Next
      </Button>
    </SafeAreaView>
  );
});

export default ClubDescription;

const styles = ScaledSheet.create({
  title: {
    fontSize: '16@s',
    color: colors.FontColor,
    fontWeight: '500',
    marginTop: '18@vs',
  },
  next: {
    position: 'absolute',
    bottom: verticalScale(20),
    right: verticalScale(20),
    backgroundColor: colors.regAttach,
  },
});
