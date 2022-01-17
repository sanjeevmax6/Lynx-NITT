import React from 'react';
import {TouchableOpacity, Dimensions} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from 'react-native-size-matters';
import moment from 'moment';
import * as colors from '../../utils/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Button, TextInput} from 'react-native-paper';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  eventCreation_DescriptionTitle,
  eventCreation_ImageTitle,
} from '../../utils/stringConstants';
import {observer} from 'mobx-react';
import {EVENT_CREATION_STORE} from '../../mobx/EVENT_CREATION_STORE';
import textInputStyles from './textInputStyles';
import Error from '../../components/Error';

const TIME_FORMAT = 'h:mm A';
const DATE_FORMAT = 'MMMM DD, YYYY';

const WIDTH = Dimensions.get('window').width;

const EventCreationTime = observer(({scrollViewRef, callback}) => {
  const scroll = () => {
    if (EVENT_CREATION_STORE.getDateError !== 0) return;

    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH * 3,
        animated: true,
      });
    }
    callback(eventCreation_ImageTitle, 4);
  };

  const back = () => {
    callback(eventCreation_DescriptionTitle, 2);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH * 1,
        animated: true,
      });
    }
  };

  const onChangeStartDate = newDate => {
    console.log('Date: ', newDate);
    EVENT_CREATION_STORE.setStartEvent(newDate);
  };

  const onChangeEndDate = newDate => {
    EVENT_CREATION_STORE.setEndEvent(newDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.viewScale}
        onPress={() => EVENT_CREATION_STORE.setShowStartPicker(true)}>
        <TextInput
          disabled={true}
          style={textInputStyles.textInputStyle}
          theme={{
            colors: {
              primary: colors.BLACK,
            },
          }}
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          left={
            <TextInput.Icon name="calendar" size={25} color={colors.BLACK} />
          }>
          Event start:{' '}
          {moment(EVENT_CREATION_STORE.getStartEvent).format(DATE_FORMAT)}
          {'  ||  '}
          {moment(EVENT_CREATION_STORE.getStartEvent).format(TIME_FORMAT)}
        </TextInput>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.viewScale}
        onPress={() => EVENT_CREATION_STORE.setShowEndPicker(true)}>
        <TextInput
          disabled={true}
          style={textInputStyles.textInputStyle}
          theme={{
            colors: {
              primary: colors.BLACK,
            },
          }}
          left={
            <TextInput.Icon name="calendar" size={25} color={colors.BLACK} />
          }>
          Event end:{' '}
          {moment(EVENT_CREATION_STORE.getEndEvent).format(DATE_FORMAT)}
          {'  ||  '}
          {moment(EVENT_CREATION_STORE.getEndEvent).format(TIME_FORMAT)}
        </TextInput>
        {EVENT_CREATION_STORE.getDateError === 1 && (
          <Error text="Start date/time must be before end date/time" />
        )}
        {EVENT_CREATION_STORE.getDateError === 2 && (
          <Error text="Start date/time must be after current date/time" />
        )}
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={EVENT_CREATION_STORE.getShowStartPicker}
        date={EVENT_CREATION_STORE.getStartEvent}
        mode="datetime"
        minimumDate={moment().toDate()}
        onConfirm={onChangeStartDate}
        onCancel={() => EVENT_CREATION_STORE.setShowStartPicker(false)}
      />

      <DateTimePickerModal
        isVisible={EVENT_CREATION_STORE.getShowEndPicker}
        date={EVENT_CREATION_STORE.getEndEvent}
        mode="datetime"
        minimumDate={moment().toDate()}
        onConfirm={onChangeEndDate}
        onCancel={() => EVENT_CREATION_STORE.setShowEndPicker(false)}
      />

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
});

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(4),
    width: WIDTH,
  },
  viewScale: {
    //paddingHorizontal: scale(2),
    paddingVertical: verticalScale(4),
    marginHorizontal: scale(HorizontalPadding),
  },
  buttonTextTheme: {
    fontSize: scale(14),
    marginLeft: scale(10),
    color: colors.WHITE,
  },
  switchView: {
    paddingVertical: verticalScale(8),
    backgroundColor: colors.Tertiary,
    borderRadius: moderateScale(9),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(HorizontalPadding),

    marginVertical: verticalScale(2),
  },
  back: {
    position: 'absolute',
    bottom: '20@vs',
    left: '10@vs',
  },
  next: {
    position: 'absolute',
    bottom: '20@vs',
    right: '20@vs',
    backgroundColor: colors.regAttach,
  },
});

export default EventCreationTime;
