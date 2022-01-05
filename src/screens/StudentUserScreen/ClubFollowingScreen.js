import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import ListItem from './ClubListItem';
import {listScreenStyles} from './styles';
import * as colors from '../../utils/colors';
import {getAllStudentDetails} from './apiCalls';

const headerFooterComponent = () => {
  return <View style={{height: verticalScale(6)}} />;
};

const ClubFollowingScreen = ({clubFollowing, goToClub}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = () => {
    setRefreshing(false);
    console.log('refreshing');
    getAllStudentDetails();
  };

  return (
    <View style={listScreenStyles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
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
};

export default ClubFollowingScreen;
