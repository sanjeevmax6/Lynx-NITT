import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, FlatList, Text} from 'react-native';
import {Divider, Button} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import DocumentPicker from 'react-native-document-picker';
import FileItem from './FileItem';
import EventCreationInputs from './EventsCreationInput';
import EventsCreationTime from './EventsCreationTime';
import EventsCreationScreenHeader from './EventsCreationScreenHeader';
import EventsCreationHeader from './EventsCreationHeader';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const EventCreationScreen = ({navigation}) => {
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

  const maxTitleLength = 150;
  const maxDescLength = 300;

  const [titleLength, setTitleLength] = useState(maxTitleLength);
  const [descLength, setDescLength] = useState(maxDescLength);

  const inputStates = {
    title,
    setTitle,
    desc,
    setDesc,
    link,
    setLink,
    links,
    setLinks,
    titleLength,
    setTitleLength,
    descLength,
    setDescLength,
    maxDescLength,
    maxTitleLength,
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
      <EventsCreationScreenHeader
        navigation={navigation}
        isValid={titleLength >= 0 && descLength >= 0}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        ListFooterComponentStyle={{flex: 1, justifyContent: 'flex-end'}}
        ListFooterComponent={<View style={{height: verticalScale(6)}} />}
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
    backgroundColor: color.Secondary,
  },
  viewScale: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(5),
  },

  divider: {
    height: verticalScale(2),
    backgroundColor: color.GRAY_MEDIUM,
  },
  dividerEnd: {
    height: verticalScale(2),
    backgroundColor: color.GRAY_MEDIUM,
  },
  uploadButton: {
    backgroundColor: color.Tertiary,
    borderRadius: moderateScale(6),
    marginVertical: verticalScale(9),
    marginHorizontal: HorizontalPadding,
  },
});

export default EventCreationScreen;
