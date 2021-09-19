import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Button} from 'react-native-paper';

import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';

const LoginScreen = ({props}) => {
  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const [passwordToggle, setaPasswordToggle] = useState(true);

  const dummy = () => {
    console.log('Icon toggled');
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.textInput}>
            <TextInput
              label="UserName"
              placeholder="Enter your username"
              mode="outlined"
              value={user}
              onChangeText={user => setUser(user)}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              label="Roll Number"
              placeholder="Enter your Roll Number"
              mode="outlined"
              secureTextEntry={passwordToggle}
              right={
                <TextInput.Icon
                  name={
                    <FontAwesome
                      style={{color: '#000000'}}
                      icon={parseIconFromClassName('fa-eye')}
                    />
                  }
                  onPress={() => setaPasswordToggle(!passwordToggle)}
                />
              }
              value={pass}
              onChangeText={pass => setPass(pass)}
            />
          </View>
          <View style={styles.loginButton}>
            <Button
              icon="camera"
              mode="outlined"
              loading={false}
              icon={<FontAwesome icon={SolidIcons.smile} />}
              onPress={() => console.log(this.props.route.params.userToken)}>
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
