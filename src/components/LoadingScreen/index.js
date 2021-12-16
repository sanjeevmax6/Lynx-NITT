import React, {useState} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import loadingLottie from '../../res/lottieFiles/loadingLottie.json';

import {ACCENT_LOTTIE, LOADING_LOTTIE} from '../../utils/LOADING_TYPES';

import ActivityLoader from './ActivityLoader';

//loading accent decides what type of loader is to be displayed
//LoaderLottieType is to choose the Lottie file to be displayed when the Loading accent is chosen as lottie
const LoaderPage = ({
  LoadingAccent = ACCENT_LOTTIE,
  LoaderLottieType = LOADING_LOTTIE,
  repeat = 9,
}) => {
  //force reload as there is a bug in the LF library
  const [STATE, setSTATE] = useState(1);
  const toggler = () => {
    if (STATE) {
      setSTATE(0);
    }
  };
  setTimeout(toggler, 50);

  //for selecting the type of lottie file to be displayed if the Accent is Lottie
  const getLottie = () => {
    if (LoaderLottieType === LOADING_LOTTIE) return loadingLottie;
    else if (LoaderLottieType === LOADING_LOTTIE) return loadingLottie;
  };

  return (
    <>
      {LoadingAccent === ACCENT_LOTTIE ? (
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
      ) : (
        <>
          {[...Array(repeat)].map((e, i) => (
            <ActivityLoader key={i} />
          ))}
        </>
      )}
    </>
  );
};

export default LoaderPage;