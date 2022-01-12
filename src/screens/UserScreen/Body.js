import React from 'react';
import {View, PixelRatio} from 'react-native';
import {scale} from 'react-native-size-matters';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import * as colors from '../../utils/colors';
import UpcomingEventsComponent from './UpcomingEvents';
import PastEventsComponent from './PastEvents';

const Body = ({data, functions}) => {
  return (
    <View style={{backgroundColor: colors.WHITE, flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: Math.floor(
              scale(12) / PixelRatio.getFontScale().toFixed(1),
            ),
            fontWeight: 'bold',
            width: 'auto',
            margin: 0,
            padding: 0,
            textTransform: 'none',
          },
          lazy: true,
          tabBarStyle: {textTransform: 'none', width: 'auto'},
          tabBarPressColor: colors.tabBarPressColor,
          tabBarIndicatorStyle: {backgroundColor: colors.sliderColor},
          tabBarActiveTintColor: colors.tabBarActiveTintColor,
          tabBarInactiveTintColor: colors.tabBarInactiveTintColor,
        }}>
        <Tab.Screen
          name={`Upcoming events (${
            data.upcomingEvents.length + data.liveEvents.length
          })`}
          children={() => <UpcomingEventsComponent functions={functions} />}
        />
        <Tab.Screen
          name={`Past events (${data.pastEvents.length})`}
          children={() => <PastEventsComponent functions={functions} />}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Body;
