import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  Alert,
  BackHandler,
  ScrollView,
  Text,
  imageURI,
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
import EventCreationTitle from './EventsCreationTitle';
import EventsCreationTime from './EventsCreationTime';
import EventsCreationScreenHeader from './EventsCreationScreenHeader';
import EventsCreationImages from './EventsCreationImages';
import EventCreationDesc from './EventsCreationDesc';
import EventsCreationTag from './EventsCreationTags';
import {EventCreationAPI} from './EventCreationAPI';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {eventCreation_eventTitle} from '../../utils/stringConstants';
import {USER_STORE} from '../../mobx/USER_STORE';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import { EVENT_CREATION_STORE } from '../../mobx/EVENT_CREATION_STORE';

const WIDTH = Dimensions.get('window').width;

const EventCreationScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setTimePicker] = useState(false);
  const [allDaySwitch, setAllDaySwitch] = useState(false);
  const [links, setLinks] = useState([]);
  const [profilePicUri, setProfilePicUri] = useState(['']);
  const [isProfilePicSelected, setProfilePicSelected] = useState(false);
  const [tags, setTags] = useState([]);

  const scrollview = useRef(null);
  const descInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState();

  const [pageTitle, setPageTitle] = useState(eventCreation_eventTitle);
  // const [subtitle, setSubTitle] = useState('');
  const [page, setPage] = useState(0);

  const changeText = (title, page) => {
    setPageTitle(title);
    // setSubTitle(stitle);
    setPage(page);
  };

  const handleFocus = x => {
    if (Math.floor(x) == Math.floor(WIDTH)) descInputRef.current.focus();
  };

  const handleAPICALL = () => {
    EVENT_CREATION_STORE.setErrorText(null);
    let description = desc;
    let eventsPic = profilePicUri;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('startDate', startDate.toString());
    formData.append('endDate', endDate.toString());
    for(i=0;i<tags.length;i++){
      formData.append('tags['+i+']', tags[i]);
    }
    for(i=0;i<links.length;i++){
      formData.append('links['+i+']', links[i]);
    }
    formData.append('eventsPic', {
      uri: imageURI,
      type: "image/jpeg",
      name: "photo.jpg"
   })
    EventCreationAPI(formData);
    console.log(formData);
  };

  const userToken = USER_STORE.getUserToken;

  //Handling hardwareBackPress
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

  function toggleTab(tabShow) {
    BOTTOM_NAV_STORE.setTabVisibility(tabShow);
  }

  useEffect(() => {
    toggleTab(false);

    return () => {};
  }, []);

  const titleStates = {
    title,
    setTitle,
  };

  const descStates = {
    desc,
    setDesc,
  };

  const dateStates = {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
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
    errorText,
    setErrorText,
  };

  return (
    <SafeAreaView style={styles.container}>
      <EventsCreationScreenHeader navigation={navigation} />
      <Text style={styles.title}>{pageTitle}</Text>
      <ScrollView
        keyboardShouldPersistTaps="always"
        ref={scrollview}
        horizontal={true}
        onScroll={({nativeEvent}) => {
          handleFocus(nativeEvent.contentOffset.x);
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        style={{width: WIDTH, marginTop: verticalScale(5)}}
        scrollEnabled={false}>
        <EventCreationTitle
          titleStates={titleStates}
          scrollViewRef={scrollview}
          callback={changeText}
        />
        <EventCreationDesc
          descStates={descStates}
          scrollViewRef={scrollview}
          descInputRef={descInputRef}
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
          handleAPICALL={handleAPICALL}
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
    marginHorizontal: scale(HorizontalPadding),
  },
  header: {
    fontSize: '18@s',
    color: color.FontColor,
    fontWeight: 'bold',
    marginTop: '40@vs',
  },
  title: {
    fontSize: '16@s',
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
