import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import DocumentPicker from 'react-native-document-picker';
import Error from '../../components/Error';
import NextButton from './nextButton';
import BackButton from './backButton';

import {observer} from 'mobx-react';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
import {NO_IMAGE_URL} from '../../utils/API_CONSTANTS';

const WIDTH = Dimensions.get('window').width;

const ProfilePic = observer(({scrollViewRef, callback}) => {
  // const [picEr, setpicEr] = useState(false);
  const [URI, setURI] = useState(NO_IMAGE_URL);
  const scroll = () => {
    // if (!STUDENT_REGISTRATION_STORE.getPicture) {
    //   setpicEr(true);
    //   return;
    // }
    //setpicEr(false);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH * 3,
        animated: true,
      });
    }
    callback('Reset Password', 'Enter your new password.', 3);
  };

  const back = () => {
    callback('Basic Information', 'Enter your date of birth and address', 1);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH * 1,
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
      {/* {picEr && (
        <View>
          <Error text="Upload your photo" />
        </View>
      )} */}
      <Text
        style={{
          fontSize: scale(12),
          color: colors.GRAY_DARK,
          fontWeight: '300',
          paddingTop: verticalScale(18),
          textTransform: 'uppercase',
        }}>
        Optional
      </Text>
      <Text
        style={{
          fontSize: scale(12),
          color: colors.GRAY_DARK,
          textTransform: 'uppercase',
          fontWeight: '300',
        }}>
        Can be changed later
      </Text>
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
