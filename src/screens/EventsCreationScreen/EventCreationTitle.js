import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View, StyleSheet, Dimensions, Keyboard} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {SafeAreaView} from 'react-native-safe-area-context';
import Error from '../../components/Error';
import {eventCreation_DescriptionTitle} from '../../utils/stringConstants';
import {observer} from 'mobx-react';
import {EVENT_CREATION_STORE} from '../../mobx/EVENT_CREATION_STORE';
import textInputStyles from './textInputStyles';

const WIDTH = Dimensions.get('window').width;

const EventCreationTitle = observer(({scrollViewRef, callback}) => {
  //Handling scroll
  const scroll = () => {
    if (EVENT_CREATION_STORE.getTitleError) {
      return;
    }

    callback(eventCreation_DescriptionTitle, 2);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          label="Event Title"
          style={textInputStyles.textInputStyle}
          placeholder="Event Title (max 150)"
          multiline={true}
          value={EVENT_CREATION_STORE.getTitle}
          theme={{
            colors: {
              primary: colors.BLACK,
            },
          }}
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          onChangeText={nTitle => {
            EVENT_CREATION_STORE.setTitle(nTitle);
          }}
          left={<TextInput.Icon name={'lead-pencil'} color={colors.Accent} />}
          right={
            <TextInput.Affix
              text={'/' + EVENT_CREATION_STORE.getCharLeftTitle}
              textStyle={{
                color:
                  EVENT_CREATION_STORE.getTitle.length < 0
                    ? colors.Tertiary
                    : colors.GRAY_DARK,
              }}
            />
          }
        />
        {EVENT_CREATION_STORE.getTitleError == 1 && (
          <Error text="Please fill in the Title" />
        )}
        {EVENT_CREATION_STORE.getTitleError == 2 && (
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
    </SafeAreaView>
  );
});

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
});

export default EventCreationTitle;
