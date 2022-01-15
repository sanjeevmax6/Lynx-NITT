import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {Text, View, ScrollView, Image, Dimensions} from 'react-native';

import {ScaledSheet} from 'react-native-size-matters';
import {API_GET_IMAGE, NO_IMAGE_URL} from '../../utils/API_CONSTANTS';
import * as colors from '../../utils/colors';
import {EVENT_EDIT_STORE} from '../../mobx/EVENT_EDIT_STORE';
import ImageView from '../../components/ImageView';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const EventEditImages = observer(() => {
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
          {EVENT_EDIT_STORE.getPhotos.length === 0 ? (
            <>
              <Image
                resizeMode="contain"
                style={styles.wrap}
                source={{
                  uri: NO_IMAGE_URL,
                }}
              />
            </>
          ) : (
            <></>
          )}
          {EVENT_EDIT_STORE.getPhotos.map((e, index) => (
            <ImageView
              key={index}
              style={styles.wrap}
              src={API_GET_IMAGE + e}
              resizeMode="contain"
            />
          ))}
        </ScrollView>
        {EVENT_EDIT_STORE.getPhotos.length > 1 ? (
          <View style={styles.wrapDot}>
            {EVENT_EDIT_STORE.getPhotos.map((e, index) => (
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
});

export default EventEditImages;

const styles = ScaledSheet.create({
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.35,
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
