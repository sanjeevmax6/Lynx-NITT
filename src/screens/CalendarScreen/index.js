import React, {useState, useRef, useEffect} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import EventCard from './EventCard';
import NoEventCard from './NoEventCard';
import TopLayout from './TopLayout';
import * as colors from '../../utils/colors';
import FabGroup from './FabGroup';
import LoaderPage from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';
import {eventList} from './eventListAPI';
import {CALENDAR_STORE} from '../../mobx/CALENDAR_STORE';
import {observer} from 'mobx-react';
import {ACCENT_LOTTIE} from '../../utils/LOADING_TYPES';
import moment from 'moment';
import AdminNoticeCard from './AdminNoticeCard';
import CustomAlert from '../../components/customAlert';
import {USER_STORE} from '../../mobx/USER_STORE';
import * as USER_TYPE from '../../utils/USER_TYPE';
import {useIsFocused} from '@react-navigation/native';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';

const CalendarScreen = observer(({navigation}) => {
  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(true);
  }

  const agendaList = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalStartDate, setModalStartDate] = useState('');
  const [modalEndDate, setModalEndDate] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  var eventDATA,
    adminEventDATA,
    filteredEventData,
    filteredAdminEventData,
    filteredData = [];
  var selectedDate = CALENDAR_STORE.getSelectedDate;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    CALENDAR_STORE.setError(false);
    CALENDAR_STORE.setErrorText('');
    CALENDAR_STORE.setLoading(false);
    CALENDAR_STORE.setSuccess(false);
    CALENDAR_STORE.setSelectedDate(
      moment(new Date().toLocaleString()).format('DD-MM-YYYY'),
    );
    console.log(new Date().toLocaleString());
    eventList();
    setRefreshing(false);
  }, []);

  //API Call for getting event list
  useEffect(() => {
    eventList();
  }, []);

  if (CALENDAR_STORE.getSuccess) {
    eventDATA = CALENDAR_STORE.getEventData.events;
    adminEventDATA = CALENDAR_STORE.getAdminEventData.events;

    filteredEventData = eventDATA.filter(function (event) {
      return (
        moment(new Date(event.data[0].startDate).toLocaleDateString()).format(
          'DD-MM-YYYY',
        ) == selectedDate
      );
    });
    filteredAdminEventData = adminEventDATA.filter(function (event) {
      return (
        moment(new Date(event.data[0].startDate).toLocaleDateString()).format(
          'DD-MM-YYYY',
        ) == selectedDate
      );
    });

    if (filteredEventData.length == 0) {
      filteredEventData = [];
    } else {
      filteredEventData = filteredEventData[0].data;
    }
    if (filteredAdminEventData.length == 0) {
      filteredAdminEventData = [];
    } else {
      filteredAdminEventData[0].data.forEach(element => {
        element['admin_event'] = true;
      });
      filteredAdminEventData = filteredAdminEventData[0].data;
    }

    filteredData = [...filteredAdminEventData, ...filteredEventData];
  }

  const onNoticePress = notice => {
    const startDate = moment(
      new Date(notice.startDate).toLocaleString(),
    ).format('hh:mm A | DD-MM-YYYY');
    const endDate = moment(new Date(notice.endDate).toLocaleString()).format(
      'hh:mm A | DD-MM-YYYY',
    );
    const noticeMessage = notice.Description;
    const noticeTitle = notice.Title;
    setModalTitle(noticeTitle);
    setModalMessage(noticeMessage);
    setModalStartDate(startDate);
    setModalEndDate(endDate);
    setModalVisible(true);
  };

  const Item = ({item}) =>
    item.admin_event ? (
      <TouchableOpacity onPress={() => onNoticePress(item)} activeOpacity={0.5}>
        <AdminNoticeCard data={item} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          navigation.push('EventDescriptionScreen', {
            eventId: item.EventId,
          });
        }}>
        <EventCard data={item} />
      </TouchableOpacity>
    );

  const renderEmptyItem = () => <NoEventCard />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomAlert
        title={modalTitle}
        message={modalMessage}
        startDate={modalStartDate}
        endDate={modalEndDate}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        buttons={[
          {
            text: 'CLOSE',
          },
        ]}
      />
      {CALENDAR_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
      ) : CALENDAR_STORE.getError ? (
        <ErrorScreen
          errorMessage={CALENDAR_STORE.getErrorText}
          fn={() => {
            CALENDAR_STORE.setErrorText('');
            CALENDAR_STORE.setError(false);
            eventList();
          }}
        />
      ) : (
        <View style={styles.calContainer}>
          <FlatList
            renderItem={Item}
            ref={agendaList}
            data={filteredData}
            ListHeaderComponent={<TopLayout />}
            ListEmptyComponent={renderEmptyItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={[colors.Accent]}
                onRefresh={onRefresh}
              />
            }
          />
          {USER_STORE.getUserType == USER_TYPE.CLUB ||
          USER_STORE.getUserType == USER_TYPE.ADMIN ? (
            <FabGroup navigation={navigation} />
          ) : null}
        </View>
      )}
    </SafeAreaView>
  );
});

const styles = ScaledSheet.create({
  calContainer: {flex: 1, backgroundColor: colors.CalBack},
  fab: {
    position: 'absolute',
    marginVertical: '16@vs',
    right: '16@s',
    bottom: 0,
  },
});

export default CalendarScreen;
