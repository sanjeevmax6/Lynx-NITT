import React from 'react';
import {StatusBar, View, Text, Platform} from 'react-native';
import * as color from '../../utils/colors';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const CustomStatusBar = () => {
  let OS = Platform.OS;

  return (
    <>
      {OS === 'ios' ? (
        <>
          <View
            style={{
              height: getStatusBarHeight(true),
              backgroundColor: color.StatusBar,
            }}
          />
          <StatusBar barStyle="dark-content" />
        </>
      ) : (
        <StatusBar backgroundColor={color.StatusBar} barStyle="dark-content" />
      )}
    </>
  );
};

export default CustomStatusBar;
