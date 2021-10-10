import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ClubSearchResult = ({searchQuery, setScreen}) => {
  const [API, setAPI] = useState('');
  const isFocused = useIsFocused();
  if (isFocused) {
    setScreen('CLUB');
    if (searchQuery != '') {
      if (searchQuery != API) {
        setAPI(searchQuery);
        console.log('Doing API CALL IN CLUB SEARCH: ' + searchQuery);
      }
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text style={{textAlign: 'center'}}>
          Searching for{' '}
          <Text style={{fontWeight: 'bold'}}>"{searchQuery}" </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ClubSearchResult;
