import React, {Component, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import Registration from '../screens/Registration';

import {useDispatch, useSelector} from 'react-redux';

const RootStack = createNativeStackNavigator();

function Navigator(isUserLoggedIn) {
  const userToken = useSelector(state => state.logScreen.login.userToken);
  const isLoading = useSelector(state => state.splashScreen.splash.isLoading);
  const registerToken = useSelector(
    state => state.logScreen.login.registerToken,
  );
  // console.log('Is Loading:: ' + isLoading);
  // console.log('UserToken' + userToken);
  // console.log('RegToken' + registerToken);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isLoading ? (
          <RootStack.Screen name="Splash" component={SplashScreen} />
        ) : !userToken ? (
          registerToken ? (
            <RootStack.Screen
              name="Register"
              component={Registration}
              initialParams={{token: userToken}}
            />
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
