import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {ScaledSheet} from 'react-native-size-matters';
import ImageView from '../../components/ImageView';
import {API_GET_IMAGE, NO_IMAGE_URL} from '../../utils/API_CONSTANTS';
import * as colors from '../../utils/colors';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Images = ({images, navigation}) => {
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
    <View>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({nativeEvent}) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}>
          {images.length === 0 ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('ImageScreen', {imgUrl: NO_IMAGE_URL});
                }}>
                <Image
                  resizeMode="cover"
                  style={styles.wrap}
                  source={{
                    uri: NO_IMAGE_URL,
                  }}
                />
              </TouchableOpacity>
            </>
          ) : (
            <></>
          )}
          {images.map((e, index) => (
            <TouchableOpacity
              style={styles.wrap}
              onPress={() => {
                navigation.push('ImageScreen', {imgUrl: API_GET_IMAGE + e});
              }}
              key={index}>
              <ImageView
                key={index}
                src={API_GET_IMAGE + e}
                style={styles.wrap}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        {images.length > 1 ? (
          <View style={styles.wrapDot}>
            {images.map((e, index) => (
              <Text
                key={e}
                style={imgActive == index ? styles.dotActive : styles.dot}>
                ●
              </Text>
            ))}
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default Images;

const styles = ScaledSheet.create({
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.5,
    backgroundColor: colors.Secondary,
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
    fontSize: '15@s',
  },
  dot: {
    margin: '3@msr',
    color: colors.EventDescriptionScreen_DotInactive,
    fontSize: '15@s',
  },
});
