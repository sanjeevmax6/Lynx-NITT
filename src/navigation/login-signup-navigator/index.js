import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoginScreen';
import SignUpScreen from '../../screens/SignUpScreen';

const LogSignStack = createNativeStackNavigator();

function LogNavigator() {
  return (
    <LogSignStack.Navigator>
      <LogSignStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <LogSignStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </LogSignStack.Navigator>
  );
}

export default LogNavigator;
