import React from 'react';
import {
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
const HEIGHT = Dimensions.get('window').height;
const Images = ({url, navigation}) => {
  return (
    <View style={styles.images}>
      <Pressable
        onPress={() => {
          navigation.navigate('ImageScreen', {imgUrl: url});
        }}>
        <Image
          source={{
            uri: url,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
};

const styles = ScaledSheet.create({
  images: {
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: HEIGHT * 0.35,
    backgroundColor: 'black',
  },
});

export default Images;
