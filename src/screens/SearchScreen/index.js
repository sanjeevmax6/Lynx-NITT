import React, {useState} from 'react';
import {View, SafeAreaView, PixelRatio} from 'react-native';

import * as color from '../../utils/colors';
import {scale} from 'react-native-size-matters';

import {NavigationContainer} from '@react-navigation/native';

import {Searchbar, DefaultTheme, configureFonts} from 'react-native-paper';
import {Tabs, TabScreen, useTabNavigation} from 'react-native-paper-tabs';
import ClubSearchResult from './ClubSearchResult';
import TagSearchResult from './TagSearchResult';
import EventSearchResult from './EventSearchResult';
import AcadSearchResult from './AcademicSearchResult';

const SearchScreen = ({route}) => {
  const [SearchQuery, setSearchQuery] = useState('');
  console.log('Pixel Ratio: ' + PixelRatio.getFontScale().toFixed(1));
  console.log(scale(10));
  console.log(Math.floor(scale(12) / PixelRatio.getFontScale().toFixed(1)));
  const goTo = useTabNavigation();
  if (route.params != undefined) {
    if (route.params.params.searchText != '') {
      setSearchQuery(route.params.params.searchText);
      route.params.params.searchText = '';

      // goTo(2);
      console.log('FROM TAG');
    }
  }
  const onChangeSearch = query => {
    setSearchQuery(query);
  };
  const fontConfig = {
    ios: {
      medium: {
        fontSize: Math.floor(scale(12) / PixelRatio.getFontScale().toFixed(1)),
        fontWeight: 'bold',
      },
    },
    android: {
      medium: {
        fontFamily: 'normal',
        fontSize: Math.floor(scale(12) / PixelRatio.getFontScale().toFixed(1)),
        fontWeight: 'bold',
      },
    },
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: color.WHITE,
      accent: '#f1c40f',
    },
    fonts: configureFonts(fontConfig),
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
    <NavigationContainer independent={true}>
      <View>
      <SafeAreaView>
        <Searchbar
          style={{elevation: 0, margin: 0, padding: 0}}
          placeholder="Search"
          onChangeText={onChangeSearch}
          autoFocus={true}
          value={SearchQuery}
          theme={themeSearchBar}
          iconColor={color.BLACK}
        />
        </SafeAreaView>
      </View>
      <Tabs
        uppercase={false}
        theme={theme}
        showLeadingSpace={false}
        onChangeIndex={n => {
          //console.log(n);
        }}
        //mode="scrollable"
      >
        <TabScreen label="Clubs">
          <ClubSearchResult SearchQuery={SearchQuery} />
        </TabScreen>
        <TabScreen label="Events">
          <EventSearchResult SearchQuery={SearchQuery} />
        </TabScreen>
        <TabScreen label="Tags">
          <TagSearchResult SearchQuery={SearchQuery} />
        </TabScreen>
        <TabScreen label="Acads">
          <AcadSearchResult SearchQuery={SearchQuery} />
        </TabScreen>
      </Tabs>
    </NavigationContainer>
  );
};

export default SearchScreen;
