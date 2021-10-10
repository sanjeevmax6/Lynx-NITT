import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import DocumentPicker from 'react-native-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FileItem from './FileItem';
import LinkItem from './LinkItem';

const AnnouncementCreationScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [links, setLinks] = useState([]);

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

  const removeLink = link => {
    setLinks(prevList => {
      return prevList.filter(item => item != link);
    });
  };

  const addLink = () => {
    if (link !== '') {
      setLinks(prevList => {
        console.log([link, ...prevList]);
        return [link, ...prevList];
      });
      setLink('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* SelectedFilesList */}
      <FlatList
        ListHeaderComponent={
          <>
            {/* Text Inputs */}
            <View style={styles.viewScale}>
              <TextInput
                label="Announcement Subject"
                placeholder="Announcement Subject (max 300)"
                value={title}
                onChangeText={nTitle => setTitle(nTitle)}
              />
            </View>
            <View style={styles.viewScale}>
              <TextInput
                label="Announcement"
                placeholder="Announcement"
                value={desc}
                onChangeText={nDesc => setDesc(nDesc)}
                multiline={true}
              />
            </View>
            <View style={styles.viewScale}>
              <TextInput
                label="Links"
                placeholder="Links"
                value={link}
                onChangeText={nLinks => setLink(nLinks)}
                right={
                  <TextInput.Icon name={'plus'} onPress={() => addLink()} />
                }
              />
              <FlatList
                data={links}
                renderItem={({item}) => (
                  <LinkItem item={item} deleteItem={removeLink} />
                )}
              />
            </View>
            {/* Upload DOCS */}
            <TouchableOpacity
              style={styles.viewScale}
              onPress={() => selectFiles()}>
              <View style={styles.buttonViewTheme}>
                <MaterialCommunityIcons
                  name="upload"
                  size={25}
                  color={colors.CreationScreen_Icon}
                />
                <Text style={styles.buttonTextTheme}>Upload Files</Text>
              </View>
            </TouchableOpacity>
          </>
        }
        data={selectedFiles}
        renderItem={({item}) => (
          <FileItem item={item} deleteItem={removeFile} />
        )}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.twoButtonLeft}
          onPress={() => navigation.goBack()}>
          <View style={styles.buttonViewTheme}>
            <MaterialCommunityIcons
              name="cancel"
              size={25}
              color={colors.CreationScreen_Icon}
            />
            <Text style={styles.buttonTextTheme}>Cancel</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.twoButtonRight}>
          <View style={styles.buttonViewTheme}>
            <MaterialCommunityIcons
              name="plus-circle"
              size={25}
              color={colors.CreationScreen_Icon}
            />
            <Text style={styles.buttonTextTheme}>Create</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(20),
    justifyContent: 'center',
  },
  viewScale: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(5),
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
});

export default AnnouncementCreationScreen;
