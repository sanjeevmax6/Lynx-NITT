import React from 'react';
import {View, Text} from 'react-native';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';
import * as colors from '../../utils/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ActivityLoader = () => {
  return (
    <ContentLoader
      speed={1.5}
      style={{marginHorizontal: scale(9), marginVertical: verticalScale(9)}}
      width={windowWidth * 0.95}
      height={verticalScale(100)}
      backgroundColor={colors.GRAY_MEDIUM}
      foregroundColor="#ecebeb">
      <Rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      <Rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      <Rect x="0" y="56" rx="3" ry="3" width={windowWidth * 0.85} height="6" />
      <Rect x="0" y="72" rx="3" ry="3" width={windowWidth * 0.75} height="6" />
      <Rect x="0" y="88" rx="3" ry="3" width={windowWidth * 0.55} height="6" />
      <Circle cx="20" cy="20" r="20" />
    </ContentLoader>
  );
};

export default ActivityLoader;
