import React, {useState, useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import * as color from '../../utils/colors';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

import ClubSearchResult from './ClubSearchResult';
import TagSearchResult from './TagSearchResult';
import EventSearchResult from './EventSearchResult';
import AcadSearchResult from './AcademicSearchResult';
import store from '../../redux/store';
import {updateQuery} from '../../redux/reducers/searchScreen';
import {useDispatch, useSelector} from 'react-redux';

// import {useSelector} from 'react-redux';

const SearchScreen = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    setSearchQuery(query);
    dispatch(updateQuery(query));
    console.log(store.getState().searchScreen.ui.currentScreen.toUpperCase());
  };
  const [placeHolder, setPlaceHolder] = useState(
    'SEARCH ' + store.getState().searchScreen.ui.currentScreen.toUpperCase(),
  );

  store.subscribe(() => {
    if (store.getState().searchScreen.ui.searchQuery === '')
      setPlaceHolder(
        'SEARCH ' +
          store.getState().searchScreen.ui.currentScreen.toUpperCase(),
      );
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Searchbar
          style={{elevation: 0, margin: 0, padding: 0, color: 'red'}}
          placeholder={placeHolder}
          onChangeText={onChangeSearch}
          autoFocus={true}
          iconColor={color.BLACK}
        />
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: scale(11),
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
          <Tab.Screen name="Clubs" children={() => <ClubSearchResult />} />
          <Tab.Screen name="Events" children={() => <EventSearchResult />} />
          <Tab.Screen name="Tags" children={() => <TagSearchResult />} />
          <Tab.Screen name="Academics" children={() => <AcadSearchResult />} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
