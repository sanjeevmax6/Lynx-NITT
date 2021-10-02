import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import RecentEventCard from './RecentEventCard';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
const EventsView = ({eventArray}) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          marginHorizontal: scale(HorizontalPadding),
          paddingTop: verticalScale(10),
        }}>
        <Text style={styles.head}>YOUR EVENTS</Text>
        <FlatList
          data={eventArray}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          bouncesZoom={false}
          renderItem={({item}) => (
            <View>
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
    backgroundColor: 'white',
    marginTop: '6@vs',
    paddingBottom: '6@vs',
  },
  head: {
    color: colors.BLACK,
    fontWeight: 'bold',
    fontSize: '14@s',
    paddingBottom: '6@vs',
  },
});
