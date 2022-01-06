import React, {useState} from 'react';
import {View, SafeAreaView, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
import {scale, verticalScale, ScaledSheet} from 'react-native-size-matters';
import NextButton from './nextButton';
import BackButton from './backButton';

import * as colors from '../../utils/colors';
import Error from '../../components/Error';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';

const WIDTH = Dimensions.get('window').width;

const Name = ({scrollViewRef, callback}) => {
  const [dateEr, setDateEr] = useState(false);
  const [addEr, setAddEr] = useState(false);

  const scroll = () => {
    if (
      !STUDENT_REGISTRATION_STORE.getBirthDay ||
      !STUDENT_REGISTRATION_STORE.getBirthMonth ||
      !STUDENT_REGISTRATION_STORE.getBirthYear
    ) {
      setDateEr(true);
      if (!STUDENT_REGISTRATION_STORE.getAddress) {
        setAddEr(true);
      }
      return;
    }
    if (!STUDENT_REGISTRATION_STORE.getAddress) {
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.split}>
        <TextInput
          label="Day"
          mode="outlined"
          keyboardType="phone-pad"
          placeholder="dd"
          theme={{
            colors: {
              primary: dateEr ? colors.Tertiary : 'black',
            },
          }}
          selectionColor={colors.WHITE}
          outlineColor={dateEr ? colors.Tertiary : null}
          style={{...styles.inputDOB, marginRight: scale(4)}}
          onChangeText={day => {
            STUDENT_REGISTRATION_STORE.setBirthDay(day);
          }}
        />
        <TextInput
          label="Month"
          mode="outlined"
          placeholder="mm"
          theme={{
            colors: {
              primary: dateEr ? colors.Tertiary : 'black',
            },
          }}
          selectionColor={colors.WHITE}
          outlineColor={dateEr ? colors.Tertiary : null}
          keyboardType="phone-pad"
          style={{
            ...styles.inputDOB,
            marginRight: scale(2),
            marginLeft: scale(4),
          }}
          onChangeText={month => {
            STUDENT_REGISTRATION_STORE.setBirthMonth(month);
          }}
        />
        <TextInput
          label="Year"
          mode="outlined"
          placeholder="yyyy"
          keyboardType="phone-pad"
          theme={{
            colors: {
              primary: dateEr ? colors.Tertiary : 'black',
            },
          }}
          selectionColor={colors.WHITE}
          outlineColor={dateEr ? colors.Tertiary : null}
          style={{...styles.inputDOB, marginLeft: scale(4)}}
          onChangeText={yr => {
            STUDENT_REGISTRATION_STORE.setBirthYear(yr);
          }}
        />
      </View>
      {dateEr && <Error text="Enter your date of birth" />}
      <TextInput
        label="Address"
        mode="outlined"
        theme={{
          colors: {
            primary: addEr ? colors.Tertiary : 'black',
          },
        }}
        outlineColor={addEr ? colors.Tertiary : null}
        style={{...styles.inputAd, marginTop: verticalScale(5)}}
        onChangeText={add => {
          STUDENT_REGISTRATION_STORE.setAddress(add);
        }}
      />
      {addEr && <Error text="Enter your address" />}
      <NextButton handler={scroll} />
      <BackButton handler={back} />
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
});

export default Name;
