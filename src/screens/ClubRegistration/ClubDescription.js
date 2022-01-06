import React from 'react';
import {View, Text} from 'react-native';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {TextInput, Button} from 'react-native-paper';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import {observer} from 'mobx-react';
import {CLUB_REGISTER_STORE} from '../../mobx/CLUB_REGISTER_STORE';
import Error from '../../components/Error';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const charLen = 500;
const ClubDescription = observer(({forwardAction}) => {
  const checkError = () => {
    if (remainCharacter == charLen) CLUB_REGISTER_STORE.setError(true);
    else {
      forwardAction();
      CLUB_REGISTER_STORE.setError(false);
    }
  };
  const remainCharacter =
    charLen - EDIT_CLUB_PROFILE_STORE.getClubDescription.length;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.Secondary,
      }}>
      <Text style={styles.title}>Hello {'Spider'}</Text>
      <Text style={{...styles.title, marginTop: verticalScale(5)}}>
        Give your club a description!
      </Text>
      <TextInput
        underlineColor="transparent"
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
        placeholder="Club Description (max 500)"
        multiline={true}
        theme={{
          colors: {
            primary: colors.BLACK,
          },
        }}
        selectionColor={colors.WHITE}
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
      <View style={{width: '90%'}}>
        {CLUB_REGISTER_STORE.getError && (
          <Error text={'Please Enter a description for your club!'} />
        )}
      </View>
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
