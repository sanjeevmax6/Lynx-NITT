import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import moment from 'moment';
import * as color from '../../utils/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TextInput} from 'react-native-paper';
import {EVENT_EDIT_STORE} from '../../mobx/EVENT_EDIT_STORE';
import {observer} from 'mobx-react';
import styles from './styles';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const TIME_FORMAT = 'h:mm A';
const DATE_FORMAT = 'MMMM DD, YYYY';

const EventEditDateTime = observer(() => {
  const onChangeEndEvent = newEnd => {
    EVENT_EDIT_STORE.setEditEndEvent(newEnd);
  };

  const onChangeStartEvent = newStart => {
    EVENT_EDIT_STORE.setEditStartEvent(newStart);
  };

  return (
    <View>
      <View style={s.startEndDisplayBg}>
        <View style={s.startEndDisplay}>
          <Text style={s.startEndDisplayText}>EVENT START</Text>
        </View>
        <TouchableOpacity
          style={styles.viewScale}
          onPress={() => EVENT_EDIT_STORE.setShowStartPicker(true)}>
          <TextInput
            style={styles.textInputStyles}
            disabled={true}
            left={
              <TextInput.Icon name="calendar" size={25} color={color.BLACK} />
            }>
            On {moment(EVENT_EDIT_STORE.getEditStartEvent).format(DATE_FORMAT)},
            At {moment(EVENT_EDIT_STORE.getEditStartEvent).format(TIME_FORMAT)}
          </TextInput>
        </TouchableOpacity>
      </View>

      <View style={s.startEndDisplayBg}>
        <View style={s.startEndDisplay}>
          <Text style={s.startEndDisplayText}>EVENT END</Text>
        </View>
        <TouchableOpacity
          style={styles.viewScale}
          onPress={() => EVENT_EDIT_STORE.setShowEndPicker(true)}>
          <TextInput
            style={styles.textInputStyles}
            disabled={true}
            left={
              <TextInput.Icon name="calendar" size={25} color={color.BLACK} />
            }>
            On {moment(EVENT_EDIT_STORE.getEditEndEvent).format(DATE_FORMAT)},
            At {moment(EVENT_EDIT_STORE.getEditEndEvent).format(TIME_FORMAT)}
          </TextInput>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={EVENT_EDIT_STORE.getShowStartPicker}
        date={EVENT_EDIT_STORE.getEditStartEvent}
        mode="datetime"
        onConfirm={onChangeStartEvent}
        onCancel={() => EVENT_EDIT_STORE.setShowStartPicker(false)}
      />

      <DateTimePickerModal
        isVisible={EVENT_EDIT_STORE.getShowEndPicker}
        date={EVENT_EDIT_STORE.getEditEndEvent}
        mode="datetime"
        onConfirm={onChangeEndEvent}
        onCancel={() => EVENT_EDIT_STORE.setShowEndPicker(false)}
      />
    </View>
  );
});

const s = StyleSheet.create({
  startEndDisplay: {
    height: verticalScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orangered',
    borderRadius: moderateScale(9),
    marginHorizontal: scale(HorizontalPadding),
    marginTop: verticalScale(4),
  },
  startEndDisplayText: {
    fontSize: 16,
    color: 'white',
  },
  startEndDisplayBg: {
    borderRadius: moderateScale(9),
    backgroundColor: 'tomato',
    marginHorizontal: scale(9),
    paddingVertical: verticalScale(5),
    marginVertical: verticalScale(4),
  },
});

export default EventEditDateTime;
