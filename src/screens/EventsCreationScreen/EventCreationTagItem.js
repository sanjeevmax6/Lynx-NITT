import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';
import * as color from '../../utils/colors';
import {verticalScale, scale} from 'react-native-size-matters';
import Icon from 'react-native-fontawesome';

const EventCreationTagItem = ({item, removeTag}) => {
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
        onClose={() => removeTag(item)}>
        {item}
      </Chip>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: scale(1),
  },
});

export default EventCreationTagItem;
