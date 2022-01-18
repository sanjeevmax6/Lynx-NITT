import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import successLottie from '../../res/lottieFiles/success.json';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {scale, verticalScale} from 'react-native-size-matters';
import {ICON_SIZE_LARGE} from '../../utils/UI_CONSTANTS';

import * as colors from '../../utils/colors';

const SuccessScreen = ({
  showButton = true,
  buttonText = 'NEXT',
  showIconInButton = true,
  icon = 'keyboard-arrow-right',
  fn = () => {},
  isResetPass = false,
  automatic = false,
}) => {
  const backPress = () => {
    if (isResetPass) {
      fn.pop();
    } else {
      fn();
    }
  };

  const [STATE, setSTATE] = useState(1);
  const toggler = () => {
    //force reload as there is a bug in the LF library
    if (STATE) setSTATE(0);
  };

  setTimeout(toggler, 50);
  if (automatic) {
    setTimeout(fn, 2000);
  }
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <LottieView
        style={{marginBottom: verticalScale(50)}}
        source={successLottie}
        speed={0.7}
        resizeMode="contain"
        autoPlay
        loop={false}
      />

      {showButton ? (
        <View
          style={{
            padding: scale(9),
            paddingLeft: scale(18),
            borderRadius: scale(24),
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            position: 'absolute',
            backgroundColor: colors.Accent,
            bottom: verticalScale(50),
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderRadius: scale(24),
              alignItems: 'center',
            }}
            onPress={backPress}>
            <Text
              style={{
                fontSize: scale(16),
                color: 'white',

                fontWeight: 'bold',
              }}>
              {buttonText}
            </Text>
            {showIconInButton ? (
              <Icon
                name={icon}
                color={colors.Primary}
                size={scale(ICON_SIZE_LARGE)}
                style={{marginLeft: scale(6)}}
              />
            ) : (
              <View style={{width: scale(8)}} />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default SuccessScreen;
