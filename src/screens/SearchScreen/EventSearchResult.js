import React, {useState} from 'react';
import {View, Text, FlatList, Keyboard, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ClubSearchCard from '../../components/ClubSearchCard';
import EventSearchCard from '../../components/EventSearchCard';
import {searchApi} from '../../apis/searchApi';
import * as colors from '../../utils/colors';
import {ActivityIndicator} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import {isLive} from '../../utils/helperFunction/isLive';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';

const EventSearchResult = ({searchQuery, setScreen, navigation}) => {
  const footer = () => {
    return <View />;
  };

  const [API, setAPI] = useState('');
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [Error, setError] = useState(false);
  const [ErrorText, setErrorText] = useState('');
  const isFocused = useIsFocused();

  if (isFocused) {
    setScreen('events');
    BOTTOM_NAV_STORE.setTabVisibility(true);
    if (searchQuery != '') {
      if (searchQuery != API) {
        setAPI(searchQuery);
        setLoading(true);
        console.log('Doing API CALL IN EVENT SEARCH: ' + searchQuery);

        searchApi(
          searchQuery,
          'event',
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
                        navigation.push('EventDescriptionScreen', {
                          eventId: item.id,
                        });
                      }}>
                      <EventSearchCard
                        name={item.title}
                        desc={item.description}
                        organizer={item.clubName}
                        eventImage={item.image}
                        date={item.startDate}
                        startTime={item.startDate}
                        endTime={item.endDate}
                      />
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

export default EventSearchResult;
