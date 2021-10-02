import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Animated,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';

import EventsCard from '../../components/EventsCard';
import * as colors from '../../utils/colors';
import {HorizontalPadding, HeaderHeight} from '../../utils/UI_CONSTANTS';

const FeedScreen = () => {
  const DATA = [
    {
      key: '1',
      dates: '27/9/21',
      manyTimes: '10:00',
      names: 'Spider Neural Conference',
      descriptions:
        'Neural networks, also known as artificial neural networks (ANNs) or simulated neural networks (SNNs), are a subset of machine learning and are at the heart of deep learning algorithms. ',
      images:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh9vm_YkR0ELyVMfSgzsUKrLGT8KHbPAgx8g&usqp=CAU',
      organizer: 'SPIDER',
    },
    {
      key: '2',
      dates: '28/9/21',
      manyTimes: '1:00',
      names: 'Application Softwares',
      descriptions:
        'Application software, or app for short, is software that performs specific tasks for an end-user',
      images:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemhwHNljTo4pxynHrc7O3F-ZA6-eLUqzMLg&usqp=CAU',
      organizer: 'SPIDER',
    },
    {
      key: '3',
      dates: '29/9/21',
      manyTimes: '16:00',
      names: 'Community Week',
      descriptions: 'A series of contests open to all years',
      images:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7PLk3ajEGThSFOuDnY8sM_1zz5C6qYBshWA&usqp=CAU',
      organizer: 'SPIDER',
    },
    {
      key: '4',
      dates: '30/9/21',
      manyTimes: '15:00',
      names:
        "Cryptocurrency: Story of Bitcon it's past and future and improvements along with difficulties By: XYS PQST",
      descriptions:
        'Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries',
      images:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSbmMXj50jV_DdSFqjzq7I2zwuOba-Osf9OA&usqp=CAU',
      organizer: 'SPIDER',
    },
    {
      key: '5',
      dates: '31/9/21',
      manyTimes: '9:00',
      names: 'Photshoot',
      descriptions: 'A series of contests open to all years',
      images: 'https://picsum.photos/200/300',
      organizer: 'SPIDER',
    },
    {
      key: '6',
      dates: '10/10/21',
      manyTimes: '12:00',
      names: 'Blockchain',
      descriptions:
        'Blockchain is a shared, immutable ledger that facilitates the process of recording transactions and tracking assets in a business network.',
      images:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUHFwJlmZ0VZPa0FMhhzZ_3yM_Xlwx0ifsEw&usqp=CAU',
      organizer: 'SPIDER',
    },
    {
      key: '7',
      dates: '12/10/21',
      manyTimes: '17:00',
      names: 'Dawn of the Net',
      descriptions:
        'The Internet is a worldwide collection of networks that links millions of businesses, government agencies, educational institutions',
      images:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjyudszQUse-zKQfNaYxP26URn91W6gOQDhg&usqp=CAU',
      organizer: 'SPIDER',
    },
  ];
  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, verticalScale(HeaderHeight));

  const interpolateY = diffClamp.interpolate({
    inputRange: [0, verticalScale(HeaderHeight)],
    outputRange: [0, verticalScale(-1 * HeaderHeight)],
  });
  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          elevation: 1,
          zIndex: 1,
          transform: [
            {
              translateY: interpolateY,
            },
          ],
        }}>
        <View
          style={{
            left: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            right: 0,
            height: verticalScale(HeaderHeight),
            backgroundColor: colors.EventScreen_headerBackground,
            // borderBottomLeftRadius: scale(10),
            // borderBottomRightRadius: scale(10),
            elevation: 5,
            zIndex: 100, //for IOS
            alignContent: 'center',
            justifyContent: 'center',
            shadowColor: colors.GRAY_DARK,
          }}>
          <Text
            style={{
              fontSize: verticalScale(18),
              paddingLeft: scale(HorizontalPadding),
              color: 'white',
              //fontWeight: 'bold',
              color: colors.EventScreen_headerText,
            }}>
            EVENTS
          </Text>
        </View>
      </Animated.View>

      <FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{height: verticalScale(HeaderHeight)}}></View>
        }
        onScroll={e => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
        bounces={false}
        bouncesZoom={false}
        renderItem={({item}) => (
          <View>
            <EventsCard
              date={item.dates}
              time={item.manyTimes}
              name={item.names}
              desc={item.descriptions}
              eventImage={item.images}
              organizer={item.organizer}
            />
            <Divider style={{height: verticalScale(2)}} />
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
