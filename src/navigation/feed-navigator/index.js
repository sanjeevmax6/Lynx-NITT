import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FeedScreen from '../../screens/FeedScreen';
import EventDescriptionScreen from '../../screens/EventDescriptionScreen';
import ImageZoomScreen from '../../screens/ImageZoomScreen';

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
          headerShown: false,
        }}
      />
      <FeedStack.Screen
        name="ImageScreen"
        component={ImageZoomScreen}
        options={{
          headerShown: false,
        }}
      />
    </FeedStack.Navigator>
  );
}

export default FeedNavigator;
