import React, {useState, useRef, useEffect} from 'react';
import {SafeAreaView, Dimensions} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {verticalScale, ScaledSheet} from 'react-native-size-matters';

import * as colors from '../../utils/colors';
import Error from '../../components/Error';

const WIDTH = Dimensions.get('window').width;

const Name = ({scrollViewRef, callback}) => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [er, setEr] = useState(false);

  const scroll = () => {
    if (!firstname || !lastname) {
      setEr(true);
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
        value={firstname}
        theme={{
          colors: {
            primary: er ? colors.Tertiary : 'black',
          },
        }}
        outlineColor={er ? colors.Tertiary : null}
        style={styles.input}
        onChangeText={fname => {
          setFirstName(fname);
        }}
      />
      <TextInput
        label="Last Name"
        mode="outlined"
        value={lastname}
        theme={{
          colors: {
            primary: er ? colors.Tertiary : 'black',
          },
        }}
        outlineColor={er ? colors.Tertiary : null}
        style={{...styles.input, marginTop: verticalScale(5)}}
        onChangeText={sname => {
          setLastName(sname);
        }}
      />
      {er && <Error text="Enter firstname and surname" />}
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
