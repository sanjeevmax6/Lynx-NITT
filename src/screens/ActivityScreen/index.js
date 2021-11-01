import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Animated,
  Platform,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import ActivityCard from '../../components/ActivityCard';

import * as colors from '../../utils/colors';
import {HorizontalPadding, HeaderHeight} from '../../utils/UI_CONSTANTS';

const ActivityScreen = ({navigation}) => {
  const DATA = [
    {
      key: '4',
      date: '10/3/2021',
      time: '15:00',

      description:
        'Bitcoin is a decentralized digital currency, Dive into the future Now!',
      url: 'https://encrypted-tbn0.gstatic.com/url?q=tbn:ANd9GcRSbmMXj50jV_DdSFqjzq7I2zwuOba-Osf9OA&usqp=CAU',
      organizer: 'SPIDER',
      type: 1,
      data: {
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
          imgURL:
            'https://media-exp1.licdn.com/dms/image/C510BAQF2qwmDE5B4UA/company-logo_200_200/0/1544248160311?e=2159024400&v=beta&t=g3fZgTrVPgM5pF_BYGaZW2InTI26WLfsFv4UOe0afew',
          isFollowing: true,
        },
        links: [
          'https://www.investopedia.com/terms/c/cryptocurrency.asp',
          'https://en.wikipedia.org/wiki/Cryptocurrency#:~:text=A%20cryptocurrency%2C%20crypto%2Dcurrency%2C,control%20the%20creation%20of%20additional',
        ],
      },
    },
    {
      key: '2',
      date: '09/28/2021',
      time: '1:00',
      description:
        'Dive into the future of application development! Register for the event! 🔥🔥',
      url: 'https://encrypted-tbn0.gstatic.com/url?q=tbn:ANd9GcRemhwHNljTo4pxynHrc7O3F-ZA6-eLUqzMLg&usqp=CAU',
      organizer: 'SPIDER',
      type: 1,
      data: {
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
          imgURL:
            'https://media-exp1.licdn.com/dms/image/C510BAQF2qwmDE5B4UA/company-logo_200_200/0/1544248160311?e=2159024400&v=beta&t=g3fZgTrVPgM5pF_BYGaZW2InTI26WLfsFv4UOe0afew',
          isFollowing: true,
        },
        links: [
          'https://spider.nitt.edu/',
          'https://en.wikipedia.org/wiki/Application_software',
          'https://www.quickbase.com/articles/application-software-basics',
        ],
      },
    },

    {
      key: '62',
      date: '06/13/2021',
      time: '12:00',

      description:
        'Promoting Fit India activity and Confederation of Indian Industry, Young Indians',
      url: 'https://media-exp1.licdn.com/dms/image/C5622AQGvwatzd-yw2w/feedshare-shrink_800/0/1632288990441?e=1635984000&v=beta&t=Np6ibVBGl6_MrN3IcFQFN6yYVyj-RyXytA90jgcR1iI',
      organizer: 'ADMIN',
      type: 1,
      data: {
        key: '7',
        dates: '03/10/21',
        time: '12:00',
        title: 'Fit India',
        description:
          'Promoting Fit India activity and Confederation of Indian Industry, Young Indians (CII, Yi) -Climate Change Initiative, Office of Students Activity and Sports under the section of Office of Students Welfare organized a 4 km cycle rally in the campus involving our students, faculty and staff on 16 September 2021. Director Dr. Mini Shaji Thomas inaugurated the event and spoke on the importance of preserving nature and the importance of physical fitness, in the presence of Dr. Kumaresan (Dean Students Welfare), SAS Officers and representatives of CII, Yi. Dr. S Nivethitha (Faculty DOMS) and the participants pledged on protecting nature and in practicing eco-friendly activities.',
        images: [
          'https://media-exp1.licdn.com/dms/image/C5622AQGvwatzd-yw2w/feedshare-shrink_800/0/1632288990441?e=1635984000&v=beta&t=Np6ibVBGl6_MrN3IcFQFN6yYVyj-RyXytA90jgcR1iI',
        ],
        tags: ['Youth', 'Health'],
        organizer: {
          name: 'ADMIN',
          imgURL:
            'https://media-exp1.licdn.com/dms/image/C560BAQG_ucXVUxFz0Q/company-logo_200_200/0/1598347576184?e=1642032000&v=beta&t=5PcxMol2CjNQW5Xzr-tqpMbkRor49LOd7tfzFZUdWfg',
          isFollowing: true,
        },
        links: [
          'https://www.linkedin.com/school/nittrichy/posts/?feedView=all',
        ],
      },
    },
    {
      key: '62',
      date: '06/21/2021',
      time: '12:00',

      description:
        'The dates of the fees payment without fine for the odd sem has been increase to 15/07/2021',
      //url: 'https://media-exp1.licdn.com/dms/image/C5622AQEsxoiwqIwVUQ/feedshare-shrink_800/0/1631092819512?e=1635984000&v=beta&t=Ar_V9NJNtbnbCt9lKWbENegC4MzpsNxOxENzNd7Yd-g',
      organizer: 'Student Council',
      organizerUrl:
        'https://media-exp1.licdn.com/dms/image/C4D0BAQEJ6YqHogtJfw/company-logo_200_200/0/1625143958627?e=1642032000&v=beta&t=929tWs1wPIbVKzB4WaXOjxdrwprxTi4Itgh-ft2-Tlw',

      type: 0,
    },
    {
      key: '1',
      date: '05/27/2021',
      time: '10:00',
      description:
        "We heartily welcome Madhav Aggarwal as the Students' Council President for the academic year 2021",
      url: 'https://media-exp1.licdn.com/dms/image/C5603AQHdfgCOizSk0w/profile-displayphoto-shrink_400_400/0/1623262202130?e=1638403200&v=beta&t=6WoyAH77V-qVfI8yze8B0-Gx6hrd4HzOHv2CMbubWQ0',
      organizer: 'Student Council',
      organizerUrl:
        'https://media-exp1.licdn.com/dms/image/C4D0BAQEJ6YqHogtJfw/company-logo_200_200/0/1625143958627?e=1642032000&v=beta&t=929tWs1wPIbVKzB4WaXOjxdrwprxTi4Itgh-ft2-Tlw',
      type: 0,
    },

    {
      key: '3',
      date: '05/18/2021',
      time: '16:00',
      description:
        'Greetings to Naren Sairam for being the Head of Application Development. 💥💥',
      url: 'https://media-exp1.licdn.com/dms/image/C5103AQEOSehMI__7Cw/profile-displayphoto-shrink_400_400/0/1571230784771?e=1638403200&v=beta&t=6NA--gXscJMLTZfcDBPiNX-PdY3rClkafwDo5ajnndg',
      organizer: 'SPIDER',
    },
    {
      key: '7',
      date: '03/15/2021',
      time: '17:00',

      description:
        'The Internet is a worldwide collection of networks that links millions of businesses, government agencies, educational institutions. Dive in!',
      url: 'https://encrypted-tbn0.gstatic.com/url?q=tbn:ANd9GcQjyudszQUse-zKQfNaYxP26URn91W6gOQDhg&usqp=CAU',
      organizer: 'SPIDER',
      type: 1,
      data: {
        key: '7',
        dates: '12/10/21',
        time: '17:00',
        title: 'Dawn of the Net',
        description:
          'The Internet is a worldwide collection of networks that links millions of businesses, government agencies, educational institutions',
        images: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjyudszQUse-zKQfNaYxP26URn91W6gOQDhg&usqp=CAU',
        ],
        tags: ['Computer Science', 'Internet'],
        organizer: {
          name: 'Spider R&D',
          imgURL:
            'https://media-exp1.licdn.com/dms/image/C510BAQF2qwmDE5B4UA/company-logo_200_200/0/1544248160311?e=2159024400&v=beta&t=g3fZgTrVPgM5pF_BYGaZW2InTI26WLfsFv4UOe0afew',
          isFollowing: true,
        },
        links: [
          'https://www.youtube.com/watch?v=hymzoUpM0K0',
          'https://freeessay.com/essays/the-dawn-of-the-net',
          'https://medium.com/dave-amiana/the-dawn-of-the-internet-fa7f176f3e87',
        ],
      },
    },
    {
      key: '622',
      date: '03/10/2021',
      time: '12:00',

      description:
        'The Barn Hall, beautifully decked up for the 17th Convocation Ceremony!',
      url: 'https://media-exp1.licdn.com/dms/image/C5622AQHxtANAKLS1iw/feedshare-shrink_2048_1536/0/1632996096153?e=1635984000&v=beta&t=0YY9_R7ROHkyH0Vp_rHs6wvgfEon76IJ2wtNX4O0MP8',
      organizer: 'ADMIN',
      organizerUrl:
        'https://media-exp1.licdn.com/dms/image/C560BAQG_ucXVUxFz0Q/company-logo_200_200/0/1598347576184?e=1642032000&v=beta&t=5PcxMol2CjNQW5Xzr-tqpMbkRor49LOd7tfzFZUdWfg',
    },
    {
      key: '62',
      date: '01/11/2021',
      time: '12:00',

      description:
        'With another academic year coming to an end, we bid adieu to our students who will be taking the next big step in their lives.',
      url: 'https://media-exp1.licdn.com/dms/image/C5622AQEsxoiwqIwVUQ/feedshare-shrink_800/0/1631092819512?e=1635984000&v=beta&t=Ar_V9NJNtbnbCt9lKWbENegC4MzpsNxOxENzNd7Yd-g',
      organizer: 'ADMIN',
      organizerUrl:
        'https://media-exp1.licdn.com/dms/image/C560BAQG_ucXVUxFz0Q/company-logo_200_200/0/1598347576184?e=1642032000&v=beta&t=5PcxMol2CjNQW5Xzr-tqpMbkRor49LOd7tfzFZUdWfg',

      type: 0,
    },
    {
      key: '226',
      date: '01/01/2021',
      time: '12:00',

      description:
        'Has the world of blockchain technology fascinated you? Learn about the modern technological marvel! Register Now! 💥',
      url: 'https://encrypted-tbn0.gstatic.com/url?q=tbn:ANd9GcSUHFwJlmZ0VZPa0FMhhzZ_3yM_Xlwx0ifsEw&usqp=CAU',
      organizer: 'SPIDER',
      organizerUrl:
        'https://media-exp1.licdn.com/dms/image/C510BAQF2qwmDE5B4UA/company-logo_200_200/0/1544248160311?e=2159024400&v=beta&t=g3fZgTrVPgM5pF_BYGaZW2InTI26WLfsFv4UOe0afew',

      type: 1,
      data: {
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
    },
    {
      key: '62',
      date: '10/1/2020',
      time: '12:00',
      url: 'https://media-exp1.licdn.com/dms/image/C4D22AQH8LrB1EJoKvw/feedshare-shrink_800/0/1599841013385?e=1637193600&v=beta&t=muw3T96Pt2-97-vht2HAy6B9mrmOv3802poeKBaFhP8',

      description:
        'La Casa de la Tecnología, an initiative of the Technical Council, is a series of talks with the Tech Clubs of NITT to understand them better in terms of their projects, vision, and the future ahead. The eighth episode of this series is with Spider, the R&D Club of NITT. They focus on projects related to Artificial Intelligence, Electronics, and Computer Technology featuring WebDev, AppDev, Algos, and Tronix.',
      //x url: 'https://media-exp1.licdn.com/dms/image/sync/C4E27AQGxEvuJygUVGQ/articleshare-shrink_800/0/1632108431702?e=1633197600&v=beta&t=gqA1LAQ2P9-m6vonsm5KCN00sDSAZ1QPhYkw7gZKQVc',
      organizer: 'SPIDER',
      organizerUrl:
        'https://media-exp1.licdn.com/dms/image/C510BAQF2qwmDE5B4UA/company-logo_200_200/0/1544248160311?e=2159024400&v=beta&t=g3fZgTrVPgM5pF_BYGaZW2InTI26WLfsFv4UOe0afew',

      type: 0,
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
      <SafeAreaView>
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
                fontWeight: 'bold',
                color: colors.HeaderText,
              }}>
              ACTIVITIES
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
              <ActivityCard
                date={item.date}
                time={item.time}
                url={item.url}
                notifier={item.organizer}
                notification={item.description}
                type={item.type}
                navigation={navigation}
                data={item.data}
                organizerUrl={item.organizerUrl}
              />
              <Divider style={{height: verticalScale(2)}} />
            </View>
          )}
          numColumns={1}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
