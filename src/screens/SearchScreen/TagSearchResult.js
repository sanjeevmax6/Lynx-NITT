import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTabIndex} from 'react-native-paper-tabs';

const TagSearchResult = ({SearchQuery, setIsTag}) => {
  const [API, setAPI] = useState('');
  const index = useTabIndex();
  useEffect(() => {
    setIsTag(false);
  });

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
