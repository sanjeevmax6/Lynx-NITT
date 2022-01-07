import React, {useEffect} from 'react';
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
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {clearData, createAnnouncement} from './createAnnouncementApi';
import {ANNOUNCEMENT_CREATION_STORE} from '../../mobx/ANNOUNCEMENT_CREATION_STORE.js';
import {observer} from 'mobx-react';
import LoaderPage from '../../components/LoadingScreen';
import {ACCENT_LOTTIE} from '../../utils/LOADING_TYPES';
import ErrorScreen from '../../components/ErrorScreen';
import SuccessScreen from '../../components/SuccessScreen';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';

const AnnouncementCreationScreen = observer(({navigation}) => {
  const maxSubjectLength = 150;
  const maxAnnouncementLength = 300;

  function toggleTab(tabShow) {
    BOTTOM_NAV_STORE.setTabVisibility(tabShow);
    // console.log('Toggled' + BOTTOM_NAV_STORE.getTabVisibility);
  }

  const selectFiles = async () => {
    try {
      const files = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });

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

  const onBackPress = () => {
    Alert.alert('', 'Are you sure you want to discard this announcement?', [
      {
        text: 'DISCARD',
        onPress: () => {
          clearData();
          console.log(55565);
          toggleTab(true);
          ANNOUNCEMENT_CREATION_STORE.setSuccess(false);
          navigation.pop();
        },
        style: 'cancel',
      },
      {text: 'KEEP EDITING'},
    ]);
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
                  ANNOUNCEMENT_CREATION_STORE.setError(false);
                }}
              />
            </>
          ) : (
            <>
              {ANNOUNCEMENT_CREATION_STORE.getSuccess ? (
                <>
                  <SuccessScreen
                    fn={() => {
                      ANNOUNCEMENT_CREATION_STORE.setSuccess(false);
                      navigation.pop();
                    }}
                  />
                </>
              ) : (
                <>
                  <SafeAreaView style={styles.container}>
                    <AnnouncementCreationScreenHeader
                      navigation={navigation}
                      validLength={
                        maxAnnouncementLength -
                          ANNOUNCEMENT_CREATION_STORE.getDescription.length >=
                          0 &&
                        maxSubjectLength -
                          ANNOUNCEMENT_CREATION_STORE.getTitle.length >=
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
