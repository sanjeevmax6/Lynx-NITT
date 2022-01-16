import React from 'react';
import {PixelRatio, View, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import InterestedEventsScreen from './InterestedEventsScreen';
import ClubFollowingScreen from './ClubFollowingScreen';
import {scale} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';

const Body = ({navigation, functionCalls}) => {
  return (
    <View style={styles.container}>
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
          tabBarPressColor: color.tabBarPressColor,
          tabBarIndicatorStyle: {backgroundColor: color.sliderColor},
          tabBarActiveTintColor: color.tabBarActiveTintColor,
          tabBarInactiveTintColor: color.tabBarInactiveTintColor,
        }}>
        <Tab.Screen
          name={`Following (${STUDENT_DETAILS_STORE.getClubs.length})`}
          children={() => (
            <ClubFollowingScreen
              navigation={navigation}
              goToClub={functionCalls.goToClub}
            />
          )}
        />
        <Tab.Screen
          name={`Interested (${STUDENT_DETAILS_STORE.getInterests.length})`}
          children={() => (
            <InterestedEventsScreen goToEvent={functionCalls.goToEvent} />
          )}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Body;
