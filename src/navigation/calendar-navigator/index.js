import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EventDescriptionScreen from '../../screens/EventDescriptionScreen';
import EventsCreationScreen from '../../screens/EventsCreationScreen';
import CalendarScreen from '../../screens/CalendarScreen';
import AnnouncementCreationScreen from '../../screens/AnnouncementCreationScreen';
import ImageZoomScreen from '../../screens/ImageZoomScreen';
import ClubDescriptionScreen from '../../screens/ClubDescriptionScreen';
import * as color from '../../utils/colors';
const CalendarStack = createNativeStackNavigator();

function CalendarNavigator() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          headerShown: false,
        }}
      />
      <CalendarStack.Screen
        name="EventDescriptionScreen"
        component={EventDescriptionScreen}
        options={{
          headerShown: false,
        }}
      />
      <CalendarStack.Screen
        name="CreateEventScreen"
        component={EventsCreationScreen}
        options={{
          headerShown: false,
        }}
      />
      <CalendarStack.Screen
        name="CreateAnnouncementScreen"
        component={AnnouncementCreationScreen}
        options={{
          headerShown: false,
        }}
      />
      <CalendarStack.Screen
        name="ImageScreen"
        children={ImageZoomScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerShadowVisible: false,
          title: '',
          headerTintColor: color.WHITE,
        }}
      />
      <CalendarStack.Screen
        name="ClubDescription"
        component={ClubDescriptionScreen}
        options={{
          headerShown: false,
        }}
      />
    </CalendarStack.Navigator>
  );
}

export default CalendarNavigator;
