import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import * as colors from '../../utils/colors';
import {scale, ScaledSheet} from 'react-native-size-matters';
import EventsView from './EventsView';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {Divider} from 'react-native-paper';
import Header from './Header';
const data = {
  name: 'SPIDER',
  description: 'The official Research and Development (R&D) Club of NIT Trichy',
  followers: '1008',

  url: 'data:image/jpeg;base64,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',
  events: [
    {
      id: '1',
      date: '27/9/21',
      time: '10:00',
      name: 'Spider Neural Conference',
      description:
        'Neural networks, also known as artificial neural networks (ANNs) or simulated neural networks (SNNs), are a subset of machine learning and are at the heart of deep learning algorithms. ',
      image:
        'https://encrypted-tbn0.gstatic.com/image?q=tbn:ANd9GcRh9vm_YkR0ELyVMfSgzsUKrLGT8KHbPAgx8g&usqp=CAU',
    },
    {
      id: '2',
      date: '28/9/21',
      time: '1:00',
      name: 'Application Softwares',
      description:
        'Application software, or app for short, is software that performs specific tasks for an end-user',
      image:
        'https://encrypted-tbn0.gstatic.com/image?q=tbn:ANd9GcRemhwHNljTo4pxynHrc7O3F-ZA6-eLUqzMLg&usqp=CAU',
    },
    {
      id: '3',
      date: '29/9/21',
      time: '16:00',
      name: 'Community Week',
      description: 'A series of contests open to all years',
      image:
        'https://encrypted-tbn0.gstatic.com/image?q=tbn:ANd9GcS7PLk3ajEGThSFOuDnY8sM_1zz5C6qYBshWA&usqp=CAU',
    },
    {
      id: '4',
      date: '30/9/21',
      time: '15:00',
      name: "Cryptocurrency: Story of Bitcon it's past and future and improvements along with difficulties By: XYS PQST",
      description:
        'Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries',
      image:
        'https://encrypted-tbn0.gstatic.com/image?q=tbn:ANd9GcRSbmMXj50jV_DdSFqjzq7I2zwuOba-Osf9OA&usqp=CAU',
    },
    {
      id: '5',
      date: '31/9/21',
      time: '9:00',
      name: 'Photshoot',
      description: 'A series of contests open to all years',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: '6',
      date: '10/10/21',
      time: '12:00',
      name: 'Blockchain',
      description:
        'Blockchain is a shared, immutable ledger that facilitates the process of recording transactions and tracking assets in a business network.',
      image:
        'https://encrypted-tbn0.gstatic.com/image?q=tbn:ANd9GcSUHFwJlmZ0VZPa0FMhhzZ_3yM_Xlwx0ifsEw&usqp=CAU',
    },
    {
      id: '7',
      date: '12/10/21',
      time: '17:00',
      name: 'Dawn of the Net',
      description:
        'The Internet is a worldwide collection of networks that links millions of businesses, government agencies, educational institutions',
      image:
        'https://encrypted-tbn0.gstatic.com/image?q=tbn:ANd9GcQjyudszQUse-zKQfNaYxP26URn91W6gOQDhg&usqp=CAU',
    },
  ],
};

const renderTopLayout = navigation => (
  <View>
    <Header
      name={data.name}
      followers={data.followers}
      url={data.url}
      description={data.description}
      navigation={navigation}
    />
    <Divider style={styles.divider} />

    <Text style={styles.head}>Upcoming Events</Text>
  </View>
);

const ClubDescriptionScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: colors.GRAY_MEDIUM, flex: 1}}>
      <EventsView
        eventArray={data.events.reverse()}
        topLayout={renderTopLayout(navigation)}
      />
    </SafeAreaView>
  );
};

export default ClubDescriptionScreen;

const styles = ScaledSheet.create({
  head: {
    color: colors.BLACK,
    fontWeight: 'bold',
    fontSize: '14@s',
    paddingTop: '10@vs',

    paddingHorizontal: scale(HorizontalPadding),
  },
  divider: {
    // marginTop: '10@vs',
    height: '2@vs',
    backgroundColor: colors.GRAY_LIGHT,
  },
});
