import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';

import CalendarScreen from '../../screens/CalendarScreen';
import FeedScreen from '../../screens/FeedScreen';
import SearchScreen from '../../screens/SearchScreen';
import UserScreen from '../../screens/UserScreen';

const HomeTab = createMaterialBottomTabNavigator();

const AppNavigator = () => {
  return (
    <HomeTab.Navigator
      initialRouteName="Calendar"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{backgroundColor: '#694fad'}}
      initialRouteName="Calendar"
      screenOptions={{
        headerShown: false,
      }}>
      <HomeTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: () => <FontAwesome icon={SolidIcons.smile} />,
        }}
      />

      <HomeTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: () => <FontAwesome icon={SolidIcons.smile} />,
        }}
      />

      <HomeTab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarLabel: 'Feeds',
          tabBarIcon: () => <FontAwesome icon={SolidIcons.smile} />,
        }}
      />

      <HomeTab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => <FontAwesome icon={SolidIcons.smile} />,
        }}
      />
    </HomeTab.Navigator>
  );
};

export default AppNavigator;
