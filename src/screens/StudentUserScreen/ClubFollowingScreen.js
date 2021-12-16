import React from 'react';
import {View, FlatList} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import ListItem from './ClubListItem';
import {listScreenStyles} from './styles';

const headerFooterComponent = () => {
  return <View style={{height: verticalScale(6)}} />;
};

const ClubFollowingScreen = ({clubFollowing, goToClub}) => {
  return (
    <View style={listScreenStyles.container}>
      <FlatList
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
