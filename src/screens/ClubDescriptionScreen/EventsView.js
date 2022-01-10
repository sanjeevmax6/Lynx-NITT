import React from 'react';
import {View, Text, SectionList, Dimensions} from 'react-native';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import EventCard from './UpcomingEventCard';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {
  emptyLiveEventArray,
  emptyUpcomingEventArray,
  emptyPastEventArray,
} from '../../utils/stringConstants';
const EventsView = ({
  liveEventArray,
  upcomingEventArray,
  pastEventArray,
  topLayout,
  goToEvent,
}) => {
  return (
    <View style={styles.card}>
      <SectionList
        sections={[
          {
            title: 'Live Events',
            data:
              liveEventArray.length != 0
                ? liveEventArray.slice()
                : [emptyLiveEventArray],
          },
          {
            title: 'Upcoming Events',
            data:
              upcomingEventArray.length != 0
                ? upcomingEventArray.slice()
                : [emptyUpcomingEventArray],
          },
          {
            title: 'Past Events',
            data:
              pastEventArray.length != 0
                ? pastEventArray.slice()
                : [emptyPastEventArray],
          },
        ]}
        renderItem={({item}) =>
          item == emptyLiveEventArray ||
          item == emptyUpcomingEventArray ||
          item == emptyPastEventArray ? (
            <Text style={styles.emptyArray}>{item}</Text>
          ) : (
            <View
              style={{
                marginHorizontal: scale(HorizontalPadding),
              }}>
              <EventCard
                name={item.Title}
                url={item.poster}
                description={item.Description}
                date={item.startDate}
                eventId={item.EventId}
                goToEvent={goToEvent}
              />
            </View>
          )
        }
        renderSectionHeader={({section}) => (
          <Text style={styles.head}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={topLayout}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{padding: verticalScale(4)}} />}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        bouncesZoom={false}
      />
    </View>
  );
};

export default EventsView;

const styles = ScaledSheet.create({
  card: {
    backgroundColor: colors.WHITE,
    //paddingBottom: '6@vs',
  },
  emptyArray: {
    color: colors.BLACK,
    fontWeight: 'bold',
    fontSize: '18@s',
    padding: '10@vs',
    textAlign: 'center',
    backgroundColor: colors.WHITE,
    paddingHorizontal: scale(HorizontalPadding),
  },
  head: {
    color: colors.BLACK,
    fontWeight: 'bold',
    fontSize: '18@s',
    padding: '10@vs',
    paddingHorizontal: scale(HorizontalPadding),
  },
});
