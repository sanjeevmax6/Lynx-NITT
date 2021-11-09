import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {Divider, Button} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import DocumentPicker from 'react-native-document-picker';
import FileItem from './FileItem';
import AnnouncementCreationInputs from './AnnouncementCreationInput';
import AnnouncementCreationScreenHeader from './AnnouncementCreationScreenHeader';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {TabVisibility} from '../../redux/reducers/bottomNav';
import {useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import Error from '../../components/Error';
import {API_CIRCULAR_CREATION} from '../../utils/API_CONSTANTS';
import axios from 'axios';

const AnnouncementCreationScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const [errorText, setErrorText] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const dispatch = useDispatch();

  function validData() {
    if (inputStates.title == '' || inputStates.desc == '') {
      setErrorText('Please enter subject and description');
      return false;
    } else if (selectedFiles.length <= 0) {
      setErrorText('Please add atleast a document');
    } else return true;
  }

  function toggleTab(tabShow) {
    dispatch(TabVisibility(tabShow));
  }

  function clearData() {
    setErrorText(null);
    setLoading(false);
    inputStates.setDesc('');
    inputStates.setTitle('');
    inputStates.setLink('');
    inputStates.setLinks('');
    setSelectedFiles([]);
  }
  const createAnnouncement = () => {
    setErrorText(null);
    setLoading(true);
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        console.log('connected' + JSON.stringify(selectedFiles));
        if (validData()) {
          const formData = new FormData();
          formData.append('title', inputStates.title);
          formData.append('description', inputStates.desc);
          var i;
          for (i = 0; i < selectedFiles.length; i++) {
            formData.append('files', {
              uri: selectedFiles[i].uri,
              type: selectedFiles[i].type,
              name: selectedFiles[i].name,
            });
          }
          axios
            .post(API_CIRCULAR_CREATION, formData, {
              headers: {
                //Remove hard coded token once implemented
                token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNwaWRlcjEyM0BnbWFpbC5jb20iLCJjbHViIjp0cnVlLCJpZCI6IjYxODE3MGJhZGIwYjdhZTM5OWQwYTJhMyIsImlhdCI6MTYzNjEyMjU0NywiZXhwIjoxNjM2NzI3MzQ3fQ.BLRVqQU2_WMQxEENMc5KX3oR1E1RtZZGrX1h1HitsA4',
              },
            })
            .then(response => {
              console.log('got response ...:-)');
              if (response.data.message == 'Successfully created circular') {
                alert('Announcement has been sucessfully added.');
                clearData();
              }
            })
            .catch(error => {
              if (error.response) {
                console.log('response error');
                setErrorText(error.response.data.message);
                setLoading(false);
              } else if (error.request) {
                console.log(error.request);
                setErrorText('Server Error');
                setLoading(false);
              }
            });
        } else {
          console.log('Fields not entered');
          setLoading(false);
        }
      } else {
        setErrorText('No internet connection');
        setLoading(false);
      }
    });
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
    toggleTab(false);
    const backPress = BackHandler.addEventListener('backPress', onBackPress);

    return () => {
      backPress.remove();
    };
  }, []);

  const onBackPress = () => {
    Alert.alert('', 'Are you sure you want to discard this announcement?', [
      {
        text: 'DISCARD',
        onPress: () => {
          toggleTab(true);
          navigation.goBack();
        },
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
        createAnnouncement={createAnnouncement}
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
            <View style={{marginLeft: scale(10)}}>
              {errorText != null && <Error text={errorText} />}
              {loading && (
                <View style={{paddingTop: verticalScale(5)}}>
                  <ActivityIndicator size="small" color="#0000ff" />
                </View>
              )}
            </View>
          </>
        }
        data={selectedFiles}
        renderItem={({item}) => (
          <FileItem item={item} deleteItem={removeFile} />
        )}
      />

      <View></View>
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
