import React, {Component, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';

const RootStack = createNativeStackNavigator();

function Navigator() {
  const AppContext = React.createContext();
  // useEffect(() => {
  //   AppContext = React.createContext();
  // }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState('123');
  if (isLoading) {
    return <SplashScreen />;
  }

  const AppContextWrapper = () => (
    <AppContext.Consumer>
      {userToken => <LoginScreen {...userToken} />}
    </AppContext.Consumer>
  );
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {userToken == null ? (
          <RootStack.Screen name="Login" component={AppContextWrapper} />
        ) : (
          <RootStack.Screen
            name="Home"
            component={AppNavigator}
            initialParams={{Token: userToken}}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
export default Navigator;

{
  /* <RootStack.Navigator
  screenOptions={{
    headerShown: false,
  }}
  initialRouteName="Login">
  <RootStack.Screen name="Login" component={AuthNavigator} />

  <RootStack.Screen name="Home" component={AppNavigator} />
</RootStack.Navigator>; */
}
