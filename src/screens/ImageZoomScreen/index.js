import React, {useEffect} from 'react';
import {Dimensions, Image, BackHandler} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {ScaledSheet} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {useIsFocused} from '@react-navigation/native';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
const screen = Dimensions.get('window');

const ImageScreen = ({route, navigation}) => {
  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(false);
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.pop();
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  const {imgUrl} = route.params;
  return (
    <ImageZoom
      style={styles.container}
      cropWidth={screen.width}
      cropHeight={screen.height}
      imageWidth={screen.width}
      imageHeight={screen.height}
      minScale={1}>
      <Image
        style={styles.image}
        source={{
          uri: imgUrl,
        }}
        resizeMode={'contain'}
      />
    </ImageZoom>
  );
};

export default ImageScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: screen.width,
    height: screen.height,
  },
});
