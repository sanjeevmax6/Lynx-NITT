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
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const TagSearchResult = ({searchQuery, setScreen, navigation}) => {
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
    setScreen('tags');
    BOTTOM_NAV_STORE.setTabVisibility(true);
    if (searchQuery != '') {
      if (searchQuery != API) {
        setAPI(searchQuery);
        setLoading(true);
        console.log('Doing API CALL IN TAG SEARCH: ' + searchQuery);

        searchApi(
          searchQuery,
          'tag',
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: scale(HorizontalPadding),
              marginVertical: verticalScale(HorizontalPadding),
              justifyContent: 'center',
            }}>
            <ActivityIndicator
              animating={true}
              size={'small'}
              color={colors.Tertiary}
              style={{margin: scale(10)}}
            />

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
                  color: colors.GRAY_DARK,
                }}>
                "{searchQuery}"...
              </Text>
            </Text>
          </View>
        </>
      ) : (
        <>
          {Error ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: scale(HorizontalPadding),
                  marginVertical: verticalScale(HorizontalPadding + 5),
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: scale(14),
                    paddingVertical: verticalScale(6),
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: scale(14),
                      paddingVertical: verticalScale(9),
                      color: colors.GRAY_DARK,
                    }}>
                    {ErrorText}
                  </Text>
                </Text>
              </View>
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

export default TagSearchResult;
