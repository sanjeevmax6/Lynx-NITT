import React, {useState} from 'react';
import {View, Image, Dimensions, ActivityIndicator} from 'react-native';
import {verticalScale, scale, ScaledSheet} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import DocumentPicker from 'react-native-document-picker';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Images from './Images';
import Error from './Error';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const win = Dimensions.get('window');

const EventsCreationImages = ({imageStates, scrollViewRef, callback}) => {
  const [isLoading, setLoading] = useState(false);
  const [imgEr, setImgEr] = useState(false);
  const selectImage = async () => {
    try {
      const image = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      imageStates.setProfilePicUri(prevList => [...prevList, image.uri]);
      imageStates.setProfilePicSelected(false);
      setLoading(true);
      await Image.getSize(
        image.uri,
        () => {
          setLoading(false);
          imageStates.setProfilePicSelected(true);
          setImgEr(false);
        },
        err => {
          console.log(err);
        },
      );
    } catch (err) {
      if (DocumentPicker.isCancel()) console.log(err);
      else throw err;
    }
  };
  const deleteImage = index => {
    imageStates.setProfilePicUri(prevList => {
      let arr = [...prevList];
      arr.splice(index, 1);
      return arr;
    });
  };
  const scroll = () => {
    if (imageStates.profilePicUri.length < 2) {
      setImgEr(true);
      return;
    }
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: win.width * 4,
        animated: true,
      });
    }
    callback('Additional Info', 5);
  };
  const back = () => {
    callback('Date and Time', 3);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: win.width * 2,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.choosePicture}>
        {imageStates.profilePicUri.length > 1 ? (
          <Images
            images={imageStates.profilePicUri}
            selectImage={selectImage}
            deleteImage={deleteImage}
          />
        ) : isLoading ? (
          <ActivityIndicator />
        ) : (
          <Button
            icon="plus"
            mode="text"
            color={color.BLACK}
            onPress={() => selectImage()}>
            Add cover photo
          </Button>
        )}
      </View>
      {imgEr && (
        <View style={styles.error}>
          <Error text="Please upload cover photo" />
        </View>
      )}
      <Button
        style={styles.next}
        mode="contained"
        onPress={scroll}
        labelStyle={{color: color.regNext}}>
        Next
      </Button>
      <Button
        style={styles.back}
        mode="outline"
        onPress={back}
        labelStyle={{color: color.regAttach}}
        icon="chevron-left">
        Back
      </Button>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: win.width,
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  choosePicture: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: color.Lightsteelblue,
    fontSize: '16@s',
  },
  error: {
    position: 'absolute',
    bottom: '60@vs',
    left: scale(HorizontalPadding),
  },
  next: {
    position: 'absolute',
    bottom: '20@vs',
    right: '20@vs',
    backgroundColor: color.regAttach,
  },
  back: {
    position: 'absolute',
    bottom: '20@vs',
    left: '10@vs',
  },
});

export default EventsCreationImages;
