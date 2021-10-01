import React, {useState} from 'react';
import {Text, View, ScrollView, Image, Dimensions} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import * as colors from '../../utils/colors';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Images = ({images}) => {
  const [imgActive, setimgActive] = useState(0);

  const onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  };

  return (
    <View style={styles.wrap}>
      <ScrollView
        onScroll={({nativeEvent}) => onchange(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={styles.wrap}>
        {images.map((e, index) => (
          <Image
            key={e}
            resizeMode="stretch"
            style={styles.wrap}
            source={{uri: e}}
          />
        ))}
      </ScrollView>
      <View style={styles.wrapDot}>
        {images.map((e, index) => (
          <Text
            key={e}
            style={imgActive == index ? styles.dotActive : styles.dot}>
            ●
          </Text>
        ))}
      </View>
    </View>
  );
};

export default Images;

const styles = ScaledSheet.create({
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.35,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: '3@msr',
    color: colors.EventDescriptionScreen_DotActive,
  },
  dot: {
    margin: '3@msr',
    color: colors.EventDescriptionScreen_DotInactive,
  },
});
