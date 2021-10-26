import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../../screens/LoginScreen';
import SplashScreen from '../../screens/SplashScreen';

const AuthStack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="Splash" component={SplashScreen} />

        <AuthStack.Screen name="Login" component={LoginScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;
