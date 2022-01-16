import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CalendarNoticeCreationScreen from '../../screens/CalendarNoticeCreationScreen';
import EventDescriptionScreen from '../../screens/EventDescriptionScreen';
import EventEditScreen from '../../screens/EventEditScreen';
import EventsCreationScreen from '../../screens/EventsCreationScreen';
import CalendarScreen from '../../screens/CalendarScreen';
import AnnouncementCreationScreen from '../../screens/AnnouncementCreationScreen';
import ImageZoomScreen from '../../screens/ImageZoomScreen';
import ClubDescriptionScreen from '../../screens/ClubDescriptionScreen';
import * as color from '../../utils/colors';

const CalendarStack = createNativeStackNavigator();
import Header from '../../components/Header';
import PageHeader from '../../components/PageHeader';

function CalendarNavigator() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          headerShown: true,
          header: props => <PageHeader title="CALENDAR" />,
        }}
      />
      <CalendarStack.Screen
        name="EventDescriptionScreen"
        component={EventDescriptionScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
        }}
      />
      <CalendarStack.Screen
        name="EventEditScreen"
        component={EventEditScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
        }}
      />
      <CalendarStack.Screen
        name="CreateEventScreen"
        component={EventsCreationScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      />
      <CalendarStack.Screen
        name="CreateCalendarNoticeScreen"
        component={CalendarNoticeCreationScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      />
      <CalendarStack.Screen
        name="CreateAnnouncementScreen"
        component={AnnouncementCreationScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
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
          headerShown: false,
          animation: 'slide_from_right',
          header: props => <Header props={props} />,
        }}
      />
    </CalendarStack.Navigator>
  );
}

export default CalendarNavigator;
