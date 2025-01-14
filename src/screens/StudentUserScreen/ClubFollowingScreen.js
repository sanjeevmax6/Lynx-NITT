import React, {useState} from 'react';
import {View, FlatList, RefreshControl, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import ListItem from './ClubListItem';
import {listScreenStyles} from './styles';
import * as colors from '../../utils/colors';
import {getAllStudentDetails} from './apiCalls';
import {observer} from 'mobx-react';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';
import {NO_FOLLOWED_CLUBS} from '../../utils/ERROR_MESSAGES';

const headerFooterComponent = () => {
  return <View style={{height: verticalScale(6)}} />;
};

const ClubFollowingScreen = observer(
  ({navigation, goToClub, setFollowCount}) => {
    const onRefresh = () => {
      STUDENT_DETAILS_STORE.setRefresh(true);
      getAllStudentDetails(true);
    };
    const [refreshList, setRefreshList] = useState(false);
    setFollowCount(STUDENT_DETAILS_STORE.getClubs.length);
    const refreshFlat = r => {
      setRefreshList(r);
    };
    return (
      <View style={listScreenStyles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={STUDENT_DETAILS_STORE.getRefresh}
              colors={[colors.Accent]}
              onRefresh={onRefresh}
            />
          }
          style={listScreenStyles.listStyle}
          ListHeaderComponent={headerFooterComponent}
          ListFooterComponent={headerFooterComponent}
          ListEmptyComponent={
            <View style={{width: '100%'}}>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  marginHorizontal: scale(16),
                  marginTop: verticalScale(10),
                  alignSelf: 'center',
                }}>
                {NO_FOLLOWED_CLUBS}
              </Text>
              <View style={{alignItems: 'baseline', alignSelf: 'center'}}>
                <Button
                  mode={'text'}
                  color={colors.Tertiary}
                  onPress={() => {
                    navigation.navigate('Search', {
                      screen: 'SearchScreen',
                      params: {
                        screen: 'Clubs',
                        params: {searchText: ''},
                      },
                    });
                  }}>
                  Explore Clubs
                </Button>
              </View>
            </View>
          }
          keyExtractor={item => item.clubId._id}
          data={STUDENT_DETAILS_STORE.getClubs}
          renderItem={({item}) => (
            <ListItem
              clubItem={item}
              goToClub={goToClub}
              refreshFlat={refreshFlat}
              setFollowCount={setFollowCount}
            />
          )}
          extraData={refreshList}
        />
      </View>
    );
  },
);

export default ClubFollowingScreen;
