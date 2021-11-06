import React, {useState, useRef} from 'react';
import {SafeAreaView, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
import {verticalScale, ScaledSheet} from 'react-native-size-matters';
import NextButton from './nextButton';

import * as colors from '../../utils/colors';
import Error from '../../components/Error';

const WIDTH = Dimensions.get('window').width;

const Name = ({scrollViewRef, callback, nameStates}) => {
  const [er, setEr] = useState(false);
  const [erMsg, setErMsg] = useState('');

  const scroll = () => {
    if (!nameStates.firstname || !nameStates.lastname) {
      setEr(true);
      setErMsg('Enter your name');
      return;
    }
    if (!nameStates.dept) {
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
        value={nameStates.firstname}
        theme={{
          colors: {
            primary: er ? colors.Tertiary : 'black',
          },
        }}
        outlineColor={er ? colors.Tertiary : null}
        style={styles.input}
        onChangeText={fname => {
          nameStates.setFirstName(fname);
        }}
        returnKeyType="next"
        onSubmitEditing={() => lastNameInput.current.focus()}
      />
      <TextInput
        label="Last Name"
        mode="outlined"
        value={nameStates.lastname}
        theme={{
          colors: {
            primary: er ? colors.Tertiary : 'black',
          },
        }}
        outlineColor={er ? colors.Tertiary : null}
        style={{...styles.input, marginTop: verticalScale(5)}}
        onChangeText={sname => {
          nameStates.setLastName(sname);
        }}
        returnKeyType="next"
        onSubmitEditing={() => departmentInput.current.focus()}
        ref={lastNameInput}
      />

      <TextInput
        label="Department"
        mode="outlined"
        value={nameStates.dept}
        theme={{
          colors: {
            primary: er ? colors.Tertiary : 'black',
          },
        }}
        outlineColor={er ? colors.Tertiary : null}
        style={{...styles.input, marginTop: verticalScale(5)}}
        onChangeText={fdept => {
          nameStates.setDept(fdept);
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
