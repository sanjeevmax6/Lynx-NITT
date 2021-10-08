import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EventDescriptionScreen from '../../screens/EventDescriptionScreen';
import EventsCreationScreen from '../../screens/EventsCreationScreen';
import CalendarScreen from '../../screens/CalendarScreen';

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
    </CalendarStack.Navigator>
  );
}

export default CalendarNavigator;
