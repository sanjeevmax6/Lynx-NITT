import React, {useState, useRef, useEffect} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {ScaledSheet, verticalScale} from 'react-native-size-matters';
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
    filteredEventData = [],
    finalEventData = [];
  var adminEventDATA,
    filteredAdminEventData = [],
    finalAdminEventData = [];
  var filteredData = [];
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

    for (var i = 0; i < eventDATA.length; i++) {
      filteredEventData = eventDATA[i].data.filter(function (event) {
        return (
          moment(new Date(event.startDate).toLocaleDateString()).format(
            'DD-MM-YYYY',
          ) == selectedDate
        );
      });

      finalEventData = [...finalEventData, ...filteredEventData];
    }
    // console.log('Final Event Data:' + JSON.stringify(finalEventData));

    for (var i = 0; i < adminEventDATA.length; i++) {
      filteredAdminEventData = adminEventDATA[i].data.filter(function (notice) {
        return (
          moment(new Date(notice.startDate).toLocaleDateString()).format(
            'DD-MM-YYYY',
          ) == selectedDate
        );
      });
      filteredAdminEventData.forEach(element => {
        element['admin_event'] = true;
      });

      finalAdminEventData = [...finalAdminEventData, ...filteredAdminEventData];
    }

    // console.log(
    //   'Final Admin Event Data:' + JSON.stringify(finalAdminEventData),
    // );
    filteredData = [...finalAdminEventData, ...finalEventData];
  }

  const onNoticePress = notice => {
    const startDate = moment(
      new Date(notice.startDate).toLocaleString(),
    ).format('DD-MM-YYYY');
    const endDate = moment(new Date(notice.endDate).toLocaleString()).format(
      'DD-MM-YYYY',
    );
    const noticeDescription = notice.Description;
    const noticeTitle = notice.Title;
    setModalTitle(noticeTitle);
    setModalMessage(noticeDescription);
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
            app: true,
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
            showsVerticalScrollIndicator={false}
            ref={agendaList}
            data={filteredData}
            ListHeaderComponent={<TopLayout />}
            ListEmptyComponent={renderEmptyItem}
            ListFooterComponent={<View style={{height: verticalScale(25)}} />}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={[colors.Accent]}
                onRefresh={onRefresh}
              />
            }
          />
          {USER_STORE.getUserType === USER_TYPE.CLUB ||
          USER_STORE.getUserType === USER_TYPE.ADMIN ? (
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
