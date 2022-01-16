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
import {
  ANNOUNCEMENT_MAX_LENGTH,
  ANNOUNCEMENT_MAX_TITLE_LENGTH,
  HorizontalPadding,
  MAX_ANNOUNCEMENT_FILE_COUNT,
  MAX_ANNOUNCEMENT_FILE_SIZE,
} from '../../utils/UI_CONSTANTS';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {clearData, createAnnouncement} from './createAnnouncementApi';
import {ANNOUNCEMENT_CREATION_STORE} from '../../mobx/ANNOUNCEMENT_CREATION_STORE.js';
import {observer} from 'mobx-react';
import LoaderPage from '../../components/LoadingScreen';
import {ACCENT_LOTTIE} from '../../utils/LOADING_TYPES';
import ErrorScreen from '../../components/ErrorScreen';
import SuccessScreen from '../../components/SuccessScreen';
import CustomAlert from '../../components/customAlert';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';
import {useToast} from 'react-native-toast-notifications';
import {validFileSize} from '../../utils/helperFunction/FormValidation';

const AnnouncementCreationScreen = observer(({navigation}) => {
  const toast = useToast();

  function toggleTab(tabShow) {
    BOTTOM_NAV_STORE.setTabVisibility(tabShow);
    // console.log('Toggled' + BOTTOM_NAV_STORE.getTabVisibility);
  }

  const selectFiles = async () => {
    try {
      const files = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });

      if (
        ANNOUNCEMENT_CREATION_STORE.getFiles.length + files.length >
        MAX_ANNOUNCEMENT_FILE_COUNT
      ) {
        toast.show('Maximum file count is ' + MAX_ANNOUNCEMENT_FILE_COUNT, {
          type: 'warning',
        });
        return;
      }
      let i;
      for (i = 0; i < files.length; i++) {
        if (!validFileSize(files[i].size, MAX_ANNOUNCEMENT_FILE_SIZE)) {
          toast.show(
            'Maximum allowed file size is ' +
              MAX_ANNOUNCEMENT_FILE_SIZE +
              ' MB',
            {
              type: 'warning',
            },
          );
          return;
        }
      }
      console.log(files);
      ANNOUNCEMENT_CREATION_STORE.setFiles([
        ...ANNOUNCEMENT_CREATION_STORE.getFiles,
        ...files,
      ]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) console.log(err);
      else throw err;
    }
  };

  const removeFile = uri => {
    ANNOUNCEMENT_CREATION_STORE.setFiles(
      ANNOUNCEMENT_CREATION_STORE.getFiles.filter(item => item.uri !== uri),
    );
  };

  useEffect(() => {
    toggleTab(false);
    const backPress = BackHandler.addEventListener('backPress', onBackPress);

    return () => {
      backPress.remove();
    };
  }, []);

  const [modalTitle, setModalTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState({});

  const onBackPress = () => {
    setModalTitle('Confirmation');
    setModalMessage('Are you sure you want to discard this announcement?');
    setModalButtons([
      {
        text: 'DISCARD',
        func: () => {
          clearData();
          toggleTab(true);
          ANNOUNCEMENT_CREATION_STORE.setSuccess(false);
          navigation.pop();
        },
      },
      {
        text: 'KEEP EDITING',
        func: () => console.log('OK Pressed'),
      },
    ]);
    setModalVisible(true);
    return true;
  };

  return (
    <>
      {ANNOUNCEMENT_CREATION_STORE.getLoading ? (
        <>
          <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
        </>
      ) : (
        <>
          {ANNOUNCEMENT_CREATION_STORE.getError ? (
            <>
              <ErrorScreen
                errorMessage={ANNOUNCEMENT_CREATION_STORE.getErrorText}
                showButton={true}
                fn={() => {
                  if (ANNOUNCEMENT_CREATION_STORE.getErrorText === NO_NETWORK) {
                    createAnnouncement();
                    return;
                  }
                  ANNOUNCEMENT_CREATION_STORE.setErrorText('');
                  ANNOUNCEMENT_CREATION_STORE.setError(false);
                }}
              />
            </>
          ) : (
            <>
              {ANNOUNCEMENT_CREATION_STORE.getSuccess ? (
                <>
                  <SuccessScreen
                    buttonText={'BACK'}
                    showIconInButton={false}
                    fn={() => {
                      ANNOUNCEMENT_CREATION_STORE.setSuccess(false);
                      navigation.pop();
                    }}
                  />
                </>
              ) : (
                <>
                  <SafeAreaView style={styles.container}>
                    <CustomAlert
                      title={modalTitle}
                      message={modalMessage}
                      startDate={''}
                      endDate={''}
                      modalVisible={modalVisible}
                      setModalVisible={setModalVisible}
                      buttons={modalButtons}
                    />
                    <AnnouncementCreationScreenHeader
                      navigation={navigation}
                      validLength={
                        ANNOUNCEMENT_MAX_LENGTH -
                          ANNOUNCEMENT_CREATION_STORE.getDescription.trim()
                            .length >=
                          0 &&
                        ANNOUNCEMENT_MAX_TITLE_LENGTH -
                          ANNOUNCEMENT_CREATION_STORE.getTitle.trim().length >=
                          0
                      }
                      createAnnouncement={createAnnouncement}
                    />
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      keyboardShouldPersistTaps="always"
                      ListFooterComponentStyle={{
                        flex: 1,
                        justifyContent: 'flex-end',
                      }}
                      ListFooterComponent={
                        <View style={{height: verticalScale(6)}} />
                      }
                      ListHeaderComponent={
                        <>
                          <AnnouncementCreationInputs />
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
                      data={ANNOUNCEMENT_CREATION_STORE.getFiles}
                      renderItem={({item}) => (
                        <FileItem item={item} deleteItem={removeFile} />
                      )}
                    />
                  </SafeAreaView>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.Secondary,
  },

  divider: {
    height: verticalScale(2),
    backgroundColor: colors.GRAY_MEDIUM,
  },

  footer: {
    flexDirection: 'row',
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
