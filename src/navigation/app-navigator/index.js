import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarScreen from '../../screens/CalendarScreen';
import FeedScreen from '../../screens/FeedScreen';
import SearchScreen from '../../screens/SearchScreen';
import UserScreen from '../../screens/UserScreen';
import ActivityScreen from '../../screens/ActivityScreen';

import * as color from '../../utils/colors';

const HomeTab = createMaterialBottomTabNavigator();

const AppNavigator = () => {
  return (
    <HomeTab.Navigator
      initialRouteName="Feed"
      activeColor={color.iconActiveColor}
      inactiveColor={color.iconInActiveColor}
      labeled={false}
      barStyle={{backgroundColor: color.BottomNav}}
      screenOptions={{
        headerShown: false,
      }}>
      <HomeTab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarLabel: 'Feeds',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="calendar-range"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <HomeTab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarLabel: 'Activity',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </HomeTab.Navigator>
  );
};

export default AppNavigator;
