import React, {useState} from 'react';
import {SafeAreaView, Dimensions} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {verticalScale, ScaledSheet} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import Error from '../../components/Error';
import {
  updateRegisterToken,
  updateToken,
} from '../../redux/reducers/loginScreen';
import {useDispatch} from 'react-redux';

const WIDTH = Dimensions.get('window').width;

const ResetPassword = ({scrollViewRef, navigation, callback}) => {
  const [password, setPassword] = useState();
  const [eyeIcon, setEyeIcon] = useState('eye-off');
  const [passwordToggle, setPasswordToggle] = useState(true);
  const [cpassword, setCPassword] = useState();
  const [passEr, setpassEr] = useState(false);
  const [cpassEr, setcpassEr] = useState(false);
  const dispatch = useDispatch();

  const register = () => {
    if (!password) {
      setpassEr(true);
      return;
    }
    if (!cpassword || cpassword != password) {
      setcpassEr(true);
      return;
    }
    console.log(cpassword);
    console.log(password);
    dispatch(updateRegisterToken(null));
    dispatch(updateToken(true));
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
        value={password}
        onChangeText={password => setPassword(password)}
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
        outlineColor={cpassEr ? colors.Tertiary : null}
        style={{...styles.input, marginTop: verticalScale(5)}}
        value={cpassword}
        onChangeText={password => setCPassword(password)}
      />
      {cpassEr && <Error text="Password and Confirm Password doesn't match" />}
      <Button
        style={styles.next}
        mode="contained"
        onPress={register}
        labelStyle={{color: colors.regNext}}>
        Let's Go!
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

  input: {
    width: '100%',
  },
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

export default ResetPassword;
