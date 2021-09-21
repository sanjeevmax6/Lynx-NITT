import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Button} from 'react-native-paper';

import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
  MaterialCommunityIcons,
} from 'react-native-fontawesome';

const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [eyeIcon, setEyeIcon] = useState('eye-off');
  const [passwordToggle, setPasswordToggle] = useState(true);

  const dummy = () => {
    console.log('Icon toggled');
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.textInput}>
            <TextInput
              label="Username"
              placeholder="Enter your username"
              mode="outlined"
              value={user}
              onChangeText={user => setUser(user)}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              label="Password"
              placeholder="Enter your password"
              mode="outlined"
              secureTextEntry={passwordToggle}
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
          </View>
          <View style={styles.loginButton}>
            <Button
              mode="outlined"
              loading={false}
              onPress={() => {
                ToastAndroid.show('Processing Login', ToastAndroid.SHORT);
              }}>
              Login
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: verticalScale(70),
    // width: scale(10),
    paddingHorizontal: moderateScale(20),
  },
});

export default LoginScreen;
