import React from 'react';
import {View, Text} from 'react-native';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';
import * as colors from '../../utils/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const StudentUserLoader = () => {
  return (
    <ContentLoader
      speed={1.5}
      style={{marginHorizontal: scale(9), marginVertical: verticalScale(9)}}
      width={windowWidth * 0.95}
      height={windowHeight}
      backgroundColor={colors.GRAY_MEDIUM}
      foregroundColor="#ecebeb">
      <Circle cx={scale(50)} cy={scale(50)} r={scale(36)} />
      <Rect
        x="0"
        y="0"
        rx="6"
        ry="6"
        width={windowWidth * 0.95}
        height={verticalScale(180)}
      />
      <Rect
        x="0"
        y={verticalScale(200)}
        rx="4"
        ry="4"
        width={windowWidth * 0.75}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(225)}
        rx="4"
        ry="4"
        width={windowWidth * 0.85}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(250)}
        rx="4"
        ry="4"
        width={windowWidth * 0.75}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(275)}
        rx="4"
        ry="4"
        width={windowWidth * 0.65}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(300)}
        rx="4"
        ry="4"
        width={windowWidth * 0.55}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(325)}
        rx="4"
        ry="4"
        width={windowWidth * 0.75}
        height={verticalScale(9)}
      />

      <Rect
        x="0"
        y={verticalScale(350)}
        rx="4"
        ry="4"
        width={windowWidth * 0.85}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(375)}
        rx="4"
        ry="4"
        width={windowWidth * 0.75}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(400)}
        rx="4"
        ry="4"
        width={windowWidth * 0.55}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(425)}
        rx="4"
        ry="4"
        width={windowWidth * 0.65}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(450)}
        rx="4"
        ry="4"
        width={windowWidth * 0.75}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(475)}
        rx="4"
        ry="4"
        width={windowWidth * 0.75}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(500)}
        rx="4"
        ry="4"
        width={windowWidth * 0.85}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(525)}
        rx="4"
        ry="4"
        width={windowWidth * 0.75}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(550)}
        rx="4"
        ry="4"
        width={windowWidth * 0.65}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(575)}
        rx="4"
        ry="4"
        width={windowWidth * 0.55}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(600)}
        rx="4"
        ry="4"
        width={windowWidth * 0.65}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(625)}
        rx="4"
        ry="4"
        width={windowWidth * 0.55}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(650)}
        rx="4"
        ry="4"
        width={windowWidth * 0.75}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(675)}
        rx="4"
        ry="4"
        width={windowWidth * 0.65}
        height={verticalScale(9)}
      />
      <Rect
        x="0"
        y={verticalScale(700)}
        rx="4"
        ry="4"
        width={windowWidth * 0.85}
        height={verticalScale(9)}
      />
    </ContentLoader>
  );
};

export default StudentUserLoader;
