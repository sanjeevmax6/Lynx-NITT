import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Switch} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import moment from 'moment';
import * as color from '../../utils/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TextInput} from 'react-native-paper';

const TIME_FORMAT = 'h:mm A';
const DATE_FORMAT = 'MMMM DD, YYYY';

const EventsCreationTime = ({timeStates, dateStates}) => {
  const toggleSwitch = () => {
    timeStates.setAllDaySwitch(prevVal => {
      return !prevVal;
    });
  };

  const onChangeTime = newTime => {
    const currentTime = newTime || timeStates.time;
    timeStates.setTime(currentTime);
    timeStates.setTimePicker(false);
  };

  const onChangeDate = newDate => {
    const currentDate = newDate || dateStates.date;
    dateStates.setDate(currentDate);
    dateStates.setDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchView}>
        <Text style={styles.buttonTextTheme}>All day event? </Text>
        <Switch
          trackColor={{false: '#767577', true: '#767577'}}
          thumbColor={timeStates.allDaySwitch ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={timeStates.allDaySwitch}
        />
      </View>

      <TouchableOpacity
        style={styles.viewScale}
        onPress={() => dateStates.setDatePicker(true)}>
        <TextInput
          disabled={true}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(4),
  },
  viewScale: {
    paddingHorizontal: scale(2),
    paddingVertical: verticalScale(4),
  },
  buttonViewTheme: {
    fontSize: 16,
    padding: moderateScale(8),
    backgroundColor: color.Secondary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextTheme: {
    fontSize: 16,
    marginLeft: scale(10),
    color: color.WHITE,
  },
  switchView: {
    fontSize: 16,
    padding: moderateScale(8),
    backgroundColor: color.GRAY_DARK,
    borderRadius: moderateScale(5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(10),
    marginVertical: verticalScale(2),
  },
});

export default EventsCreationTime;
