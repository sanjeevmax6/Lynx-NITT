import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import ListItem from './EventListItem';
import {listScreenStyles} from './styles';
import {verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {getAllStudentDetails} from './apiCalls';

const headerFooterComponent = () => {
  return <View style={{height: verticalScale(6)}} />;
};

const InterestedEventsScreen = ({interestedEvents, goToEvent}) => {
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
