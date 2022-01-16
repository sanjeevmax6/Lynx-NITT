import React, {useState} from 'react';
import {ActivityIndicator, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppNavigator from './app-navigator';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import Registration from '../screens/Registration';
import ResetPasswordScreen from '../screens/ResetPasswordScreens';
import ClubRegistration from '../screens/ClubRegistration';

import {AUTH_NAV_STORE} from '../mobx/AUTH_NAV_STORE';
import {observer} from 'mobx-react';
import {USER_STORE} from '../mobx/USER_STORE';
import {DEEP_LINKING_STORE} from '../mobx/DEEP_LINKING_STORE';

const RootStack = createNativeStackNavigator();

const Navigator = observer(() => {
  return (
    <NavigationContainer
      linking={
        DEEP_LINKING_STORE.getAllow === true
          ? {
              prefixes: ['https://nittapp.spider.nitt.edu', 'nitt-app://'],
              config: {
                screens: {
                  Home: {
                    initialRouteName: 'Feed',
                    screens: {
                      Feed: {
                        initialRouteName: 'Feeds',
                        screens: {
                          EventDescriptionScreen: 'event/:eventId',
                          ClubDescription: 'club/:ClubId',
                        },
                      },
                    },
                  },
                },
              },
              async getInitialURL() {
                // Check if app was opened from a deep link
                const url = await Linking.getInitialURL();

                console.log('URL: ' + url);
                if (url != null) {
                  DEEP_LINKING_STORE.setAllow(false);
                  return url;
                }
              },
            }
          : null
      }>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {AUTH_NAV_STORE.getSplashLoading ? (
          <RootStack.Screen name="Splash" component={SplashScreen} />
        ) : !USER_STORE.getUserToken ? (
          USER_STORE.getUserRegToken ? (
            <RootStack.Screen
              name="Register"
              component={Registration}
              initialParams={{token: USER_STORE.getUserToken}}
            />
          ) : (
            <>
              <RootStack.Screen name="Login" component={LoginScreen} />
              <RootStack.Screen name="Reset" component={ResetPasswordScreen} />
            </>
          )
        ) : USER_STORE.getRedirectUpdate == true ? (
          <RootStack.Screen
            name="ClubRegiser"
            component={ClubRegistration}
            initialParams={{token: USER_STORE.getUserToken}}
          />
        ) : (
          <>
            <RootStack.Screen
              name="Home"
              component={AppNavigator}
              initialParams={{token: USER_STORE.getUserToken}}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default Navigator;
