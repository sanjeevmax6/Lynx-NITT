import React, {useState} from 'react';
import {SafeAreaView, Dimensions, View} from 'react-native';
import {TextInput, Button, ActivityIndicator} from 'react-native-paper';
import {verticalScale, ScaledSheet} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import Error from '../../components/Error';
import NextButton from './nextButton';
import BackButton from './backButton';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';

const WIDTH = Dimensions.get('window').width;

const ResetPassword = ({
  scrollViewRef,

  callback,

  handleAPICALL,
}) => {
  const [eyeIcon, setEyeIcon] = useState('eye-off');
  const [passwordToggle, setPasswordToggle] = useState(true);

  const [passEr, setpassEr] = useState(false);
  const [cpassEr, setcpassEr] = useState(false);

  const register = () => {
    setpassEr(false);
    setcpassEr(false);
    if (!STUDENT_REGISTRATION_STORE.getPassword) {
      setpassEr(true);
      return;
    }
    if (!STUDENT_REGISTRATION_STORE.getConfirmPassword) {
      setcpassEr(true);
      return;
    }

    handleAPICALL();
  };

  const back = () => {
    callback('Profile Picture', 'Upload your profile photo', 3);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH * 3,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry={passwordToggle}
        theme={{
          colors: {
            primary: passEr || cpassEr ? colors.Tertiary : 'black',
          },
        }}
        selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
        outlineColor={passEr ? colors.Tertiary : null}
        style={{...styles.input, marginTop: verticalScale(5)}}
        right={
          <TextInput.Icon
            name={eyeIcon}
            onPress={() => {
              setPasswordToggle(!passwordToggle);
              setEyeIcon(eyeIcon === 'eye' ? 'eye-off' : 'eye');
            }}
          />
        }
        onChangeText={password =>
          STUDENT_REGISTRATION_STORE.setPassword(password)
        }
      />
      {passEr && <Error text="Enter your new password" />}
      <TextInput
        label="Confirm Password"
        mode="outlined"
        secureTextEntry={true}
        theme={{
          colors: {
            primary: cpassEr ? colors.Tertiary : 'black',
          },
        }}
        selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
        outlineColor={cpassEr ? colors.Tertiary : null}
        style={{...styles.input, marginTop: verticalScale(5)}}
        onChangeText={password =>
          STUDENT_REGISTRATION_STORE.setConfirmPassword(password)
        }
      />
      {cpassEr && <Error text="Enter Confirm Password" />}

      <NextButton handler={register} label="Let's Go" />
      <BackButton handler={back} />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },
  input: {
    width: '100%',
  },
});

export default ResetPassword;
