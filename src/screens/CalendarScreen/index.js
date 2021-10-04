import React, {useState, useRef} from 'react';
import {FlatList, View} from 'react-native';
import {FAB} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import EventCard from './EventCard';
import NoEventCard from './NoEventCard';
import TopLayout from './TopLayout';

const CalendarScreen = () => {
  const [date, setDate] = useState();
  const agendaList = useRef();
  const createEvent = () => {};

  const Item = () => <EventCard />;

  const renderEmptyItem = () => <NoEventCard />;

  const renderTopLayout = () => (
    <TopLayout
      updateDate={date => {
        // setDate(date);
      }}
    />
  );

  return (
    <View style={styles.calContainer}>
      <FlatList
        renderItem={Item}
        ref={agendaList}
        data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
        style={styles.flatlist}
        ListHeaderComponent={renderTopLayout}
        ListEmptyComponent={renderEmptyItem}
      />
      <FAB style={styles.fab} small={false} icon="plus" onPress={createEvent} />
    </View>
  );
};

const styles = ScaledSheet.create({
  calContainer: {flex: 1},
  flatlist: {
    marginBottom: '10@vs',
  },
  fab: {
    position: 'absolute',
    marginVertical: '16@vs',
    right: '16@s',
    bottom: 0,
  },
});

export default CalendarScreen;
