import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Button} from 'react-native-paper';
import * as color from '../../utils/colors';

const EventsCreationFooter = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.twoButtonLeft}>
        <Button
          icon="cancel"
          mode="text"
          color="white"
          onPress={() => console.log('Cancel pressed')}>
          Cancel
        </Button>
      </View>
      <View style={styles.twoButtonRight}>
        <Button
          icon="plus-circle"
          mode="text"
          color="white"
          onPress={() => console.log('Create pressed')}>
          Create
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    paddingVertical: verticalScale(5),
    backgroundColor: color.Secondary,
  },
  buttonViewTheme: {
    fontSize: 16,
    padding: moderateScale(8),
    backgroundColor: color.Secondary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextTheme: {
    fontSize: 16,
    marginLeft: scale(10),
    color: color.WHITE,
  },
  twoButtonLeft: {
    flex: 1,
    paddingRight: scale(5),
    paddingLeft: scale(20),
    paddingVertical: verticalScale(5),
  },
  twoButtonRight: {
    flex: 1,
    paddingRight: scale(20),
    paddingLeft: scale(5),
    paddingVertical: verticalScale(5),
  },
});

export default EventsCreationFooter;
