import React, {Component, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';

const RootStack = createNativeStackNavigator();

function Navigator() {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState('1234');
  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {userToken == null ? (
          <RootStack.Screen name="Login" component={LoginScreen} />
        ) : (
          <RootStack.Screen name="Home" component={AppNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
export default Navigator;
