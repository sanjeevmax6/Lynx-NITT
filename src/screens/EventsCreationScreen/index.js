import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Divider, Button} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import DocumentPicker from 'react-native-document-picker';
import FileItem from './FileItem';
import EventCreationInputs from './EventsCreationInput';
import EventsCreationTime from './EventsCreationTime';
import EventsCreationFooter from './EventsCreationFooter';
import EventsCreationHeader from './EventsCreationHeader';

const EventCreationScreen = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setTimePicker] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [allDaySwitch, setAllDaySwitch] = useState(false);
  const [links, setLinks] = useState([]);
  const [profilePicUri, setProfilePicUri] = useState('');
  const [isProfilePicSelected, setProfilePicSelected] = useState(false);

  const inputStates = {
    title,
    setTitle,
    desc,
    setDesc,
    link,
    setLink,
    links,
    setLinks,
  };

  const dateStates = {
    date,
    setDate,
    showDatePicker,
    setDatePicker,
  };

  const timeStates = {
    time,
    setTime,
    showTimePicker,
    setTimePicker,
    allDaySwitch,
    setAllDaySwitch,
  };

  const headerStates = {
    profilePicUri,
    setProfilePicUri,
    isProfilePicSelected,
    setProfilePicSelected,
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <EventsCreationHeader headerStates={headerStates} />
            <Divider style={styles.divider} />
            <EventCreationInputs inputStates={inputStates} />
            <Divider style={styles.divider} />
            <EventsCreationTime
              timeStates={timeStates}
              dateStates={dateStates}
            />
            <Divider style={styles.divider} />
            <View style={styles.uploadButton}>
              <Button
                icon="upload"
                mode="text"
                onPress={() => selectFiles()}
                color={color.WHITE}>
                Upload Media
              </Button>
            </View>
          </>
        }
        ListFooterComponent={
          <>
            <Divider style={styles.dividerEnd} />
          </>
        }
        data={selectedFiles}
        renderItem={({item}) => (
          <FileItem item={item} deleteItem={removeFile} />
        )}
      />
      <EventsCreationFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  viewScale: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(5),
  },
  buttonViewTheme: {
    fontSize: 16,
    padding: moderateScale(8),
    backgroundColor: color.Secondary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextTheme: {
    fontSize: 16,
    marginLeft: scale(10),
    color: color.WHITE,
  },
  divider: {
    height: verticalScale(2),
    backgroundColor: color.GRAY_MEDIUM,
  },
  dividerEnd: {
    height: verticalScale(2),
    backgroundColor: color.GRAY_MEDIUM,
    marginVertical: verticalScale(10),
  },
  uploadButton: {
    backgroundColor: color.GRAY_DARK,
    borderRadius: moderateScale(5),
    margin: moderateScale(10),
  },
});

export default EventCreationScreen;
