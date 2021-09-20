import React from 'react';
import {View, Dimensions} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import * as color from '../../utils/colors';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

import ClubSearchResult from '../ClubSearchResultScreen';
import TagSearchResult from '../TagSearchResultScreen';
import EventSearchResult from '../EventSearchResultScreen';
import AcadSearchResult from '../AcadSearchResultScreen';

const SearchScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Searchbar
        style={{elevation: 0, margin: 0, padding: 0, color: 'red'}}
        placeholder="Search"
        // clearIcon="true"
        // inputStyle={{}}
        autoFocus={true}
        iconColor={color.BLACK}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: scale(10), fontWeight: 'bold'},
          lazy: 'true',
          tabBarStyle: {},
          tabBarPressColor: color.tabBarPressColor,
          tabBarIndicatorStyle: {backgroundColor: color.sliderColor},
          tabBarActiveTintColor: color.tabBarActiveTintColor,
          tabBarInactiveTintColor: color.tabBarInactiveTintColor,
        }}>
        <Tab.Screen name="Clubs" component={ClubSearchResult} />
        <Tab.Screen name="Events" component={EventSearchResult} />
        <Tab.Screen name="Tags" component={TagSearchResult} />
        <Tab.Screen name="Academics" component={AcadSearchResult} />
      </Tab.Navigator>
    </View>
  );
};

export default SearchScreen;
