import {observer} from 'mobx-react';
import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';
import ClubFollowItem from './ClubFollowItem';

const StudentSettings = observer(({navigation}) => {
  const goToClub = club => {
    navigation.navigate('ClubDescription', {ClubId: club.clubId._id});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Manage Notifications</Text>
      <FlatList
        data={STUDENT_DETAILS_STORE.getClubs}
        renderItem={({item}) => (
          <ClubFollowItem clubItem={item} goToClub={goToClub} />
        )}
      />
    </View>
  );
});

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

export default StudentSettings;
