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
    setScreen('TAG');
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
          <ActivityIndicator
            animating={true}
            size={'large'}
            color={colors.Tertiary}
            style={{margin: scale(10)}}
          />
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
                          eventId: item._id,
                        });
                      }}>
                      <EventSearchCard
                        name={item.title}
                        desc={item.description}
                        organizer={'NA'}
                        eventImage={'0c4ca42c-619d-4cbc-9124-4efe80cd5a56.jpg'}
                        date={item.startDate}
                        isLive={isLive(item.startDate, item.endDate)}
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
