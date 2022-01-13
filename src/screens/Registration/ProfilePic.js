import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import DocumentPicker from 'react-native-document-picker';
import Error from '../../components/Error';
import NextButton from './nextButton';
import BackButton from './backButton';

import {observer} from 'mobx-react';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';

const WIDTH = Dimensions.get('window').width;

const ProfilePic = observer(({scrollViewRef, callback}) => {
  const [picEr, setpicEr] = useState(false);
  const [URI, setURI] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlR3hMw_3daUL3Uhr5Y3uJh_kMaYzyqQhhPA&usqp=CAU',
  );
  const scroll = () => {
    if (!STUDENT_REGISTRATION_STORE.getPicture) {
      setpicEr(true);
      return;
    }
    setpicEr(false);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH * 4,
        animated: true,
      });
    }
    callback('Reset Password', 'Enter your new password', 4);
  };

  const back = () => {
    callback(
      'Documents',
      'Enter Aadhar Number and Upload your passport\n(Optional)',
      2,
    );
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH * 2,
        animated: true,
      });
    }
  };

  const selectFile = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      console.log(file);
      STUDENT_REGISTRATION_STORE.setPicture(file);
      setURI(file.fileCopyUri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) console.log(err);
      else throw err;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageView}>
        <Image
          source={{
            uri: URI,
          }}
          style={styles.image}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.edit}
          onPress={selectFile}>
          <Avatar.Icon
            icon="lead-pencil"
            size={35}
            color="white"
            style={{backgroundColor: colors.Accent, elevation: 5}}
          />
        </TouchableOpacity>
      </View>
      {picEr && (
        <View>
          <Error text="Upload your photo" />
        </View>
      )}
      <NextButton handler={scroll} />
      <BackButton handler={back} />
    </SafeAreaView>
  );
});

const styles = ScaledSheet.create({
  container: {
    width: WIDTH,
    backgroundColor: colors.regBackground,
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },
  imageView: {
    marginTop: '10@vs',
    elevation: 1,
    height: WIDTH / 1.75,
    width: WIDTH / 1.75,
    borderRadius: (WIDTH / 1.75) * 2,
  },
  image: {
    height: WIDTH / 1.75,
    width: WIDTH / 1.75,
    borderRadius: (WIDTH / 1.75) * 2,
    backgroundColor: colors.GRAY_MEDIUM,
  },
  edit: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: WIDTH / 2.8,
  },
});

export default ProfilePic;
