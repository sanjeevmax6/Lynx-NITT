import React, {useState, useRef} from 'react';
import {SafeAreaView, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
import {verticalScale, ScaledSheet} from 'react-native-size-matters';
import NextButton from './nextButton';

import * as colors from '../../utils/colors';
import Error from '../../components/Error';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';

const WIDTH = Dimensions.get('window').width;

const Name = ({scrollViewRef, callback}) => {
  const [er, setEr] = useState(false);
  const [erMsg, setErMsg] = useState('');

  const scroll = () => {
    if (
      !STUDENT_REGISTRATION_STORE.getFirstName ||
      !STUDENT_REGISTRATION_STORE.getLastName
    ) {
      setEr(true);
      setErMsg('Enter your name');
      return;
    }
    if (!STUDENT_REGISTRATION_STORE.getDepartment) {
      setEr(true);
      setErMsg('Enter your Department');
      return;
    }
    setEr(false);

    callback('Basic Information', 'Enter your date of birth and address', 1);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH,
        animated: true,
      });
    }
  };

  const lastNameInput = useRef(); // for focus transfer
  const departmentInput = useRef();

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label="First Name"
        mode="outlined"
        theme={{
          colors: {
            primary: er ? colors.Tertiary : 'black',
          },
        }}
        outlineColor={er ? colors.Tertiary : null}
        style={styles.input}
        onChangeText={fname => {
          STUDENT_REGISTRATION_STORE.setFirstName(fname);
        }}
        returnKeyType="next"
        onSubmitEditing={() => lastNameInput.current.focus()}
      />
      <TextInput
        label="Last Name"
        mode="outlined"
        theme={{
          colors: {
            primary: er ? colors.Tertiary : 'black',
          },
        }}
        outlineColor={er ? colors.Tertiary : null}
        style={{...styles.input, marginTop: verticalScale(5)}}
        onChangeText={val => {
          STUDENT_REGISTRATION_STORE.setLastName(val);
        }}
        returnKeyType="next"
        onSubmitEditing={() => departmentInput.current.focus()}
        ref={lastNameInput}
      />

      <TextInput
        label="Department"
        mode="outlined"
        theme={{
          colors: {
            primary: er ? colors.Tertiary : 'black',
          },
        }}
        outlineColor={er ? colors.Tertiary : null}
        style={{...styles.input, marginTop: verticalScale(5)}}
        onChangeText={val => {
          STUDENT_REGISTRATION_STORE.setDepartment(val);
        }}
        ref={departmentInput}
        onSubmitEditing={scroll}
        returnKeyType="next"
      />
      <TextInput
        label="Mobile Number"
        mode="outlined"
        keyboardType="phone-pad"
        theme={{
          colors: {
            primary: er ? colors.Tertiary : 'black',
          },
        }}
        outlineColor={er ? colors.Tertiary : null}
        style={{...styles.input, marginTop: verticalScale(5)}}
        onChangeText={val => {
          STUDENT_REGISTRATION_STORE.setMobileNumber(val);
        }}
        ref={departmentInput}
        onSubmitEditing={scroll}
        returnKeyType="next"
      />
      {er && <Error text={erMsg} />}
      <NextButton handler={scroll} />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    backgroundColor: colors.regBackground,
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },
  input: {
    width: '100%',
  },
});

export default Name;
