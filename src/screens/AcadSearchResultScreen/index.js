import React from 'react';
import {View, Text} from 'react-native';
import lf from '../../lottieFiles/No_Result.json';
import LottieView from 'lottie-react-native';
const AcadSearchResult = () => {
  return (
    <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
      <LottieView source={lf} progress={1} autoPlay loop />
    </View>
  );
};

export default AcadSearchResult;
