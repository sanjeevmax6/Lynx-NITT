import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from './StudentUserHeader';
import Body from './StudentUserBody';
import {interestedEvents, clubFollowing} from './sampleData';

const StudentUserScreen = ({navigation}) => {
  const studentUsername = 'Vaasu Gambhir';
  const studentRno = '106119140';
  const studentDept = 'Computer Science and Engineering';

  // const token = useSelector(state => state.logScreen.login.userToken);
  // console.log(token);

  const coverPhotoUri =
    'https://imagizer.imageshack.com/img923/3654/wyJncs.jpg';

  const studentDetails = {
    studentUsername,
    studentRno,
    studentDept,
    coverPhotoUri,
  };

  const goToClub = club => {
    navigation.push('ClubDescription', {data: club});
  };

  const goToEvent = event => {
    navigation.push('EventDescription', {data: event});
  };

  const functionCalls = {
    goToClub,
    goToEvent,
  };

  const clubs = clubFollowing.filter(item => {
    return item.isFollowing == true;
  });

  return (
    <View style={styles.container}>
      <Header studentDetails={studentDetails} navigation={navigation} />
      <Body
        clubFollowing={clubs}
        interestedEvents={interestedEvents}
        functionCalls={functionCalls}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
  },
});

export default StudentUserScreen;
