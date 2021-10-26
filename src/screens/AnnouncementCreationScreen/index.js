import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  BackHandler,
} from 'react-native';
import {Divider, Button} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import DocumentPicker from 'react-native-document-picker';
import FileItem from './FileItem';
import AnnouncementCreationInputs from './AnnouncementCreationInput';
import AnnouncementCreationScreenHeader from './AnnouncementCreationScreenHeader';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const AnnouncementCreationScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const maxSubjectLength = 150;
  const maxAnnouncementLength = 300;
  const [subjectLength, setSubjectLength] = useState(maxSubjectLength);
  const [announcementLength, setAnnouncementLength] = useState(
    maxAnnouncementLength,
  );
  const inputStates = {
    title,
    setTitle,
    desc,
    setDesc,
    link,
    setLink,
    links,
    setLinks,
    subjectLength,
    setSubjectLength,
    announcementLength,
    setAnnouncementLength,
    maxSubjectLength,
    maxAnnouncementLength,
  };

  const selectFiles = async () => {
    try {
      const files = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFiles(prevList => {
        return [...prevList, ...files];
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) console.log(err);
      else throw err;
    }
  };

  const removeFile = uri => {
    setSelectedFiles(prevList => {
      return prevList.filter(item => item.uri !== uri);
    });
  };

  useEffect(() => {
    const backPress = BackHandler.addEventListener('backPress', onBackPress);

    return () => {
      backPress.remove();
    };
  }, []);

  const onBackPress = () => {
    Alert.alert('', 'Are you sure you want to discard this announcement?', [
      {
        text: 'DISCARD',
        onPress: () => navigation.goBack(),
        style: 'cancel',
      },
      {text: 'KEEP EDITING'},
    ]);
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <AnnouncementCreationScreenHeader
        navigation={navigation}
        validLength={subjectLength >= 0 && announcementLength >= 0}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        ListFooterComponentStyle={{flex: 1, justifyContent: 'flex-end'}}
        ListFooterComponent={<View style={{height: verticalScale(6)}} />}
        ListHeaderComponent={
          <>
            <AnnouncementCreationInputs inputStates={inputStates} />
            <Divider style={styles.divider} />
            <View style={styles.uploadButton}>
              <Button
                icon="upload"
                mode="text"
                onPress={() => selectFiles()}
                color={colors.WHITE}>
                Add Attachments
              </Button>
            </View>
          </>
        }
        data={selectedFiles}
        renderItem={({item}) => (
          <FileItem item={item} deleteItem={removeFile} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.Secondary,
  },
  viewScale: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(5),
  },
  divider: {
    height: verticalScale(2),
    backgroundColor: colors.GRAY_MEDIUM,
  },
  buttonViewTheme: {
    fontSize: 16,
    padding: moderateScale(8),
    backgroundColor: colors.CreationScreen_Button,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextTheme: {
    fontSize: 16,
    marginLeft: scale(10),
    color: colors.CreationScreen_ButtonText,
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: verticalScale(5),
  },
  twoButtonContainer: {
    flexDirection: 'row',
  },
  twoButtonLeft: {
    flex: 1,
    paddingRight: scale(5),
    paddingLeft: scale(20),
    paddingVertical: verticalScale(5),
  },
  twoButtonRight: {
    flex: 1,
    paddingRight: scale(20),
    paddingLeft: scale(5),
    paddingVertical: verticalScale(5),
  },
  uploadButton: {
    backgroundColor: colors.Tertiary,
    borderRadius: moderateScale(6),
    marginVertical: verticalScale(9),
    marginHorizontal: HorizontalPadding,
  },
});

export default AnnouncementCreationScreen;
