import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import RecentEventsCard from './RecentEventCard';
import * as colors from '../../utils/colors';
import {CLUB_USER_STORE} from '../../mobx/CLUB_USER_STORE';
import {verticalScale} from 'react-native-size-matters';
import {observer} from 'mobx-react';

const headerFooterComponent = () => {
  return <View style={{height: verticalScale(6)}} />;
};

const UpcomingEventsComponent = observer(({functions}) => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={CLUB_USER_STORE.getRefresh}
            colors={[colors.Accent]}
            onRefresh={functions.onRefresh}
          />
        }
        ListHeaderComponent={headerFooterComponent}
        ListFooterComponent={headerFooterComponent}
        data={[
          ...CLUB_USER_STORE.getLiveEvents,
          ...CLUB_USER_STORE.getUpcomingEvents,
        ]}
        renderItem={({item}) => (
          <RecentEventsCard eventItem={item} functions={functions} />
        )}
      />
    </View>
  );
});

export default UpcomingEventsComponent;
