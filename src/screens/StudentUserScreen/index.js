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
    'https://scontent-maa2-2.xx.fbcdn.net/v/t1.6435-9/202928204_2094291417390109_6022856017763239094_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Ixz-JnPWMgsAX-MvYNT&_nc_ht=scontent-maa2-2.xx&oh=9d6362b1fa50876defc20a324e56ac02&oe=618C099D';
  //'https://scontent-maa2-1.xx.fbcdn.net/v/t31.18172-8/886853_949188685116554_2235082819868938369_o.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=yWojUORoCY0AX9aFPyp&_nc_ht=scontent-maa2-1.xx&oh=4716630c2f3c70678d31f28bd913790c&oe=618B81E5';
  //'https://scontent-maa2-2.xx.fbcdn.net/v/t1.6435-9/241857082_1976792029155655_8438033154233930116_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=tL-qiEURbA4AX8umi_6&_nc_ht=scontent-maa2-2.xx&oh=1f11ed149df11fed86f3dd7e9bbb65a8&oe=618BD0EE';

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
