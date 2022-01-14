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
import {CLUB_DESCRIPTION_STORE} from '../../mobx/CLUB_DESCRIPTION_STORE';
const EventsView = ({
  liveEventArray,
  upcomingEventArray,

  topLayout,
  goToEvent,
}) => {
  const NoEventString =
    CLUB_DESCRIPTION_STORE.getData.name + ' has no upcoming events scheduled';

  const sections =
    upcomingEventArray.length === 0 && liveEventArray.length === 0
      ? []
      : [
          {
            title: 'Live Events',
            isLive: true,
            data: liveEventArray.slice(),
          },
          {
            title: 'Upcoming Events',
            isLive: false,
            data: upcomingEventArray.slice(),
          },
        ];
  console.log('R');

  return (
    <View style={styles.card}>
      <SectionList
        sections={sections}
        ListEmptyComponent={
          <Text style={styles.emptyArray}>{NoEventString}</Text>
        }
        renderItem={({item, section}) => (
          <View
            style={{
              marginHorizontal: scale(HorizontalPadding),
            }}>
            <EventCard
              isLive={section.isLive}
              name={item.Title}
              url={item.poster}
              description={item.Description}
              date={item.startDate}
              eventId={item.EventId}
              goToEvent={goToEvent}
            />
          </View>
        )}
        renderSectionHeader={({section}) => <></>}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={topLayout}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{padding: verticalScale(6)}} />}
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
    fontSize: '16@s',
    padding: '15@vs',
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
