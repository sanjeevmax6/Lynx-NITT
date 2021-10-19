import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import lf from '../../res/lottieFiles/No_Result.json';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTabIndex} from 'react-native-paper-tabs';

const AcademicSearchResult = ({SearchQuery}) => {
  const [API, setAPI] = useState('');
  const index = useTabIndex();
  if (index === 3) {
    if (SearchQuery != '') {
      if (SearchQuery != API) {
        setAPI(SearchQuery);
        console.log('Doing API CALL IN ACADEMIC SEARCH: ' + SearchQuery);
      }
    } else if (SearchQuery === '' && API != '') {
      setAPI('');
    }
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text style={{textAlign: 'center'}}>
          AcademicSearchResult: {'\n\n'} {API}{' '}
          <Text style={{fontWeight: 'bold'}}> </Text>
        </Text>
        {/* <LottieView source={lf} progress={1} autoPlay loop /> */}
      </View>
    </SafeAreaView>
  );
};

export default AcademicSearchResult;
