import React from 'react';
import {View, FlatList} from 'react-native';
import ListItem from './ClubListItem';
import {listScreenStyles} from './styles';

const ClubFollowingScreen = ({clubFollowing, goToClub}) => {
  return (
    <View style={listScreenStyles.container}>
      <FlatList
        style={listScreenStyles.listStyle}
        data={clubFollowing}
        renderItem={({item}) => (
          <ListItem clubItem={item} goToClub={goToClub} />
        )}
      />
    </View>
  );
};

export default ClubFollowingScreen;
