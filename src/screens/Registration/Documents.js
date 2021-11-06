import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {TextInput, IconButton} from 'react-native-paper';
import {scale, ScaledSheet} from 'react-native-size-matters';
import DocumentPicker from 'react-native-document-picker';
import * as colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NextButton from './nextButton';
import BackButton from './backButton';

const WIDTH = Dimensions.get('window').width;

const Documents = ({scrollViewRef, callback, docStates}) => {
  const scroll = () => {
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH * 3,
        animated: true,
      });
    }
    callback('Profile Picture', 'Upload your profile photo', 3);
  };

  const selectFile = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      docStates.setPassport(file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) console.log(err);
      else throw err;
    }
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

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label="Aadhar Number"
        mode="outlined"
        value={docStates.aadhar}
        theme={{
          colors: {
            primary: 'black',
          },
        }}
        style={styles.inputAd}
        onChangeText={anum => {
          docStates.setAadhar(anum);
        }}
      />
      <Text style={styles.passtitle}>Passport Upload</Text>
      {docStates.passport && (
        <View style={styles.file}>
          <Text style={styles.filename}>{docStates.passport.name}</Text>
          <IconButton
            size={scale(15)}
            icon="close"
            onPress={() => {
              docStates.setPassport(null);
            }}
          />
        </View>
      )}
      {!docStates.passport && (
        <TouchableOpacity style={styles.attach} onPress={selectFile}>
          <Icon name="attach-file" color={colors.Accent} size={16} />
          <Text style={styles.attachText}>Attach</Text>
        </TouchableOpacity>
      )}
      <NextButton handler={scroll} />
      <BackButton handler={back} />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    backgroundColor: colors.regBackground,
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },
  split: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  inputAd: {width: '100%'},
  passtitle: {
    alignSelf: 'flex-start',
    marginTop: '10@vs',
    color: colors.FontColor,
    fontWeight: 'bold',
  },
  attach: {
    alignSelf: 'flex-start',
    marginTop: '5@vs',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachText: {
    fontSize: scale(13),
    alignSelf: 'center',
    color: colors.regAttach,
  },
  file: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#202020',
    backgroundColor: colors.GRAY_MEDIUM,
    marginTop: '5@vs',
  },
  filename: {
    flex: 1,
    marginHorizontal: scale(10),
    fontSize: scale(14),
  },
});

export default Documents;
