import React from 'react';
import {View, FlatList} from 'react-native';
import ListItem from './EventListItem';
import {listScreenStyles} from './styles';

const InterestedEventsScreen = ({interestedEvents, goToEvent}) => {
  return (
    <View style={listScreenStyles.container}>
      <FlatList
        style={listScreenStyles.listStyle}
        data={interestedEvents}
        renderItem={({item}) => (
          <ListItem eventItem={item} goToEvent={goToEvent} />
        )}
      />
    </View>
  );
};

export default InterestedEventsScreen;
