import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {verticalScale, scale} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import DocumentPicker from 'react-native-document-picker';
import {Button} from 'react-native-paper';

const win = Dimensions.get('window');

const EventsCreationHeader = ({headerStates}) => {
  const [width, setWidth] = useState(1.0);
  const [height, setHeight] = useState(1.0);
  const [isLoading, setLoading] = useState(false);
  const selectImage = async () => {
    try {
      const image = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      headerStates.setProfilePicUri(image.uri);
      headerStates.setProfilePicSelected(false);
      setLoading(true);
      await Image.getSize(
        image.uri,
        (width, height) => {
          setWidth(width);
          setHeight(height);
          setLoading(false);
          headerStates.setProfilePicSelected(true);
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.choosePicture}
        onPress={() => selectImage()}>
        {headerStates.isProfilePicSelected ? (
          <Image
            source={{uri: headerStates.profilePicUri}}
            style={{
              flex: 1,
              resizeMode: 'contain',
              aspectRatio: width / height,
              width: win.width,
            }}
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
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 16,
  },
});

export default EventsCreationHeader;
