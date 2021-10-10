import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import lf from '../../res/lottieFiles/No_Result.json';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const AcademicSearchResult = ({searchQuery, setScreen}) => {
  const [API, setAPI] = useState('');
  const isFocused = useIsFocused();
  if (isFocused) {
    setScreen('ACADEMIC');
    if (searchQuery != '') {
      if (searchQuery != API) {
        setAPI(searchQuery);
        console.log('Doing API CALL IN ACADEMIC SEARCH: ' + searchQuery);
      }
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text style={{textAlign: 'center'}}>
          Searching for{' '}
          <Text style={{fontWeight: 'bold'}}>"{searchQuery}" </Text>
        </Text>
        <LottieView source={lf} progress={1} autoPlay loop />
      </View>
    </SafeAreaView>
  );
};

export default AcademicSearchResult;
