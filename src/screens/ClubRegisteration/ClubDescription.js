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
import {CLUB_REGISTRATION_STORE} from '../../mobx/CLUB_REGISTRATION';
import {observer} from 'mobx-react';

const charLen = 500;
const ClubDescription = observer(({forwardAction}) => {
  const remainCharacter =
    charLen - CLUB_REGISTRATION_STORE.getClubDescription.length;
  return (
    <View
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
        onChangeText={text => {
          CLUB_REGISTRATION_STORE.setClubDescription(text);
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
      <Button
        style={styles.next}
        mode="contained"
        disabled={remainCharacter < 0 ? true : false}
        onPress={forwardAction}
        labelStyle={{color: colors.regNext}}>
        Next
      </Button>
    </View>
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
