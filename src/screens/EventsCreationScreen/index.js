import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  Alert,
  BackHandler,
  ScrollView,
  Text,
  Dimensions,
} from 'react-native';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import {useFocusEffect} from '@react-navigation/native';
import EventCreationInputs from './EventsCreationInput';
import EventsCreationTime from './EventsCreationTime';
import EventsCreationScreenHeader from './EventsCreationScreenHeader';
import EventsCreationImages from './EventsCreationImages';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import EventsCreationTag from './EventsCreationTags';
import {TabVisibility} from '../../redux/reducers/bottomNav';
import {useDispatch} from 'react-redux';

const WIDTH = Dimensions.get('window').width;

const EventCreationScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setTimePicker] = useState(false);
  const [allDaySwitch, setAllDaySwitch] = useState(false);
  const [links, setLinks] = useState([]);
  const [profilePicUri, setProfilePicUri] = useState(['']);
  const [isProfilePicSelected, setProfilePicSelected] = useState(false);
  const [tags, setTags] = useState([]);

  const scrollview = useRef(null);
  const [pageTitle, setPageTitle] = useState('About the Event');
  // const [subtitle, setSubTitle] = useState('');
  const [page, setPage] = useState(0);

  const changeText = (title, page) => {
    setPageTitle(title);
    // setSubTitle(stitle);
    setPage(page);
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (page == 0) {
          Alert.alert('', 'Are you sure you want to discard this event?', [
            {
              text: 'DISCARD',
              onPress: () => {
                navigation.goBack();
                toggleTab(true);
              },
              style: 'cancel',
            },
            {text: 'KEEP EDITING', onPress: () => console.log('OK Pressed')},
          ]);
        }

        setPage(page - 1);
        if (scrollview.current !== null) {
          scrollview.current.scrollTo({
            x: WIDTH * (page - 1),
            animated: true,
          });
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }),
  );

  const dispatch = useDispatch();

  function toggleTab(tabShow) {
    dispatch(TabVisibility(tabShow));
  }

  useEffect(() => {
    toggleTab(false);

    return () => {};
  }, []);

  const inputStates = {
    title,
    setTitle,
    desc,
    setDesc,
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

  const imageStates = {
    profilePicUri,
    setProfilePicUri,
    isProfilePicSelected,
    setProfilePicSelected,
  };

  const tagStates = {
    tags,
    setTags,
    link,
    setLink,
    links,
    setLinks,
  };

  return (
    <SafeAreaView style={styles.container}>
      <EventsCreationScreenHeader navigation={navigation} />
      <Text style={styles.title}>{pageTitle}</Text>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        ref={scrollview}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        style={{width: WIDTH, marginTop: verticalScale(5)}}
        scrollEnabled={false}>
        <EventCreationInputs
          inputStates={inputStates}
          scrollViewRef={scrollview}
          callback={changeText}
        />
        <EventsCreationTime
          timeStates={timeStates}
          dateStates={dateStates}
          scrollViewRef={scrollview}
          callback={changeText}
        />
        <EventsCreationImages
          imageStates={imageStates}
          scrollViewRef={scrollview}
          callback={changeText}
        />
        <EventsCreationTag
          tagStates={tagStates}
          scrollViewRef={scrollview}
          callback={changeText}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  header: {
    fontSize: '18@s',
    color: color.FontColor,
    fontWeight: 'bold',
    marginTop: '40@vs',
  },
  title: {
    fontSize: '18@s',
    color: color.FontColor,
    fontWeight: '500',
    marginTop: '10@vs',
  },
  subtitle: {
    fontSize: '12@s',
    color: '#555555',
    marginTop: '5@vs',
    textAlign: 'center',
  },
  input: {
    width: '100%',
  },
});

export default EventCreationScreen;
