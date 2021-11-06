import React, {useState, useRef, useEffect} from 'react';
import {SafeAreaView, Dimensions} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {verticalScale, ScaledSheet} from 'react-native-size-matters';

import * as colors from '../../utils/colors';
import Error from '../../components/Error';

const WIDTH = Dimensions.get('window').width;

const Name = ({scrollViewRef, callback, nameStates}) => {
  const [er, setEr] = useState(false);
  const [erDept, setErDept] = useState(false);

  const scroll = () => {
    if (!nameStates.firstname || !nameStates.lastname) {
      setEr(true);
      return;
    }
    if (!nameStates.dept) {
      setErDept(true);
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
      />
      {er && <Error text="Enter firstname and surname" />}
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
      />
      {erDept && <Error text="Enter Department" />}
      <Button
        style={styles.next}
        mode="contained"
        onPress={scroll}
        labelStyle={{color: colors.regNext}}>
        Next
      </Button>
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
  next: {
    position: 'absolute',
    bottom: '20@vs',
    right: '20@vs',
    backgroundColor: colors.regAttach,
  },
});

export default Name;
