import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import {Divider} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';

import EventsCard from '../../components/EventsCard';

const FeedScreen = () => {
  const FlatListItems = [
    {
      key: '1',
      dates: '27/9/21',
      manyTimes: '16:00',
      names: 'Spider Week',
      descriptions: 'A series of contests open to all years',
      images: 'https://picsum.photos/200/300',
      locations: 'Orion',
    },
    {
      key: '1',
      dates: '27/9/21',
      manyTimes: '16:00',
      names: 'Spider Week',
      descriptions: 'A series of contests open to all years',
      images: 'https://picsum.photos/200/300',
      locations: 'Orion',
    },
    {
      key: '1',
      dates: '27/9/21',
      manyTimes: '16:00',
      names: 'Spider Week',
      descriptions: 'A series of contests open to all years',
      images: 'https://picsum.photos/200/300',
      locations: 'Orion',
    },
    {
      key: '1',
      dates: '27/9/21',
      manyTimes: '16:00',
      names: 'Spider Week',
      descriptions: 'A series of contests open to all years',
      images: 'https://picsum.photos/200/300',
      locations: 'Orion',
    },
    {
      key: '1',
      dates: '27/9/21',
      manyTimes: '16:00',
      names: 'Spider Week',
      descriptions: 'A series of contests open to all years',
      images: 'https://picsum.photos/200/300',
      locations: 'Orion',
    },
    {
      key: '1',
      dates: '27/9/21',
      manyTimes: '16:00',
      names: 'Spider Week',
      descriptions: 'A series of contests open to all years',
      images: 'https://picsum.photos/200/300',
      locations: 'Orion',
    },
    {
      key: '1',
      dates: '27/9/21',
      manyTimes: '16:00',
      names: 'Spider Week',
      descriptions: 'A series of contests open to all years',
      images: 'https://picsum.photos/200/300',
      locations: 'Orion',
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={FlatListItems}
        renderItem={({item}) => (
          <View>
            <EventsCard
              date={item.dates}
              time={item.manyTimes}
              name={item.names}
              desc={item.descriptions}
              eventImage={item.images}
              location={item.locations}
            />
            <Divider
              style={{marginTop: verticalScale(10), height: verticalScale(2)}}
            />
          </View>
        )}
        numColumns={1}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
