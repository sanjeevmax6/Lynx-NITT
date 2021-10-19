import React, {useState} from 'react';
import {View, Text} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useTabIndex} from 'react-native-paper-tabs';
const EventSearchResult = ({SearchQuery}) => {
  const [API, setAPI] = useState('');
  const index = useTabIndex();
  if (index === 1) {
    if (SearchQuery != '') {
      if (SearchQuery != API) {
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
