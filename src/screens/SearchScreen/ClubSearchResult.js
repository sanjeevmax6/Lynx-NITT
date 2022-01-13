import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Keyboard} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ClubSearchCard from '../../components/ClubSearchCard';
import {searchApi} from '../../apis/searchApi';
import * as colors from '../../utils/colors';
import {ActivityIndicator} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import axios from 'axios';
import {API_STORE} from '../../mobx/API_STORE';
import {API_CLUB_LIST} from '../../utils/API_CONSTANTS';
import LoaderPage from '../../components/LoadingScreen';
import {ACCENT_SEARCH_SCREEN} from '../../utils/LOADING_TYPES';

const ClubSearchResult = ({searchQuery, setScreen, navigation}) => {
  const footer = () => {
    return <View style={{height: verticalScale(6)}} />;
  };
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    if (DATA.length === 0)
      axios.get(API_STORE.getBaseUrl + API_CLUB_LIST).then(response => {
        if (response.status === 200)
          if (DATA.length === 0) setDATA(response.data.data);
      });
  });

  const [API, setAPI] = useState('');
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [Error, setError] = useState(false);
  const [ErrorText, setErrorText] = useState('');
  const isFocused = useIsFocused();

  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(true);
    setScreen('clubs');
    if (searchQuery != '') {
      if (searchQuery != API) {
        setAPI(searchQuery);
        setLoading(true);
        console.log('Doing API CALL IN CLUB SEARCH: ' + searchQuery);
        searchApi(
          searchQuery,
          'club',
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
                    <View>
                      <ClubSearchCard
                        clubIconUrl={item.profilePic}
                        clubName={item.name}
                        clubDescription={item.description}
                        navigation={navigation}
                        id={item._id}
                      />
                    </View>
                  )}
                  numColumns={1}
                />
              ) : (
                <View>
                  <FlatList
                    data={DATA}
                    vertical={true}
                    ListEmptyComponent={
                      <LoaderPage LoadingAccent={ACCENT_SEARCH_SCREEN} />
                    }
                    onScroll={() => {
                      Keyboard.dismiss();
                    }}
                    ListFooterComponent={footer()}
                    renderItem={({item}) => (
                      <View>
                        <ClubSearchCard
                          clubIconUrl={item.profilePic}
                          clubName={item.name}
                          clubDescription={item.description}
                          navigation={navigation}
                          id={item._id}
                        />
                      </View>
                    )}
                    numColumns={1}
                  />
                </View>
              )}
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default ClubSearchResult;
