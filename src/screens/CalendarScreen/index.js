import React from 'react';
import {FlatList, View} from 'react-native';
import {Text, Divider} from 'react-native-paper';
import {Agenda} from 'react-native-calendars';
import {
  scale,
  ScaledSheet,
  verticalScale,
  moderateScale,
  ms,
} from 'react-native-size-matters';
import EventCard from './EventCard';
import NoEventCard from './NoEventCard';

const CalendarScreen = () => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const renderEmptyDate = () => {
    return (
      <View style={{marginHorizontal: scale(8)}}>
        <NoEventCard />
      </View>
    );
  };

  const renderEvent = event => {
    return <EventCard props={event} />;
  };

  const renderEventDay = (day, item) => {
    if (day) {
      var curDate = new Date(day.dateString);
      var date = curDate.getDate();
      var month = monthNames[curDate.getMonth()];
      var dayname = dayNames[curDate.getDay()];
      if (!item) {
        return (
          <View style={styles.itemcard}>
            <View style={styles.dateframe}>
              <Text style={{fontSize: scale(16), fontWeight: 'bold'}}>
                {date} {month}
              </Text>
              <Text style={{fontSize: scale(12), marginLeft: scale(8)}}>
                {dayname}
              </Text>
            </View>
            <NoEventCard />
            <Divider
              style={{marginTop: verticalScale(10), height: verticalScale(2)}}
            />
          </View>
        );
      }
      return (
        <View style={styles.itemcard}>
          <View style={styles.dateframe}>
            <Text style={{fontSize: scale(16), fontWeight: 'bold'}}>
              {date} {month}
            </Text>
            <Text style={{fontSize: scale(12), marginLeft: scale(8)}}>
              {dayname}
            </Text>
          </View>
          <FlatList data={[{}, {}, {}, {}, {}, {}]} renderItem={renderEvent} />
          <Divider
            style={{marginTop: verticalScale(10), height: verticalScale(2)}}
          />
        </View>
      );
    }
  };

  return (
    <Agenda
      items={{
        '2021-09-25': [{}],
        '2021-09-29': [{}],
        '2021-09-27': [{}],
        '2021-10-27': [{}],
      }}
      pastScrollRange={6}
      futureScrollRange={6}
      renderDay={renderEventDay}
      renderEmptyData={renderEmptyDate}
      showClosingKnob={true}
    />
  );
};

const styles = ScaledSheet.create({
  itemcard: {
    flexDirection: 'column',
    width: '100%',
    marginVertical: '5@vs',
    paddingHorizontal: '15@s',
  },
  dateframe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CalendarScreen;
