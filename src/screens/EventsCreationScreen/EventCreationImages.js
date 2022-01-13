import React, {useState} from 'react';
import {View, Image, Dimensions, ActivityIndicator} from 'react-native';
import {verticalScale, scale, ScaledSheet} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import DocumentPicker from 'react-native-document-picker';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Images from './Images';
import Error from '../../components/Error';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {
  eventCreation_DateTitle,
  eventCreation_tags_linksTitle,
} from '../../utils/stringConstants';
import {observer} from 'mobx-react';
import {EVENT_CREATION_STORE} from '../../mobx/EVENT_CREATION_STORE';

const win = Dimensions.get('window');

const EventCreationImages = observer(({scrollViewRef, callback}) => {
  const [isLoading, setLoading] = useState(false);

  //handling scroll
  const scroll = () => {
    if (EVENT_CREATION_STORE.getImages.length < 2) {
      EVENT_CREATION_STORE.setImageError(true);
      return;
    }
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: win.width * 4,
        animated: true,
      });
    }
    callback(eventCreation_tags_linksTitle, 5);
  };
  const back = () => {
    callback(eventCreation_DateTitle, 3);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: win.width * 2,
        animated: true,
      });
    }
  };
  //

  const selectImage = async () => {
    try {
      const image = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      EVENT_CREATION_STORE.addImage(image);
      EVENT_CREATION_STORE.setProfilePictureSelected(false);
      console.log(EVENT_CREATION_STORE.getImages.length);
      //EVENT_CREATION_STORE.setLoading(false);
      console.log(image);
      setLoading(true);
      await Image.getSize(
        image.uri,
        () => {
          //EVENT_CREATION_STORE.setLoading(false);
          setLoading(false);
          EVENT_CREATION_STORE.setProfilePictureSelected(true);
          EVENT_CREATION_STORE.setImageError(false);
        },
        err => {
          setLoading(false);
          console.log(err);
        },
      );
    } catch (err) {
      if (DocumentPicker.isCancel()) console.log(err);
      else throw err;
    }
  };
  const deleteImage = index => {
    EVENT_CREATION_STORE.removeImage(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.choosePicture}>
        {EVENT_CREATION_STORE.getImages.length > 1 ? (
          <Images selectImage={selectImage} deleteImage={deleteImage} />
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
      {EVENT_CREATION_STORE.getImageError && (
        <View style={styles.error}>
          <Error text="Please upload cover photo" />
        </View>
      )}

      {/* Navigation Buttons */}
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
});

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

export default EventCreationImages;
