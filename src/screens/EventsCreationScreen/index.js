import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import FileItem from './FileItem';
import LinkItem from './LinkItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DATE_FORMAT = 'MMMM DD, YYYY';
const TIME_FORMAT = 'h:mm A';

const EventCreationScreen = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setDatePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showTimePicker, setTimePicker] = useState(false);
  const [startPicked, setStartPicked] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [allDaySwitch, setAllDaySwitch] = useState(false);
  const [links, setLinks] = useState([]);

  const onChangeDate = (event, newDate) => {
    const currentDate = newDate || date;
    setDate(currentDate);
    setDatePicker(false);
    //console.log('DATE', event);
  };

  const onChangeTime = (event, newTime) => {
    if (startPicked == 1) {
      setStartTime(newTime || startTime);
    } else if (startPicked == 2) {
      setEndTime(newTime || endTime);
    }
    setTimePicker(false);
    setStartPicked(0);
    //console.log('TIME', event);
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

  const removeLink = link => {
    setLinks(prevList => {
      return prevList.filter(item => item != link);
    });
  };

  const toggleSwitch = () => {
    setAllDaySwitch(prevVal => {
      return !prevVal;
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
                label="Event Title"
                placeholder="Event Title (max 300)"
                value={title}
                onChangeText={nTitle => setTitle(nTitle)}
              />
            </View>
            <View style={styles.viewScale}>
              <TextInput
                label="Event Description"
                placeholder="Event Description"
                value={desc}
                onChangeText={nDesc => setDesc(nDesc)}
                multiline={true}
              />
            </View>
            <View style={styles.viewScale}>
              <TextInput
                label="Event Links"
                placeholder="Event Links"
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

            {/* Pick the date */}
            <TouchableOpacity
              style={styles.viewScale}
              onPress={() => setDatePicker(true)}>
              <View style={styles.buttonViewTheme}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={25}
                  color={colors.CreationScreen_Icon}
                />
                <Text style={styles.buttonTextTheme}>
                  Event on: {moment(date).format(DATE_FORMAT)}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Switch */}
            <View style={styles.switchView}>
              <Text style={styles.buttonTextTheme}>All day event? </Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={allDaySwitch ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={allDaySwitch}
              />
            </View>

            {/* Pick the start time and end time */}
            {!allDaySwitch && (
              <View style={styles.twoButtonContainer}>
                <TouchableOpacity
                  style={styles.twoButtonLeft}
                  onPress={() => {
                    setStartPicked(1);
                    setTimePicker(true);
                  }}>
                  <View style={styles.buttonViewTheme}>
                    <MaterialCommunityIcons
                      name="clock"
                      size={25}
                      color={colors.CreationScreen_Icon}
                    />
                    <Text style={styles.buttonTextTheme}>
                      Start: {moment(startTime).format(TIME_FORMAT)}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.twoButtonRight}
                  onPress={() => {
                    setStartPicked(2);
                    setTimePicker(true);
                  }}>
                  <View style={styles.buttonViewTheme}>
                    <MaterialCommunityIcons
                      name="clock"
                      size={25}
                      color={colors.CreationScreen_Icon}
                    />
                    <Text style={styles.buttonTextTheme}>
                      End: {moment(endTime).format(TIME_FORMAT)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/* Upload media button */}
            <TouchableOpacity
              style={styles.viewScale}
              onPress={() => selectFiles()}>
              <View style={styles.buttonViewTheme}>
                <MaterialCommunityIcons
                  name="upload"
                  size={25}
                  color={colors.CreationScreen_Icon}
                />
                <Text style={styles.buttonTextTheme}>Upload media</Text>
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
        <TouchableOpacity style={styles.twoButtonLeft}>
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

      {/* DatePicker */}
      {showDatePicker && (
        <DateTimePicker
          testID="DatePicker"
          value={date}
          mode={'date'}
          is24Hour={false}
          display="default"
          onChange={onChangeDate}
        />
      )}

      {/* TimePicker */}
      {showTimePicker && (
        <DateTimePicker
          testID="TimePicker"
          value={startPicked == 1 ? startTime : endTime}
          mode={'time'}
          is24Hour={false}
          display="default"
          onChange={onChangeTime}
        />
      )}
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
  switchView: {
    fontSize: 16,
    padding: moderateScale(8),
    backgroundColor: colors.CreationScreen_SwitchViewBg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(20),
    marginVertical: verticalScale(5),
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

export default EventCreationScreen;
