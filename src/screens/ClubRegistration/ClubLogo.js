import React from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {Button, Avatar} from 'react-native-paper';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import DocumentPicker from 'react-native-document-picker';
import {observer} from 'mobx-react';
import {CLUB_REGISTER_STORE} from '../../mobx/CLUB_REGISTER_STORE';
import Error from '../../components/Error';

const WIDTH = Dimensions.get('window').width;

const selectFile = async () => {
  try {
    const file = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.images],
    });
    console.log(file.fileCopyUri);

    EDIT_CLUB_PROFILE_STORE.setClubImage(file.fileCopyUri);
    CLUB_REGISTER_STORE.setError(false);
  } catch (err) {
    if (DocumentPicker.isCancel(err)) console.log(err);
    else throw err;
  }
};

const ClubLogo = observer(({forwardAction, backwardAction}) => {
  const checkError = () => {
    if (
      EDIT_CLUB_PROFILE_STORE.getClubImage ==
      'https://imagizer.imageshack.com/img922/5549/DWQolC.jpg'
    )
      CLUB_REGISTER_STORE.setError(true);
    else {
      forwardAction();
      CLUB_REGISTER_STORE.setError(false);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.Secondary,
      }}>
      <Text style={styles.title}>Upload your Club Profile Picture!</Text>
      <View style={styles.imageView}>
        <Image
          source={{
            uri: EDIT_CLUB_PROFILE_STORE.getClubImage,
          }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.edit} onPress={selectFile}>
          <Avatar.Icon
            icon="lead-pencil"
            size={35}
            color="white"
            style={{backgroundColor: colors.Accent, elevation: 5}}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: '90%', marginTop: verticalScale(50)}}>
        {CLUB_REGISTER_STORE.getError && (
          <Error text={'Please select a profile picture for your club!'} />
        )}
      </View>
      <Button
        style={styles.next}
        mode="contained"
        onPress={() => {
          checkError();
        }}
        labelStyle={{color: colors.regNext}}>
        Next
      </Button>
      <Button
        style={styles.back}
        mode="outline"
        onPress={() => {
          backwardAction();
        }}
        labelStyle={{color: colors.regAttach}}
        icon="chevron-left">
        Back
      </Button>
    </View>
  );
});

export default ClubLogo;

const styles = ScaledSheet.create({
  title: {
    fontSize: '16@s',
    color: colors.FontColor,
    fontWeight: '500',
    marginTop: '18@vs',
  },
  next: {
    position: 'absolute',
    bottom: verticalScale(20),
    right: verticalScale(20),
    backgroundColor: colors.regAttach,
  },
  back: {
    position: 'absolute',
    bottom: '20@vs',
    left: '10@vs',
  },
  edit: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: WIDTH / 2.8,
  },
  imageView: {
    marginTop: '20@vs',
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
});
