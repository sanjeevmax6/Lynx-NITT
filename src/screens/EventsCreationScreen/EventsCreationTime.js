import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Dimensions,
} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from 'react-native-size-matters';
import moment from 'moment';
import * as color from '../../utils/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Button, TextInput} from 'react-native-paper';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  eventCreation_DescriptionTitle,
  eventCreation_ImageTitle,
} from '../../utils/stringConstants';

const TIME_FORMAT = 'h:mm A';
const DATE_FORMAT = 'MMMM DD, YYYY';

const WIDTH = Dimensions.get('window').width;

const EventsCreationTime = ({
  timeStates,
  dateStates,
  scrollViewRef,
  callback,
}) => {
  //Handling Scroll
  const scroll = () => {
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
  //

  const toggleSwitch = () => {
    timeStates.setAllDaySwitch(prevVal => {
      return !prevVal;
    });
  };

  const onChangeTime = newTime => {
    const currentTime = newTime || timeStates.time;
    timeStates.setTimePicker(false);
    timeStates.setTime(currentTime);
  };

  const onChangeDate = newDate => {
    const currentDate = newDate || dateStates.date;
    dateStates.setDatePicker(false);
    dateStates.setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.switchView}>
        <Text style={styles.buttonTextTheme}>All day event? </Text>
        <Switch
          trackColor={{false: color.Primary, true: color.Accent}}
          thumbColor={timeStates.allDaySwitch ? color.WHITE : color.WHITE}
          ios_backgroundColor={color.iosBackgroundColor}
          onValueChange={toggleSwitch}
          value={timeStates.allDaySwitch}
        />
      </View>

      <TouchableOpacity
        style={styles.viewScale}
        onPress={() => dateStates.setDatePicker(true)}>
        <TextInput
          disabled={true}
          style={{
            backgroundColor: color.GRAY_LIGHT,
            borderTopRightRadius: moderateScale(9),
            borderTopLeftRadius: moderateScale(9),
            borderBottomLeftRadius: moderateScale(9),
            borderBottomRightRadius: moderateScale(9),
          }}
          theme={{
            colors: {
              primary: color.BLACK,
            },
          }}
          left={
            <TextInput.Icon name="calendar" size={25} color={color.BLACK} />
          }>
          Event on: {moment(dateStates.date).format(DATE_FORMAT)}
        </TextInput>
      </TouchableOpacity>

      {!timeStates.allDaySwitch && (
        <TouchableOpacity
          style={styles.viewScale}
          onPress={() => {
            timeStates.setTimePicker(true);
          }}>
          <TextInput
            disabled={true}
            style={{
              backgroundColor: color.GRAY_LIGHT,
              borderTopRightRadius: moderateScale(9),
              borderTopLeftRadius: moderateScale(9),
              borderBottomLeftRadius: moderateScale(9),
              borderBottomRightRadius: moderateScale(9),
            }}
            theme={{
              colors: {
                primary: color.BLACK,
              },
            }}
            left={
              <TextInput.Icon name="clock" size={25} color={color.BLACK} />
            }>
            Time: {moment(timeStates.time).format(TIME_FORMAT)}
          </TextInput>
        </TouchableOpacity>
      )}

      {dateStates.showDatePicker && (
        <DateTimePickerModal
          isVisible={dateStates.showDatePicker}
          date={dateStates.date}
          mode="date"
          onConfirm={onChangeDate}
          onCancel={() => dateStates.setDatePicker(false)}
        />
      )}

      {timeStates.showTimePicker && (
        <DateTimePickerModal
          isVisible={timeStates.showTimePicker}
          date={timeStates.time}
          mode="time"
          onConfirm={onChangeTime}
          onCancel={() => timeStates.setTimePicker(false)}
        />
      )}

      {/* Navigation Buttons */}
      <Button
        style={styles.next}
        mode="contained"
        onPress={scroll}
        labelStyle={{color: color.regNext}}>
        Next
      </Button>
      <Button
        style={styles.back}
        mode="outline"
        onPress={back}
        labelStyle={{color: color.regAttach}}
        icon="chevron-left">
        Back
      </Button>
    </SafeAreaView>
  );
};

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
    color: color.WHITE,
  },
  switchView: {
    paddingVertical: verticalScale(8),
    backgroundColor: color.Tertiary,
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
    backgroundColor: color.regAttach,
  },
});

export default EventsCreationTime;
