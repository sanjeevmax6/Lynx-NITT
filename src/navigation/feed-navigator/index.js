import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FeedScreen from '../../screens/FeedScreen';
import EventDescriptionScreen from '../../screens/EventDescriptionScreen';
import EventEditScreen from '../../screens/EventEditScreen';
import ImageZoomScreen from '../../screens/ImageZoomScreen';
import ClubDescriptionScreen from '../../screens/ClubDescriptionScreen';
import * as color from '../../utils/colors';
import Header from '../../components/Header';
import {createNavigationContainerRef} from '@react-navigation/native';
const FeedStack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

export function navigateApp(name, params) {
  if (navigationRef.isReady()) {
    console.log('Navigated to: ' + name);
    navigationRef.navigate(name, params);
  }
}

function FeedNavigator() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="Feeds"
        component={FeedScreen}
        options={{
          headerShown: false,
        }}
      />
      <FeedStack.Screen
        name="EventDescriptionScreen"
        component={EventDescriptionScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
          header: props => <Header props={props} />,
        }}
      />
      <FeedStack.Screen
        name="EventEditScreen"
        component={EventEditScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
          header: props => <Header props={props} />,
        }}
      />
      <FeedStack.Screen
        name="ImageScreen"
        children={ImageZoomScreen}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerTransparent: true,
          headerShadowVisible: false,
          title: '',
          headerTintColor: color.WHITE,
        }}
      />
      <FeedStack.Screen
        name="ClubDescription"
        component={ClubDescriptionScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
          header: props => <Header props={props} />,
        }}
      />
    </FeedStack.Navigator>
  );
}

export default FeedNavigator;
