import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useTabIndex} from 'react-native-paper-tabs';

const TagSearchResult = ({SearchQuery}) => {
  const [API, setAPI] = useState('');
  const index = useTabIndex();
  if (index === 2) {
    if (SearchQuery != '') {
      if (SearchQuery != API) {
        setAPI(SearchQuery);
        console.log('Doing API CALL IN TAG SEARCH: ' + SearchQuery);
      }
    } else if (SearchQuery === '' && API != '') {
      setAPI('');
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text style={{textAlign: 'center'}}>
          TagSearchResult: {'\n\n'} {API}{' '}
          <Text style={{fontWeight: 'bold'}}> </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TagSearchResult;
