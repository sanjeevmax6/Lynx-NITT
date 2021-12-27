import React from 'react';
import {View, Text, ScrollView} from 'react-native';
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
import Icon from 'react-native-vector-icons/Fontisto';

const TEXT_INPUT = ({placeholder, label = placeholder, icon}) => {
  return (
    <TextInput
      underlineColor="transparent"
      label={label}
      style={{
        backgroundColor: colors.GRAY_LIGHT,
        borderTopRightRadius: moderateScale(9),
        borderTopLeftRadius: moderateScale(9),
        borderBottomLeftRadius: moderateScale(9),
        borderBottomRightRadius: moderateScale(9),
        width: '90%',
        marginTop: verticalScale(10),
      }}
      placeholder={placeholder}
      multiline={false}
      theme={{
        colors: {
          primary: colors.BLACK,
        },
      }}
      onChangeText={text => {
        CLUB_REGISTRATION_STORE.setInstagramLink(text);
      }}
      left={<TextInput.Icon name={icon} color={colors.Accent} />}
    />
  );
};
const ClubLinks = observer(({backwardAction}) => {
  return (
    <ScrollView style={{backgroundColor: colors.Secondary}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: colors.Secondary,
          width: '100%',
        }}>
        <Text style={styles.title}>Add your URLs!</Text>
        <TEXT_INPUT
          placeholder={'Website Link'}
          label={'Website Link'}
          icon={'google-chrome'}
        />
        <TEXT_INPUT
          placeholder={'Instagram Link'}
          label={'Instagram Link'}
          icon={'instagram'}
        />
        <TEXT_INPUT
          placeholder={'Facebook Link'}
          label={'Facebook Link'}
          icon={'facebook'}
        />
        <TEXT_INPUT
          placeholder={'Youtube Link'}
          label={'Youtube Link'}
          icon={'youtube'}
        />
        <TEXT_INPUT
          placeholder={'LinkedIn Link'}
          label={'LinkedIn Link'}
          icon={'linkedin'}
        />
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',

            marginTop: verticalScale(10),
          }}>
          <Icon
            name="medium"
            size={18}
            color={colors.Accent}
            style={{
              position: 'absolute',
              elevation: 1,
              left: scale(33),
            }}
          />
          <TextInput
            underlineColor="transparent"
            label="Medium Link"
            style={{
              backgroundColor: colors.GRAY_LIGHT,
              borderTopRightRadius: moderateScale(9),
              borderTopLeftRadius: moderateScale(9),
              borderBottomLeftRadius: moderateScale(9),
              borderBottomRightRadius: moderateScale(9),
              paddingLeft: scale(30),
              width: '90%',
            }}
            placeholder="Medium Link"
            multiline={false}
            theme={{
              colors: {
                primary: colors.BLACK,
              },
            }}
            onChangeText={text => {
              CLUB_REGISTRATION_STORE.setInstagramLink(text);
            }}
          />
        </View>
        <View
          style={{
            height: verticalScale(170),

            width: scale(50),
          }}
        />

        <Button
          style={styles.next}
          mode="contained"
          onPress={() => {
            console.log('Do Api Call');
          }}
          labelStyle={{color: colors.regNext}}>
          Next
        </Button>
        <Button
          style={styles.back}
          mode="outline"
          onPress={() => {
            backwardAction();
          }}
          labelStyle={{color: colors.regAttach}}
          icon="chevron-left">
          Back
        </Button>
      </View>
    </ScrollView>
  );
});

export default ClubLinks;

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
  back: {
    position: 'absolute',
    bottom: '20@vs',
    left: '10@vs',
  },
});
