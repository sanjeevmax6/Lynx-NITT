import React, {useState, useRef, useEffect} from 'react';
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

const WIDTH = Dimensions.get('window').width;

const ProfilePic = ({scrollViewRef, callback}) => {
  const [pic, setPic] = useState(null);
  const [picEr, setpicEr] = useState(false);

  const scroll = () => {
    if (!pic) {
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
      'Enter your Aadhar Number and Upload your passport pic\n(Optional)',
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
      setPic(file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) console.log(err);
      else throw err;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageView}>
        <Image
          source={require('../../assests/images/user.png')}
          style={styles.image}
        />
        <TouchableOpacity style={styles.edit} onPress={selectFile}>
          <Avatar.Icon icon="lead-pencil" size={35} color="black" />
        </TouchableOpacity>
      </View>
      {picEr && (
        <View>
          <Error text="Upload your photo" />
        </View>
      )}
      <Button
        style={styles.next}
        mode="contained"
        labelStyle={{color: colors.regNext}}
        onPress={scroll}>
        Next
      </Button>
      <Button
        style={styles.back}
        mode="outline"
        onPress={back}
        labelStyle={{color: colors.regAttach}}
        icon="chevron-left">
        Back
      </Button>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: WIDTH,
    backgroundColor: colors.regBackground,
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },
  imageView: {
    marginTop: '10@vs',
  },
  image: {
    height: WIDTH / 2,
    width: WIDTH / 2,
  },
  next: {
    position: 'absolute',
    bottom: '20@vs',
    right: '20@vs',
    backgroundColor: colors.regAttach,
  },
  edit: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: WIDTH / 2.8,
  },
  back: {
    position: 'absolute',
    bottom: '20@vs',
    left: '10@vs',
  },
});

export default ProfilePic;
