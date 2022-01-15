import React from 'react';
import {View, StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import StudentSettings from './StudentSettings';
import ClubSettings from './ClubSettings';
import {USER_STORE} from '../../mobx/USER_STORE';
import {STUDENT} from '../../utils/USER_TYPE';

const SettingsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {USER_STORE.getUserType === STUDENT ? (
        <StudentSettings navigation={navigation} />
      ) : (
        <ClubSettings />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: moderateScale(18),
    marginHorizontal: scale(16),
    marginTop: verticalScale(15),
    marginBottom: verticalScale(4),
    fontWeight: '500',
  },
});

export default SettingsScreen;
