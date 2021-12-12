import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppNavigator from './app-navigator';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import Registration from '../screens/Registration';

import {useDispatch, useSelector} from 'react-redux';
import {AUTH_NAV_STORE} from '../mobx/AUTH_NAV_STORE';
import {observer} from 'mobx-react';
import {USER_STORE} from '../mobx/USER_STORE';

const RootStack = createNativeStackNavigator();

const Navigator = observer(() => {
  const registerToken = useSelector(
    state => state.logScreen.login.registerToken,
  );

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {AUTH_NAV_STORE.getSplashLoading ? (
          <RootStack.Screen name="Splash" component={SplashScreen} />
        ) : !USER_STORE.getUserToken ? (
          registerToken ? (
            <RootStack.Screen
              name="Register"
              component={Registration}
              initialParams={{token: USER_STORE.getUserToken}}
            />
          ) : (
            <RootStack.Screen name="Login" component={LoginScreen} />
          )
        ) : (
          <RootStack.Screen
            name="Home"
            component={AppNavigator}
            initialParams={{token: USER_STORE.getUserToken}}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default Navigator;
