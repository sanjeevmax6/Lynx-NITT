import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EventDescriptionScreen from '../../screens/EventDescriptionScreen';
import ImageZoomScreen from '../../screens/ImageZoomScreen';
import ClubDescriptionScreen from '../../screens/ClubDescriptionScreen';
import AnnouncementDetailScreen from '../../screens/AnnouncementDetailScreen';
import ActivityScreen from '../../screens/ActivityScreen';
import * as color from '../../utils/colors';

import Header from '../../components/Header';

const AnnouncementStack = createNativeStackNavigator();

function ActivityNavigator() {
  return (
    <AnnouncementStack.Navigator>
      <AnnouncementStack.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          headerShown: false,
        }}
      />
      <AnnouncementStack.Screen
        name="AnnouncementDetail"
        component={AnnouncementDetailScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          header: props => <Header props={props} />,
        }}
      />
      <AnnouncementStack.Screen
        name="EventDescriptionScreen"
        component={EventDescriptionScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          header: props => <Header props={props} />,
        }}
      />
      <AnnouncementStack.Screen
        name="ImageScreen"
        children={ImageZoomScreen}
        options={{
          animation: 'fade_from_bottom',
          headerShown: true,
          headerTransparent: true,
          headerShadowVisible: false,
          title: '',
          headerTintColor: color.WHITE,
        }}
      />
      <AnnouncementStack.Screen
        name="ClubDescription"
        component={ClubDescriptionScreen}
        options={{
          headerShown: true,
          header: props => <Header props={props} />,
        }}
      />
    </AnnouncementStack.Navigator>
  );
}

export default ActivityNavigator;
