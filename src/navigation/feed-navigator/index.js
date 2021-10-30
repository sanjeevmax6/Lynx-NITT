import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FeedScreen from '../../screens/FeedScreen';
import EventDescriptionScreen from '../../screens/EventDescriptionScreen';
import ImageZoomScreen from '../../screens/ImageZoomScreen';
import ClubDescriptionScreen from '../../screens/ClubDescriptionScreen';
import * as color from '../../utils/colors';
import Header from '../../components/Header';

const FeedStack = createNativeStackNavigator();

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
          headerShown: true,
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
          headerShown: true,
          animation: 'slide_from_right',
          header: props => <Header props={props} />,
        }}
      />
    </FeedStack.Navigator>
  );
}

export default FeedNavigator;
