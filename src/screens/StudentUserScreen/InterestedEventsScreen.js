import React, {useState} from 'react';
import {View, FlatList, RefreshControl, Text} from 'react-native';
import ListItem from './EventListItem';
import {listScreenStyles} from './styles';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {getAllStudentDetails} from './apiCalls';
import {observer} from 'mobx-react';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';
import {IconButton, Icon, Button} from 'react-native-paper';

const headerFooterComponent = () => {
  return <View style={{height: verticalScale(6)}} />;
};

const InterestedEventsScreen = observer(({goToEvent}) => {
  const onRefresh = () => {
    STUDENT_DETAILS_STORE.setRefresh(true);
    getAllStudentDetails(true);
  };
  const [click, setClick] = useState(false);
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
        data={STUDENT_DETAILS_STORE.getInterests}
        ListHeaderComponent={headerFooterComponent}
        ListFooterComponent={headerFooterComponent}
        ListEmptyComponent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: verticalScale(10),
              width: '100%',
            }}>
            <Text
              style={{
                fontSize: moderateScale(16),
                alignSelf: 'center',
              }}>
              Click on
            </Text>
            <IconButton
              onPress={() => setClick(!click)}
              icon={click ? 'star' : 'star-outline'}
              color={colors.Tertiary}
              size={moderateScale(25)}
            />
            <Text
              style={{
                fontSize: moderateScale(16),
                alignSelf: 'center',
              }}>
              to respond to an event.
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <ListItem eventItem={item} goToEvent={goToEvent} />
        )}
      />
    </View>
  );
});

export default InterestedEventsScreen;
