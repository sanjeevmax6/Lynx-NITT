import React, {useState} from 'react';
import {PixelRatio, View, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import InterestedEventsScreen from './InterestedEventsScreen';
import ClubFollowingScreen from './ClubFollowingScreen';
import {scale} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';
import {ActivityIndicator} from 'react-native-paper';

const Body = ({navigation, functionCalls}) => {
  const [followCount, setFollowCount] = useState(
    STUDENT_DETAILS_STORE.getInterests.length,
  );

  return (
    <View style={styles.container}>
      <Tab.Navigator
        backBehavior={'order'}
        lazy={true}
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
          tabBarStyle: {textTransform: 'none', width: 'auto'},
          tabBarPressColor: color.tabBarPressColor,
          tabBarIndicatorStyle: {backgroundColor: color.sliderColor},
          tabBarActiveTintColor: color.tabBarActiveTintColor,
          tabBarInactiveTintColor: color.tabBarInactiveTintColor,
        }}>
        <Tab.Screen
          name={`Following (${followCount})`}
          children={() => (
            <ClubFollowingScreen
              navigation={navigation}
              goToClub={functionCalls.goToClub}
              setFollowCount={setFollowCount}
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
