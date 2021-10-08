import React, {Component, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';

import store from '../redux/store';

const RootStack = createNativeStackNavigator();

function Navigator(isUserLoggedIn) {
  const [userToken, setUserToken] = useState();
  const [isLoading, setIsLoading] = useState(false);

  store.subscribe(() => {
    //console.log(userToken);
    setUserToken(store.getState().logScreen.login.userToken);
    // console.log(userToken);
  });
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
          <RootStack.Screen
            name="Home"
            component={AppNavigator}
            initialParams={{token: userToken}}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
