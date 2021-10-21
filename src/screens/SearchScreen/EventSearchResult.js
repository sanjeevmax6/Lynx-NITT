import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useTabNavigation} from 'react-native-paper-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTabIndex} from 'react-native-paper-tabs';

const EventSearchResult = ({SearchQuery, isTag}) => {
  const goTo = useTabNavigation(2);
  useEffect(() => {
    if (isTag) goTo(2);
  });
  const [API, setAPI] = useState('');
  const index = useTabIndex();
  if (index === 1) {
    if (SearchQuery != '') {
      if (SearchQuery != API && !isTag) {
        setAPI(SearchQuery);
        console.log('Doing API CALL IN EVENTS SEARCH: ' + SearchQuery);
      }
    } else if (SearchQuery === '' && API != '') {
      setAPI('');
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text style={{textAlign: 'center'}}>
          EventSearchResult: {'\n'} {API}{' '}
          <Text style={{fontWeight: 'bold'}}> </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default EventSearchResult;
