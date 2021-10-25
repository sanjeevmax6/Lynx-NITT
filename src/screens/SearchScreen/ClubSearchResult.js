import React, {useState} from 'react';
import {View, Text, FlatList, Keyboard} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ClubSearchCard from '../../components/ClubSearchCard';

const ClubSearchResult = ({searchQuery, setScreen}) => {
  const footer = () => {
    return <View />;
  };

  const DATA = [
    {
      clubIconUrl:
        'https://scontent-maa2-2.xx.fbcdn.net/v/t1.18169-9/10256820_776786612346355_8425053474905583486_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=okOrasD-iFIAX9OD2uw&_nc_ht=scontent-maa2-2.xx&oh=f3650e40f1e17761e7072bb4a042da0c&oe=618DB8E5',
      clubName: 'Spider',
      clubDescription:
        'The Official Research And Development (R&D) Club of NIT Trichy',
      isFollowing: true,
    },
    {
      clubIconUrl:
        'https://scontent-maa2-1.xx.fbcdn.net/v/t1.6435-9/40172254_429381174256506_219664165323669504_n.png?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=FYfQfI1oP10AX_qQd20&_nc_ht=scontent-maa2-1.xx&oh=17690135b8c8cb8fa92639ad0ab9e4a3&oe=618BE5B7',
      clubName: '180 Degrees Consulting',
      clubDescription: 'Consulting club of NIT Trichy',
      isFollowing: true,
    },

    {
      clubIconUrl:
        'https://scontent-maa2-1.xx.fbcdn.net/v/t1.6435-9/144186258_3667609216664627_1711839429231199084_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=8Mgap8cfKvUAX_1-4X9&_nc_ht=scontent-maa2-1.xx&oh=45ac4ddf9bf4295df6aa519f6a3e9e31&oe=618C6B0C',
      clubName: 'Festember',
      clubDescription:
        'The Annual National level Cultural Festival of NIT Trichy',
      isFollowing: false,
    },
    {
      clubIconUrl:
        'https://scontent-maa2-2.xx.fbcdn.net/v/t1.6435-9/202928204_2094291417390109_6022856017763239094_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Ixz-JnPWMgsAX-MvYNT&_nc_ht=scontent-maa2-2.xx&oh=9d6362b1fa50876defc20a324e56ac02&oe=618C099D',
      clubName: 'Probe',
      clubDescription:
        'The Annual International Technical Symposium of the Department of ECE, NIT Trichy',
      isFollowing: true,
    },
    {
      clubIconUrl: 'https://delta.nitt.edu/images/deltaLogoGreen.png',
      clubName: 'Delta',
      clubDescription: 'Programming Club of NITT',
      isFollowing: false,
    },

    {
      clubIconUrl:
        'https://scontent-maa2-1.xx.fbcdn.net/v/t31.18172-8/1669754_596379967119456_676780727_o.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=CHx_mVPWDdMAX_xaupR&_nc_ht=scontent-maa2-1.xx&oh=146853d9d1cbc4920284aa598bda7326&oe=618B616B',
      clubName: 'RMI',
      clubDescription: 'Robotics club of NIT Trichy',
      isFollowing: true,
    },
    {
      clubIconUrl:
        'https://scontent-maa2-1.xx.fbcdn.net/v/t31.18172-8/886853_949188685116554_2235082819868938369_o.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=yWojUORoCY0AX9aFPyp&_nc_ht=scontent-maa2-1.xx&oh=4716630c2f3c70678d31f28bd913790c&oe=618B81E5',
      clubName: 'Feeds',
      clubDescription: 'The official college magazine',
      isFollowing: false,
    },
    {
      clubIconUrl:
        'https://scontent-maa2-1.xx.fbcdn.net/v/t1.6435-9/91796693_2956386031147812_3781329494191636480_n.png?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=iN8Ap-YEyQEAX8M98xi&tn=9RdPRT-jf60CJeDw&_nc_ht=scontent-maa2-1.xx&oh=893d8c3e4df956a635a1278b041602de&oe=618E6A13',
      clubName: 'Aaveg',
      clubDescription: 'Fest',
      isFollowing: true,
    },
    {
      clubIconUrl:
        'https://scontent-maa2-2.xx.fbcdn.net/v/t1.6435-9/241857082_1976792029155655_8438033154233930116_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=tL-qiEURbA4AX8umi_6&_nc_ht=scontent-maa2-2.xx&oh=1f11ed149df11fed86f3dd7e9bbb65a8&oe=618BD0EE',
      clubName: 'Vortex',
      clubDescription:
        'The Annual National Level Technical Symposium of Department of CSE, NIT Trichy',
      isFollowing: true,
    },
    {
      clubIconUrl:
        'https://scontent-maa2-1.xx.fbcdn.net/v/t31.18172-8/886853_949188685116554_2235082819868938369_o.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=yWojUORoCY0AX9aFPyp&_nc_ht=scontent-maa2-1.xx&oh=4716630c2f3c70678d31f28bd913790c&oe=618B81E5',
      clubName: 'Feeds',
      clubDescription: 'The official college magazine',
      isFollowing: false,
    },
    {
      clubIconUrl:
        'https://scontent-maa2-1.xx.fbcdn.net/v/t1.6435-9/91796693_2956386031147812_3781329494191636480_n.png?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=iN8Ap-YEyQEAX8M98xi&tn=9RdPRT-jf60CJeDw&_nc_ht=scontent-maa2-1.xx&oh=893d8c3e4df956a635a1278b041602de&oe=618E6A13',
      clubName: 'Aaveg',
      clubDescription: 'Fest',
      isFollowing: true,
    },
    {
      clubIconUrl:
        'https://scontent-maa2-2.xx.fbcdn.net/v/t1.6435-9/241857082_1976792029155655_8438033154233930116_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=tL-qiEURbA4AX8umi_6&_nc_ht=scontent-maa2-2.xx&oh=1f11ed149df11fed86f3dd7e9bbb65a8&oe=618BD0EE',
      clubName: 'Vortex',
      clubDescription:
        'The Annual National Level Technical Symposium of Department of CSE, NIT Trichy',
      isFollowing: true,
    },
  ];

  const [API, setAPI] = useState('');
  const isFocused = useIsFocused();
  if (isFocused) {
    setScreen('CLUB');
    if (searchQuery != '') {
      if (searchQuery != API) {
        setAPI(searchQuery);
        console.log('Doing API CALL IN CLUB SEARCH: ' + searchQuery);
      }
    } else if (searchQuery === '' && API != '') {
      setAPI('');
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {API != '' ? (
        <View>
          <Text style={{textAlign: 'center'}}>
            ClubSearchResult: {'\n'} {API}{' '}
            <Text style={{fontWeight: 'bold'}}> </Text>
          </Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={DATA}
            vertical={true}
            onScroll={() => {
              Keyboard.dismiss();
            }}
            ListFooterComponent={footer()}
            renderItem={({item}) => (
              <View>
                <ClubSearchCard
                  clubIconUrl={item.clubIconUrl}
                  clubName={item.clubName}
                  clubDescription={item.clubDescription}
                  isFollowing={item.isFollowing}
                />
              </View>
            )}
            numColumns={1}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ClubSearchResult;
