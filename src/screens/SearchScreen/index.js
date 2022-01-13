import React, {useState} from 'react';
import {View, SafeAreaView, PixelRatio} from 'react-native';
import {Searchbar, DefaultTheme, configureFonts} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import * as color from '../../utils/colors';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

import ClubSearchResult from './ClubSearchResult';
import TagSearchResult from './TagSearchResult';
import EventSearchResult from './EventSearchResult';
import AcadSearchResult from './AcademicSearchResult';

const SearchScreen = ({route, navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [Screen, setScreen] = useState('clubs');

  if (route.params != undefined) {
    if (route.params.params.searchText != '') {
      setSearchQuery(route.params.params.searchText);
      route.params.params.searchText = '';
    }
  }
  const onChangeSearch = query => {
    setSearchQuery(query);
  };

  const themeSearchBar = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: color.Tertiary,
      accent: color.Tertiary,
    },
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Searchbar
          style={{elevation: 0, margin: 0, padding: 0, color: 'red'}}
          placeholder={'Search ' + Screen}
          onChangeText={onChangeSearch}
          autoFocus={true}
          value={searchQuery}
          iconColor={color.BLACK}
          theme={themeSearchBar}
        />

        <Tab.Navigator
          keyboardDismissMode="none"
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: Math.floor(
                scale(11) / PixelRatio.getFontScale().toFixed(1),
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
            name="Clubs"
            children={() => (
              <ClubSearchResult
                searchQuery={searchQuery}
                setScreen={setScreen}
                navigation={navigation}
              />
            )}
          />
          <Tab.Screen
            name="Events"
            children={() => (
              <EventSearchResult
                searchQuery={searchQuery}
                setScreen={setScreen}
                navigation={navigation}
              />
            )}
          />
          <Tab.Screen
            name="Tags"
            children={route => (
              <TagSearchResult
                searchQuery={searchQuery}
                setScreen={setScreen}
                navigation={navigation}
              />
            )}
          />
          <Tab.Screen
            name="Circulars"
            children={() => (
              <AcadSearchResult
                searchQuery={searchQuery}
                setScreen={setScreen}
                navigation={navigation}
              />
            )}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
