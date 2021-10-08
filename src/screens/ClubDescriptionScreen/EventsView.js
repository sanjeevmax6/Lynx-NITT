import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import RecentEventCard from './UpcomingEventCard';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
const EventsView = ({eventArray, topLayout}) => {
  return (
    <View style={styles.card}>
      <View>
        <FlatList
          data={eventArray}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          ListFooterComponent={<View style={{padding: verticalScale(4)}} />}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          bouncesZoom={false}
          ListHeaderComponent={topLayout}
          renderItem={({item}) => (
            <View
              style={{
                marginHorizontal: scale(HorizontalPadding),
              }}>
              <RecentEventCard
                name={item.name}
                url={item.image}
                time={item.time}
                date={item.date}
              />
            </View>
          )}
          numColumns={1}
          //keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
};

export default EventsView;

const styles = ScaledSheet.create({
  card: {
    backgroundColor: colors.WHITE,
    //paddingBottom: '6@vs',
  },
});
