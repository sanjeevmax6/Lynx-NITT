import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import DocumentPicker from 'react-native-document-picker';
import {Button} from 'react-native-paper';

const StudentPhoto = ({PhotoStates}) => {
  const selectImage = async () => {
    try {
      const image = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      PhotoStates.setStudentPic(image.uri);
      PhotoStates.setStudentPicSelected(true);
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
        {PhotoStates.isStudentPicSelected ? (
          <Image
            source={{uri: PhotoStates.studentPic}}
            style={{
              height: verticalScale(200),
              width: scale(200),
            }}
          />
        ) : (
          <Button
            icon="plus"
            mode="text"
            color={color.BLACK}
            onPress={() => selectImage()}>
            UPLOAD STUDENT PHOTO
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
    color: 'lightsteelblue',
    fontSize: 16,
  },
});

export default StudentPhoto;
