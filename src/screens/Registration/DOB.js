import React, {useState} from 'react';
import {View, SafeAreaView, Dimensions, TouchableOpacity} from 'react-native';
import {Colors, TextInput} from 'react-native-paper';
import {
  scale,
  verticalScale,
  ScaledSheet,
  moderateScale,
} from 'react-native-size-matters';
import NextButton from './nextButton';
import BackButton from './backButton';

import * as colors from '../../utils/colors';
import Error from '../../components/Error';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {observer} from 'mobx-react';

const WIDTH = Dimensions.get('window').width;

const Name = observer(({scrollViewRef, callback}) => {
  const [dateEr, setDateEr] = useState(false);
  const [addEr, setAddEr] = useState(false);
  const [datePicker, setDatePicker] = useState(false);

  const scroll = () => {
    if (
      STUDENT_REGISTRATION_STORE.getBirthDay.toDateString() ===
      new Date().toDateString()
    ) {
      setDateEr(true);
      if (!STUDENT_REGISTRATION_STORE.getAddress) {
        setAddEr(true);
      }
      return;
    }
    if (!STUDENT_REGISTRATION_STORE.getAddress.trim()) {
      setDateEr(false);
      setAddEr(true);
      return;
    }
    setAddEr(false);
    setDateEr(false);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH * 2,
        animated: true,
      });
    }
    callback(
      'Documents',
      'Enter Aadhar Number and Upload your passport\n(Optional)',
      2,
    );
  };

  const back = () => {
    callback('Basic Information', 'Enter your name and department', 0);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: 0,
        animated: true,
      });
    }
  };
  const onChangeDate = newDate => {
    const currentDate = newDate || STUDENT_REGISTRATION_STORE.getBirthDay;
    setDatePicker(false);
    STUDENT_REGISTRATION_STORE.setBirthDay(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{...styles.inputAd, marginTop: verticalScale(5)}}
        onPress={() => setDatePicker(true)}>
        <TextInput
          mode="outlined"
          disabled={true}
          theme={{
            colors: {
              primary: dateEr ? colors.Tertiary : 'black',
            },
          }}
          selectionColor={colors.WHITE}
          outlineColor={dateEr ? colors.Tertiary : null}
          left={
            <TextInput.Icon name="calendar" size={25} color={colors.BLACK} />
          }>
          Date of Birth: {STUDENT_REGISTRATION_STORE.getBirthDay.toDateString()}
        </TextInput>
      </TouchableOpacity>

      {dateEr && <Error text="Enter your date of birth" />}
      <TextInput
        label="Address"
        mode="outlined"
        theme={{
          colors: {
            primary: addEr ? colors.Tertiary : 'black',
          },
        }}
        value={STUDENT_REGISTRATION_STORE.getAddress}
        multiline={true}
        outlineColor={addEr ? colors.Tertiary : null}
        style={{...styles.inputAd, marginTop: verticalScale(5)}}
        onChangeText={add => {
          STUDENT_REGISTRATION_STORE.setAddress(add);
        }}
      />
      {addEr && <Error text="Enter your address" />}
      {datePicker && (
        <DateTimePickerModal
          isVisible={datePicker}
          date={STUDENT_REGISTRATION_STORE.getBirthDay}
          mode="date"
          onConfirm={onChangeDate}
          onCancel={() => setDatePicker(false)}
        />
      )}
      <NextButton handler={scroll} />
      <BackButton handler={back} />
    </SafeAreaView>
  );
});

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    backgroundColor: colors.regBackground,
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },
  viewScale: {
    paddingVertical: verticalScale(4),
    //marginHorizontal: scale(HorizontalPadding),
    height: '20%',
  },

  inputAd: {width: '100%'},
});

export default Name;
