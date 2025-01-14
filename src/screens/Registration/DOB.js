import React, {useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {verticalScale, ScaledSheet} from 'react-native-size-matters';
import NextButton from './nextButton';
import BackButton from './backButton';
import * as colors from '../../utils/colors';
import Error from '../../components/Error';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {observer} from 'mobx-react';

const WIDTH = Dimensions.get('window').width;

const Name = observer(({scrollViewRef, callback}) => {
  const [dateEr, setDateEr] = useState(false);
  const [addEr, setAddEr] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const scroll = () => {
    if (!dateSelected) {
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
      'Profile Picture',
      'Upload your profile photo. This photo will be used by NIT Trichy for official purposes.',
      2,
    );
    Keyboard.dismiss();
  };

  const back = () => {
    callback('Basic Information', 'Enter basic profile information', 0);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: 0,
        animated: true,
      });
    }
  };
  const onChangeDate = newDate => {
    const currentDate = newDate || STUDENT_REGISTRATION_STORE.getBirthDay;
    setDateSelected(true);
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
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          outlineColor={dateEr ? colors.Tertiary : null}
          left={
            <TextInput.Icon name="calendar" size={25} color={colors.BLACK} />
          }>
          {dateSelected
            ? 'Date of Birth: ' +
              STUDENT_REGISTRATION_STORE.getBirthDay.toDateString()
            : 'Select your date of Birth'}
        </TextInput>
      </TouchableOpacity>

      {dateEr && <Error text="Enter your date of birth" />}
      <TextInput
        label="Full Address"
        mode="outlined"
        theme={{
          colors: {
            primary: addEr ? colors.Tertiary : 'black',
          },
        }}
        value={STUDENT_REGISTRATION_STORE.getAddress}
        multiline={true}
        selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
        outlineColor={addEr ? colors.Tertiary : null}
        style={{...styles.inputAd, marginTop: verticalScale(5)}}
        onChangeText={add => {
          STUDENT_REGISTRATION_STORE.setAddress(add);
        }}
      />
      {addEr && <Error text="Enter your full address" />}
      {datePicker && (
        <DateTimePickerModal
          isVisible={datePicker}
          date={STUDENT_REGISTRATION_STORE.getBirthDay}
          mode="date"
          onConfirm={onChangeDate}
          onCancel={() => setDatePicker(false)}
          maximumDate={new Date(2000, 11, 31).setFullYear(
            //the year given in first construct (ie 2000)is irrelevent
            //as we r setting the year to the range 32 years to 12 years in past
            new Date().getFullYear() - 12,
          )}
          minimumDate={new Date(2000, 0, 1).setFullYear(
            new Date().getFullYear() - 32,
          )}
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
