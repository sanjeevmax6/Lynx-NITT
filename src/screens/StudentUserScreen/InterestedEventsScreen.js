import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import ListItem from './EventListItem';
import {listScreenStyles} from './styles';
import {verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {getAllStudentDetails} from './apiCalls';
import {observer} from 'mobx-react';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';

const headerFooterComponent = () => {
  return <View style={{height: verticalScale(6)}} />;
};

const InterestedEventsScreen = observer(({interestedEvents, goToEvent}) => {
  const onRefresh = () => {
    STUDENT_DETAILS_STORE.setRefresh(true);
    getAllStudentDetails();
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
        data={interestedEvents}
        ListHeaderComponent={headerFooterComponent}
        ListFooterComponent={headerFooterComponent}
        renderItem={({item}) => (
          <ListItem eventItem={item} goToEvent={goToEvent} />
        )}
      />
    </View>
  );
});

export default InterestedEventsScreen;
