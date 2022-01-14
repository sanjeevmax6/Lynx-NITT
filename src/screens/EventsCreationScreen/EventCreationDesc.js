import React from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View, StyleSheet, Dimensions, Keyboard} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {SafeAreaView} from 'react-native-safe-area-context';
import Error from '../../components/Error';
import {
  eventCreation_DateTitle,
  eventCreation_eventTitle,
} from '../../utils/stringConstants';
import {observer} from 'mobx-react';
import {EVENT_CREATION_STORE} from '../../mobx/EVENT_CREATION_STORE';
import textInputStyles from './textInputStyles';

const WIDTH = Dimensions.get('window').width;

const EventCreationDesc = observer(
  ({scrollViewRef, descInputRef, callback}) => {
    //handling scroll
    const scroll = () => {
      if (EVENT_CREATION_STORE.getDescError != 0) {
        return;
      }

      callback(eventCreation_DateTitle, 3);
      if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
          x: WIDTH * 2,
          animated: true,
        });
        Keyboard.dismiss();
      }
    };

    const back = () => {
      callback(eventCreation_eventTitle, 1);
      if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
          x: WIDTH * 0,
          animated: true,
        });
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.viewScale}>
          <TextInput
            ref={descInputRef}
            underlineColor="transparent"
            style={textInputStyles.textInputStyle}
            label="Event Description"
            multiline={true}
            theme={{
              colors: {
                primary: colors.BLACK,
              },
            }}
            selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
            placeholder="Event Description (max 300)"
            value={EVENT_CREATION_STORE.getDesc}
            onChangeText={nDesc => {
              EVENT_CREATION_STORE.setDesc(nDesc);
            }}
            left={<TextInput.Icon name={'text-subject'} color={colors.BLACK} />}
            right={
              <TextInput.Affix
                text={'/' + EVENT_CREATION_STORE.getCharLeftDesc}
                textStyle={{
                  color:
                    EVENT_CREATION_STORE.getDesc.length < 0
                      ? colors.Tertiary
                      : colors.GRAY_DARK,
                }}
              />
            }
          />
          {EVENT_CREATION_STORE.getDescError == 1 && (
            <Error text="Please fill in the Description" />
          )}
          {EVENT_CREATION_STORE.getDescError == 2 && (
            <Error text="Exceeds Word Limit" />
          )}
        </View>

        {/* Navigation Buttons */}
        <Button
          style={styles.next}
          mode="contained"
          onPress={scroll}
          labelStyle={{color: colors.regNext}}>
          Next
        </Button>
        <Button
          style={styles.back}
          mode="outline"
          onPress={back}
          labelStyle={{color: colors.regAttach}}
          icon="chevron-left">
          Back
        </Button>
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(4),
    width: WIDTH,
  },
  viewScale: {
    paddingHorizontal: scale(HorizontalPadding),
    paddingVertical: verticalScale(4),
  },
  wordCount: {
    fontSize: scale(10),
    textAlign: 'right',
    paddingHorizontal: scale(HorizontalPadding),
  },
  next: {
    position: 'absolute',
    bottom: verticalScale(20),
    right: verticalScale(20),
    backgroundColor: colors.regAttach,
  },
  back: {
    position: 'absolute',
    bottom: verticalScale(20),
    left: verticalScale(10),
  },
});

export default EventCreationDesc;
