import React, {useState, useRef} from 'react';
import {FlatList, TouchableOpacity, View, SafeAreaView} from 'react-native';
import {FAB} from 'react-native-paper';
import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import EventCard from './EventCard';
import NoEventCard from './NoEventCard';
import TopLayout from './TopLayout';
import * as colors from '../../utils/colors';
import FabGroup from './FabGroup';

const CalendarScreen = ({navigation}) => {
  const [date, setDate] = useState();
  const agendaList = useRef();

  const DATA = [
    {
      key: '1',
      dates: '27/9/21',
      time: '10:00',
      title: 'Spider Neural Conference',
      description:
        'Neural networks, also known as artificial neural networks (ANNs) or simulated neural networks (SNNs), are a subset of machine learning and are at the heart of deep learning algorithms. Their name and structure are inspired by the human brain, mimicking the way that biological neurons signal to one another.',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh9vm_YkR0ELyVMfSgzsUKrLGT8KHbPAgx8g&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1kuAJ0pjJmUAqxmIxnBen6DCu-xmPBTfglw&usqp=CAU',
      ],
      organizer: {
        name: 'Spider R&D',
        imgURL:
          'https://media-exp1.licdn.com/dms/image/C510BAQF2qwmDE5B4UA/company-logo_200_200/0/1544248160311?e=2159024400&v=beta&t=g3fZgTrVPgM5pF_BYGaZW2InTI26WLfsFv4UOe0afew',
        isFollowing: true,
      },
      tags: [
        'Artificial Intelligence',
        'Machine Learning',
        'AI',
        'Neural Network',
        'Spider',
        'DNN',
      ],
      links: [
        'https://www.ibm.com/in-en/cloud/learn/neural-networks',
        'https://en.wikipedia.org/wiki/Artificial_neural_network',
      ],
    },
    {
      key: '2',
      dates: '28/9/21',
      time: '1:00',
      title: 'Application Softwares',
      description:
        'An application program is a computer program designed to carry out a specific task other than one relating to the operation of the computer itself, typically to be used by end-users. Word processors, media players, and accounting software are examples. The collective noun refers to all applications collectively.',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemhwHNljTo4pxynHrc7O3F-ZA6-eLUqzMLg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR97LrwgpZAB1Nmd_BBQfqAwAk8Xb3f5f-_pw&usqp=CAU',
      ],
      tags: ['Computer Science', 'Machine Learning', 'Neural Network'],
      organizer: {
        name: 'Spider R&D',
        imgURL: 'https://delta.nitt.edu/images/deltaLogoGreen.png',
        isFollowing: true,
      },
      links: [
        'https://spider.nitt.edu/',
        'https://en.wikipedia.org/wiki/Application_software',
        'https://www.quickbase.com/articles/application-software-basics',
      ],
    },
    {
      key: '3',
      dates: '29/9/21',
      time: '16:00',
      title: 'Community Week',
      description: 'A series of contests open to all years',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7PLk3ajEGThSFOuDnY8sM_1zz5C6qYBshWA&usqp=CAU',
      ],
      tags: ['Computer Science', 'Machine Learning', 'Neural Network'],
      organizer: {
        name: 'Spider R&D',
        imgURL: 'https://nitt.wiki/images/4/45/Tc_logo.png',
        isFollowing: true,
      },
      links: [
        'https://spider.nitt.edu/',
        'https://spider.nitt.edu/projects/',
        'https://spider.nitt.edu/members/',
      ],
    },
    {
      key: '4',
      dates: '30/9/21',
      time: '15:00',
      title: 'Cryptocurrency: Story of Bitcon and Journey to the future!',
      description:
        'A cryptocurrency, crypto-currency, or crypto is a collection of binary data which is designed to work as a medium of exchange wherein individual coin ownership records are stored in a ledger which is a computerized database using strong cryptography to secure transaction records, to control the creation of additional coins, and to verify the transfer of coin ownership. Some crypto schemes use validators to maintain the cryptocurrency. In a proof-of-stake model, owners put up their tokens as collateral. In return, they get authority over the token in proportion to the amount they stake. Generally, these token stakers get additional ownership in the token over time via network fees, newly minted tokens or other such reward mechanisms. Cryptocurrency does not exist in physical form (like paper money) and is typically not issued by a central authority. Cryptocurrencies typically use decentralized control as opposed to a central bank digital currency (CBDC). When a cryptocurrency is minted or created prior to issuance or issued by a single issuer, it is generally considered centralized. When implemented with decentralized control, each cryptocurrency works through distributed ledger technology, typically a blockchain, that serves as a public financial transaction database. Bitcoin, first released as open-source software in 2009, is the first decentralized cryptocurrency.Since the release of bitcoin, many other cryptocurrencies have been created.',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSbmMXj50jV_DdSFqjzq7I2zwuOba-Osf9OA&usqp=CAU',
      ],
      tags: ['Crypto', 'Future', 'Innovation'],
      organizer: {
        name: 'Spider R&D',
        imgURL: 'https://delta.nitt.edu/images/deltaLogoGreen.png',
        isFollowing: true,
      },
      links: [
        'https://www.investopedia.com/terms/c/cryptocurrency.asp',
        'https://en.wikipedia.org/wiki/Cryptocurrency#:~:text=A%20cryptocurrency%2C%20crypto%2Dcurrency%2C,control%20the%20creation%20of%20additional',
      ],
    },
    {
      key: '5',
      dates: '31/9/21',
      time: '9:00',
      title: 'Photshoot',
      description: 'A series of contests open to all years',
      images: ['https://picsum.photos/200/300'],
      tags: ['Photos', 'Modern Art', 'Creativity'],
      links: [
        'https://spider.nitt.edu/',
        'https://spider.nitt.edu/projects/',
        'https://spider.nitt.edu/members/',
      ],
      organizer: {
        name: 'Spider R&D',
        imgURL:
          'https://scontent-maa2-1.xx.fbcdn.net/v/t31.18172-8/886853_949188685116554_2235082819868938369_o.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=yWojUORoCY0AX9aFPyp&_nc_ht=scontent-maa2-1.xx&oh=4716630c2f3c70678d31f28bd913790c&oe=618B81E5',
        isFollowing: true,
      },
    },
    {
      key: '6',
      dates: '10/10/21',
      time: '12:00',
      title: 'Blockchain',
      description:
        'Blockchain is a shared, immutable ledger that facilitates the process of recording transactions and tracking assets in a business network.',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUHFwJlmZ0VZPa0FMhhzZ_3yM_Xlwx0ifsEw&usqp=CAU',
      ],
      tags: ['Block Chain', 'Future'],
      organizer: {
        name: 'Spider R&D',
        imgURL:
          'https://media-exp1.licdn.com/dms/image/C510BAQF2qwmDE5B4UA/company-logo_200_200/0/1544248160311?e=2159024400&v=beta&t=g3fZgTrVPgM5pF_BYGaZW2InTI26WLfsFv4UOe0afew',
        isFollowing: true,
      },
      links: [
        'https://www.investopedia.com/terms/b/blockchain.asp',
        'https://www.blockchain.com/',
      ],
    },
    {
      key: '7',
      dates: '12/10/21',
      time: '17:00',
      title: 'Dawn of the Net',
      description:
        'The Internet is a worldwide collection of networks that links millions of businesses, government agencies, educational institutions',
      images: [
        'https://scontent-maa2-1.xx.fbcdn.net/v/t1.6435-9/40172254_429381174256506_219664165323669504_n.png?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=FYfQfI1oP10AX_qQd20&_nc_ht=scontent-maa2-1.xx&oh=17690135b8c8cb8fa92639ad0ab9e4a3&oe=618BE5B7',
      ],
      tags: ['Computer Science', 'Internet'],
      organizer: {
        name: 'Spider R&D',
        imgURL:
          'https://scontent-maa2-1.xx.fbcdn.net/v/t31.18172-8/1669754_596379967119456_676780727_o.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=CHx_mVPWDdMAX_xaupR&_nc_ht=scontent-maa2-1.xx&oh=146853d9d1cbc4920284aa598bda7326&oe=618B616B',
        isFollowing: true,
      },
      links: [
        'https://www.youtube.com/watch?v=hymzoUpM0K0',
        'https://freeessay.com/essays/the-dawn-of-the-net',
        'https://medium.com/dave-amiana/the-dawn-of-the-internet-fa7f176f3e87',
      ],
    },
  ];

  const Item = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.push('EventDescriptionScreen', {data: item});
      }}>
      <EventCard data={item} />
    </TouchableOpacity>
  );

  const renderEmptyItem = () => <NoEventCard />;

  const renderTopLayout = () => (
    <TopLayout
      updateDate={date => {
        // setDate(date);
      }}
    />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.calContainer}>
        <FlatList
          renderItem={Item}
          ref={agendaList}
          data={DATA}
          ListHeaderComponent={renderTopLayout}
          ListEmptyComponent={renderEmptyItem}
        />
        {/* <FAB style={styles.fab} small={false} icon="plus" onPress={createEvent} /> */}
        <FabGroup navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

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
