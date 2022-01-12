import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import ListItem from './ClubListItem';
import {listScreenStyles} from './styles';
import * as colors from '../../utils/colors';
import {getAllStudentDetails} from './apiCalls';
import {observer} from 'mobx-react';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';

const headerFooterComponent = () => {
  return <View style={{height: verticalScale(6)}} />;
};

const ClubFollowingScreen = observer(({clubFollowing, goToClub}) => {
  const onRefresh = () => {
    STUDENT_DETAILS_STORE.setRefresh(true);
    getAllStudentDetails(true);
  };

  return (
    <View style={listScreenStyles.container}>
      <FlatList
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
        data={clubFollowing}
        renderItem={({item}) => (
          <ListItem clubItem={item} goToClub={goToClub} />
        )}
      />
    </View>
  );
});

export default ClubFollowingScreen;
