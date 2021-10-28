import React, {useState, useRef, useEffect} from 'react';
import {View, SafeAreaView, Dimensions} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {scale, verticalScale, ScaledSheet} from 'react-native-size-matters';

import * as colors from '../../utils/colors';
import Error from './Error';

const WIDTH = Dimensions.get('window').width;

const Name = ({scrollViewRef, callback}) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [address, setAddress] = useState('');
  const [dateEr, setDateEr] = useState(false);
  const [addEr, setAddEr] = useState(false);

  const scroll = () => {
    if (!day || !month || !year) {
      setDateEr(true);
      if (!address) {
        setAddEr(true);
      }
      return;
    }
    if (!address) {
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
      'Enter your Aadhar Number and Upload your passport pic\n(Optional)',
      2,
    );
  };

  const back = () => {
    callback('Basic Information', 'Enter your name', 0);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: 0,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.split}>
        <TextInput
          label="Day"
          mode="outlined"
          keyboardType="phone-pad"
          value={day}
          theme={{
            colors: {
              primary: dateEr ? colors.Tertiary : 'black',
            },
          }}
          outlineColor={dateEr ? colors.Tertiary : null}
          style={{...styles.inputDOB, marginRight: scale(4)}}
          onChangeText={day => {
            setDay(day);
          }}
        />
        <TextInput
          label="Month"
          mode="outlined"
          value={month}
          theme={{
            colors: {
              primary: dateEr ? colors.Tertiary : 'black',
            },
          }}
          outlineColor={dateEr ? colors.Tertiary : null}
          keyboardType="phone-pad"
          style={{
            ...styles.inputDOB,
            marginRight: scale(2),
            marginLeft: scale(4),
          }}
          onChangeText={month => {
            setMonth(month);
          }}
        />
        <TextInput
          label="Year"
          mode="outlined"
          value={year}
          keyboardType="phone-pad"
          theme={{
            colors: {
              primary: dateEr ? colors.Tertiary : 'black',
            },
          }}
          outlineColor={dateEr ? colors.Tertiary : null}
          style={{...styles.inputDOB, marginLeft: scale(4)}}
          onChangeText={yr => {
            setYear(yr);
          }}
        />
      </View>
      {dateEr && <Error text="Please fill in a complete date of birth" />}
      <TextInput
        label="Address"
        mode="outlined"
        value={address}
        theme={{
          colors: {
            primary: addEr ? colors.Tertiary : 'black',
          },
        }}
        outlineColor={addEr ? colors.Tertiary : null}
        style={{...styles.inputAd, marginTop: verticalScale(5)}}
        onChangeText={add => {
          setAddress(add);
        }}
      />
      {addEr && <Error text="Please fill in your address" />}
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
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    backgroundColor: colors.regBackground,
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },
  split: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  inputDOB: {
    flex: 1,
  },
  inputAd: {width: '100%'},
  next: {
    position: 'absolute',
    bottom: '20@vs',
    right: '20@vs',
    backgroundColor: colors.regAttach,
  },
  back: {
    position: 'absolute',
    bottom: '20@vs',
    left: '10@vs',
  },
});

export default Name;
