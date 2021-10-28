import React, {Component, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import Registration from '../screens/Registration';

import store from '../redux/store';

const RootStack = createNativeStackNavigator();

function Navigator(isUserLoggedIn) {
  const [userToken, setUserToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  store.subscribe(() => {
    setUserToken(store.getState().logScreen.login.userToken);
    setIsLoading(store.getState().splashScreen.splash.isLoading);
    console.log(isLoading);
    console.log(userToken);
  });
  // if (isLoading) {
  //   return <SplashScreen />;
  // }
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!userToken ? (
          isLoading ? (
            <RootStack.Screen name="Splash" component={SplashScreen} />
          ) : (
            <RootStack.Screen name="Login" component={LoginScreen} />
          )
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
