import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';
import * as color from '../../utils/colors';
import {verticalScale, scale} from 'react-native-size-matters';
import {EVENT_CREATION_STORE} from '../../mobx/EVENT_CREATION_STORE';

const EventCreationTagItem = ({item, index}) => {
  return (
    <View style={styles.container}>
      <Chip
        style={{
          backgroundColor: color.EventDescriptionScreen_TagBackGround,
          marginTop: verticalScale(3),
        }}
        textStyle={{
          fontSize: scale(12),
          color: color.EventDescriptionScreen_TagText,
        }}
        ellipsizeMode="tail"
        numberOfLines={1}
        onClose={() => EVENT_CREATION_STORE.removeTag(index)}>
        {item}
      </Chip>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: scale(1),
  },
});

export default EventCreationTagItem;
