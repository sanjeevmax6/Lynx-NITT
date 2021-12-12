import React, {useState} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import loadingLottie from '../../res/lottieFiles/loadingLottie.json';

import {LOADING_LOTTIE} from '../../utils/LOADING_TYPES';

const LoaderPage = ({LoaderType = LOADING_LOTTIE}) => {
  const [STATE, setSTATE] = useState(1);
  const toggler = () => {
    //force reload as there is a bug in the LF library
    if (STATE) {
      setSTATE(0);
    }
  };

  setTimeout(toggler, 50);
  const getLottie = () => {
    if (LoaderType === LOADING_LOTTIE) return loadingLottie;
    else if (LoaderType === LOADING_LOTTIE) return loadingLottie;
  };
  return (
    <>
      <View
        style={{
          height: '100%',
          width: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <LottieView
          source={getLottie()}
          speed={1}
          resizeMode="contain"
          autoPlay={true}
          loop
        />
      </View>
    </>
  );
};

export default LoaderPage;
