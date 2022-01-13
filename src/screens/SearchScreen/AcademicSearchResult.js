import React, {useState} from 'react';
import {View, Text, FlatList, Keyboard, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import EventSearchCard from '../../components/EventSearchCard';
import AcademicSearchCard from '../../components/AcademicSearchCard';
import {searchApi} from '../../apis/searchApi';
import * as colors from '../../utils/colors';
import {ActivityIndicator} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import {isLive} from '../../utils/helperFunction/isLive';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';

const AcademicSearchResult = ({searchQuery, setScreen, navigation}) => {
  const footer = () => {
    return <View />;
  };
  const Separator = () => {
    return (
      <View
        style={{
          height: verticalScale(1),
          backgroundColor: 'grey',
        }}
      />
    );
  };

  const [API, setAPI] = useState('');
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [Error, setError] = useState(false);
  const [ErrorText, setErrorText] = useState('');
  const isFocused = useIsFocused();

  if (isFocused) {
    setScreen('circulars');
    BOTTOM_NAV_STORE.setTabVisibility(true);
    if (searchQuery != '') {
      if (searchQuery != API) {
        setAPI(searchQuery);
        setLoading(true);
        console.log('Doing API CALL IN ACADEMIC SEARCH: ' + searchQuery);

        searchApi(
          searchQuery,
          'admin',
          res => {
            setError(false);
            setData(res.data);
            setLoading(false);
          },
          err => {
            setErrorText(err);
            setError(true);

            setData([]);
            setLoading(false);
          },
        );
      }
    } else if (searchQuery === '' && API != '') {
      setAPI('');
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {Loading ? (
        <>
          <ActivityIndicator
            animating={true}
            size={'small'}
            color={colors.Tertiary}
            style={{margin: scale(10)}}
          />
          {searchQuery ? (
            <Text
              style={{
                textAlign: 'center',
                fontSize: scale(14),
                paddingVertical: verticalScale(6),
              }}>
              Searching for{' '}
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: scale(14),
                  paddingVertical: verticalScale(6),
                }}>
                "{searchQuery}"...
              </Text>
            </Text>
          ) : null}
        </>
      ) : (
        <>
          {Error ? (
            <>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: scale(14),
                  fontWeight: 'bold',
                  paddingVertical: verticalScale(6),
                }}>
                {ErrorText}
              </Text>
            </>
          ) : (
            <>
              {API != '' ? (
                <FlatList
                  data={Data}
                  onScroll={() => {
                    Keyboard.dismiss();
                  }}
                  ListFooterComponent={footer()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        console.log('Academic');
                      }}>
                      <AcademicSearchCard
                        title={item.title}
                        name={item.club.name}
                        desc={item.description}
                        url={item.club.profilePic}
                      />
                      <Separator />
                    </TouchableOpacity>
                  )}
                  numColumns={1}
                />
              ) : (
                <View></View>
              )}
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default AcademicSearchResult;
