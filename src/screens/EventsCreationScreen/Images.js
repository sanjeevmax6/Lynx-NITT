import React, {useState, useRef} from 'react';
import {Text, View, ScrollView, Image, Dimensions} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {ScaledSheet} from 'react-native-size-matters';
import * as colors from '../../utils/colors';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Images = ({images, selectImage, deleteImage}) => {
  const scrollview = useRef(null);
  const [imgActive, setimgActive] = useState(0);

  const onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.floor(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  };
  const goBack = index => {
    if (scrollview.current !== null) {
      scrollview.current.scrollTo({
        x: WIDTH * index,
        animated: true,
      });
    }
  };
  return (
    <View>
      <View style={styles.wrap}>
        <ScrollView
          ref={scrollview}
          onScroll={({nativeEvent}) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}>
          {images.map((e, index) => (
            <View key={index} style={styles.container}>
              {e ? (
                <View style={{flexDirection: 'row'}}>
                  <Image
                    key={index}
                    resizeMode="contain"
                    style={styles.wrap}
                    source={{uri: e}}
                  />
                  <View style={styles.wrapCloseButton}>
                    <IconButton
                      icon="close"
                      color={colors.Tertiary}
                      size={20}
                      onPress={() => {
                        deleteImage(index);
                        goBack(index);
                      }}
                    />
                  </View>
                </View>
              ) : images.length < 11 ? (
                <Button
                  key={index}
                  icon="plus"
                  mode="text"
                  color={colors.BLACK}
                  style={styles.button}
                  onPress={() => selectImage()}>
                  Add more images
                </Button>
              ) : (
                <Button
                  key={index}
                  mode="text"
                  color={colors.BLACK}
                  style={styles.button}>
                  Limit Reached
                </Button>
              )}
            </View>
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
          <View />
        )}
      </View>
    </View>
  );
};

export default Images;

const styles = ScaledSheet.create({
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.6,
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
  button: {
    width: WIDTH,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapCloseButton: {
    position: 'absolute',
    top: 0,
    right: HorizontalPadding,
    flexDirection: 'row',
  },
});
