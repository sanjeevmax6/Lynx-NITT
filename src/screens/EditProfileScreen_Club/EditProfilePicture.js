import React from 'react';
import {View, TouchableOpacity, Image, Dimensions} from 'react-native';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';
import {ScaledSheet} from 'react-native-size-matters';

import * as colors from '../../utils/colors';
import DocumentPicker from 'react-native-document-picker';
import {Avatar} from 'react-native-paper';

import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import {observer} from 'mobx-react';
import {NO_IMAGE_URL} from '../../utils/API_CONSTANTS';

const WIDTH = Dimensions.get('window').width;

const EditProfilePicture = observer(() => {
  const selectImage = async () => {
    try {
      const image = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      EDIT_CLUB_PROFILE_STORE.setClubImage(image.uri);
      EDIT_CLUB_PROFILE_STORE.setImage(image);
    } catch (err) {
      if (DocumentPicker.isCancel()) console.log(err);
      else throw err;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image
          source={{
            uri: EDIT_CLUB_PROFILE_STORE.getClubImage
              ? EDIT_CLUB_PROFILE_STORE.getClubImage
              : NO_IMAGE_URL,
          }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.edit} onPress={selectImage}>
          <Avatar.Icon
            icon="lead-pencil"
            size={35}
            color="white"
            style={{backgroundColor: colors.Accent, elevation: 5}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageView: {
    marginTop: '3@vs',
    elevation: 1,
    height: WIDTH / 1.75,
    width: WIDTH / 1.75,
    borderRadius: (WIDTH / 1.75) * 2,
  },
  image: {
    height: WIDTH / 1.75,
    width: WIDTH / 1.75,
    borderRadius: (WIDTH / 1.75) * 2,
  },
  edit: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: WIDTH / 2.8,
  },
});

export default EditProfilePicture;
