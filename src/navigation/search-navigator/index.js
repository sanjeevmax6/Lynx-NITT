import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EventDescriptionScreen from '../../screens/EventDescriptionScreen';

import ImageZoomScreen from '../../screens/ImageZoomScreen';
import ClubDescriptionScreen from '../../screens/ClubDescriptionScreen';
import * as color from '../../utils/colors';
import SearchScreen from '../../screens/SearchScreen';

const CalendarStack = createNativeStackNavigator();
import Header from '../../components/Header';

function SearchNavigator() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <CalendarStack.Screen
        name="EventDescriptionScreen"
        component={EventDescriptionScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          header: props => <Header props={props} />,
        }}
      />

      <CalendarStack.Screen
        name="ImageScreen"
        children={ImageZoomScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          animation: 'fade_from_bottom',
          headerShadowVisible: false,
          title: '',
          headerTintColor: color.WHITE,
        }}
      />
      <CalendarStack.Screen
        name="ClubDescription"
        component={ClubDescriptionScreen}
        options={{
          headerShown: true,
          animation: 'slide_from_right',
          header: props => <Header props={props} />,
        }}
      />
    </CalendarStack.Navigator>
  );
}

export default SearchNavigator;
