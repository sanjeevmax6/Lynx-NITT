import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {updateScreen} from '../../redux/reducers/searchScreen';
import lf from '../../res/lottieFiles/No_Result.json';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const AcademicSearchResult = () => {
  const dispatch = useDispatch();

  const text = useSelector(st => {
    return st.searchScreen.ui.searchQuery;
  });
  const [API, setAPI] = useState('');
  const isFocused = useIsFocused();
  if (isFocused) {
    dispatch(updateScreen('Academic'));
    if (text != '') {
      if (text != API) {
        setAPI(text);
        console.log('Doing API CALL IN ACADEMIC SEARCH: ' + text);
      }
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text style={{textAlign: 'center'}}>
          Searching for <Text style={{fontWeight: 'bold'}}>"{text}" ... </Text>
        </Text>
        <LottieView source={lf} progress={1} autoPlay loop />
      </View>
    </SafeAreaView>
  );
};

export default AcademicSearchResult;
