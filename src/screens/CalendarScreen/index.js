import React, {useState, useRef, useEffect} from 'react';
import {FlatList, TouchableOpacity, View, SafeAreaView} from 'react-native';
import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import EventCard from './EventCard';
import NoEventCard from './NoEventCard';
import TopLayout from './TopLayout';
import * as colors from '../../utils/colors';
import FabGroup from './FabGroup';
import LoaderPage from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';
import {eventList} from './eventList';
import {CALENDAR_STORE} from '../../mobx/CALENDAR_STORE';
import {observer} from 'mobx-react';
import {ACCENT_LOTTIE} from '../../utils/LOADING_TYPES';

const CalendarScreen = observer(({navigation}) => {
  const agendaList = useRef();

  var DATA, filteredData;
  var selectedDate = CALENDAR_STORE.getSelectedDate;
  //console.log(selectedDate);

  //API Call for getting event list
  useEffect(() => {
    eventList();
  }, []);

  //console.log(CALENDAR_STORE.getSuccess);
  if (CALENDAR_STORE.getSuccess) {
    DATA = CALENDAR_STORE.getData;
    //console.log('Data from Calendar index.js:' + JSON.stringify(DATA));
    filteredData = DATA[selectedDate];
    //console.log(filteredData);
  }

  const Item = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        //navigation.push('EventDescriptionScreen', {data: item});
        //console.log(item);
      }}>
      <EventCard data={item} />
    </TouchableOpacity>
  );

  const renderEmptyItem = () => <NoEventCard />;

  return (
    <SafeAreaView style={{flex: 1}}>
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
          />
          {/* <FAB style={styles.fab} small={false} icon="plus" onPress={createEvent} /> */}
          <FabGroup navigation={navigation} />
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
