import React, {useState} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarNavigator from '../calendar-navigator';
import FeedNavigator from '../feed-navigator';

import SearchNavigator from '../search-navigator';
import ActivityNavigator from '../activity-navigator';
import UserNavigator from '../user-navigator';
import * as color from '../../utils/colors';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {observer} from 'mobx-react';

const HomeTab = createMaterialBottomTabNavigator();

const AppNavigator = observer(() => {
  return (
    <HomeTab.Navigator
      initialRouteName="Feed"
      activeColor={color.iconActiveColor}
      inactiveColor={color.iconInActiveColor}
      labeled={false}
      sceneAnimationEnabled={true}
      barStyle={{
        backgroundColor: color.BottomNav,
        display: BOTTOM_NAV_STORE.getTabVisibility ? null : 'none',
      }}
      screenOptions={{
        headerShown: false,
      }}>
      <HomeTab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarLabel: 'Feeds',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name="Calendar"
        component={CalendarNavigator}
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
        name="ActivityNavigator"
        component={ActivityNavigator}
        options={{
          tabBarLabel: 'Activity',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <HomeTab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </HomeTab.Navigator>
  );
});

export default AppNavigator;
