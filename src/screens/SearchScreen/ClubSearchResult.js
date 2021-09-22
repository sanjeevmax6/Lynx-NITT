import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {updateScreen} from '../../redux/reducers/searchScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

const ClubSearchResult = () => {
  const dispatch = useDispatch();

  const text = useSelector(st => {
    return st.searchScreen.ui.searchQuery;
  });
  const [API, setAPI] = useState('');
  const isFocused = useIsFocused();
  if (isFocused) {
    dispatch(updateScreen('Club'));
    if (text != '') {
      if (text != API) {
        setAPI(text);
        console.log('Doing API CALL IN CLUB SEARCH: ' + text);
      }
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text style={{textAlign: 'center'}}>
          Searching for <Text style={{fontWeight: 'bold'}}>"{text}" ... </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ClubSearchResult;
