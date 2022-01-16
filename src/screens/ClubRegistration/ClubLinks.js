import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {TextInput, Button, ActivityIndicator} from 'react-native-paper';
import {checkClubLinks} from '../../utils/helperFunction/FormValidation';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import {observer} from 'mobx-react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {clubRegisterAPI} from './ClubRegistrationAPI';
import {CLUB_REGISTER_STORE} from '../../mobx/CLUB_REGISTER_STORE';
import Error from '../../components/Error';

const TEXT_INPUT = observer(
  ({placeholder, label = placeholder, icon, onTextChange, value, index}) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: colors.Secondary,
          width: '100%',
        }}>
        <TextInput
          underlineColor="transparent"
          value={value}
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
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          onChangeText={text => {
            onTextChange(text);
          }}
          left={<TextInput.Icon name={icon} color={colors.Accent} />}
        />
        {CLUB_REGISTER_STORE.getLinkError[index] === true && (
          <View style={{width: '90%'}}>
            <Error text={'Enter a valid ' + placeholder} />
          </View>
        )}
      </View>
    );
  },
);
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
          value={EDIT_CLUB_PROFILE_STORE.getWebsiteLink}
          onTextChange={val => {
            EDIT_CLUB_PROFILE_STORE.setWebsiteLink(val);
          }}
          index={0}
        />
        <TEXT_INPUT
          placeholder={'Instagram Link'}
          label={'Instagram Link'}
          icon={'instagram'}
          value={EDIT_CLUB_PROFILE_STORE.getInstagramLink}
          onTextChange={val => {
            EDIT_CLUB_PROFILE_STORE.setInstagramLink(val);
          }}
          index={1}
        />
        <TEXT_INPUT
          placeholder={'Facebook Link'}
          label={'Facebook Link'}
          icon={'facebook'}
          value={EDIT_CLUB_PROFILE_STORE.getFacebookLink}
          onTextChange={val => {
            EDIT_CLUB_PROFILE_STORE.setFacebookLink(val);
          }}
          index={2}
        />
        <TEXT_INPUT
          placeholder={'Youtube Link'}
          label={'Youtube Link'}
          icon={'youtube'}
          value={EDIT_CLUB_PROFILE_STORE.getYoutubeLink}
          onTextChange={val => {
            EDIT_CLUB_PROFILE_STORE.setYoutubeLink(val);
          }}
          index={3}
        />
        <TEXT_INPUT
          placeholder={'LinkedIn Link'}
          label={'LinkedIn Link'}
          value={EDIT_CLUB_PROFILE_STORE.getLinkedInLink}
          icon={'linkedin'}
          onTextChange={val => {
            EDIT_CLUB_PROFILE_STORE.setLinkedInLink(val);
          }}
          index={4}
        />
        <TEXT_INPUT
          placeholder={'Medium Link'}
          label={'Medium Link'}
          icon={'alpha-m-box'}
          value={EDIT_CLUB_PROFILE_STORE.getMediumLink}
          onTextChange={val => {
            EDIT_CLUB_PROFILE_STORE.setMediumLink(val);
          }}
          index={5}
        />

        {CLUB_REGISTER_STORE.getLoading && (
          <View style={{paddingTop: verticalScale(5)}}>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        )}
        {CLUB_REGISTER_STORE.getError && (
          <View style={{width: '90%'}}>
            <Error text={'' + CLUB_REGISTER_STORE.getErrorText} />
          </View>
        )}
        <View
          style={{
            height: verticalScale(170),
            width: scale(50),
          }}
        />

        <Button
          style={styles.next}
          mode="contained"
          onPress={async () => {
            const er = await checkClubLinks();
            if (!er) clubRegisterAPI();
          }}
          labelStyle={{color: colors.regNext}}>
          Submit
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
