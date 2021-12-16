import React from 'react';
import {View, FlatList} from 'react-native';
import ListItem from './EventListItem';
import {listScreenStyles} from './styles';
import {verticalScale} from 'react-native-size-matters';
const headerFooterComponent = () => {
  return <View style={{height: verticalScale(6)}} />;
};

const InterestedEventsScreen = ({interestedEvents, goToEvent}) => {
  return (
    <View style={listScreenStyles.container}>
      <FlatList
        style={listScreenStyles.listStyle}
        data={interestedEvents}
        ListHeaderComponent={headerFooterComponent}
        ListFooterComponent={headerFooterComponent}
        renderItem={({item}) => (
          <ListItem eventItem={item} goToEvent={goToEvent} />
        )}
      />
    </View>
  );
};

export default InterestedEventsScreen;
