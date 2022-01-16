import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from './StudentUserHeader';
import Body from './StudentUserBody';
import {getAllStudentDetails} from './apiCalls';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';
import {observer} from 'mobx-react';
import ErrorScreen from '../../components/ErrorScreen';
import LoaderPage from '../../components/LoadingScreen';
import {
  ACCENT_LOTTIE,
  ACCENT_STUDENT_USER_LOADER,
} from '../../utils/LOADING_TYPES';
import {useIsFocused} from '@react-navigation/native';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';

const StudentUserScreen = observer(({navigation}) => {
  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(true);
  }
  const studentUsername =
    STUDENT_DETAILS_STORE.getFirstName +
    ' ' +
    STUDENT_DETAILS_STORE.getLastName;
  const studentRno = STUDENT_DETAILS_STORE.getRollNo;
  const studentDept = STUDENT_DETAILS_STORE.getDepartment;
  const coverPhotoUri = API_GET_IMAGE + STUDENT_DETAILS_STORE.getProfilePic;
  const interests = STUDENT_DETAILS_STORE.getInterests;
  const clubs = STUDENT_DETAILS_STORE.getClubs;

  React.useEffect(() => {
    getAllStudentDetails();
  }, []);

  const studentDetails = {
    studentUsername,
    studentRno,
    studentDept,
    coverPhotoUri,
  };

  const goToClub = club => {
    navigation.push('ClubDescription', {ClubId: club.clubId._id});
  };

  const goToEvent = event => {
    navigation.push('EventDescriptionScreen', {
      eventId: event._id,
      app: true,
    });
    //navigation.push('EventDescription', {data: {EventId: event._id}});
  };

  const functionCalls = {
    goToClub,
    goToEvent,
  };

  return (
    <View style={styles.container}>
      {STUDENT_DETAILS_STORE.isError ? (
        <ErrorScreen
          errorMessage={STUDENT_DETAILS_STORE.errorText}
          fn={() => {
            getAllStudentDetails();
          }}
        />
      ) : STUDENT_DETAILS_STORE.isLoading ? (
        <LoaderPage LoadingAccent={ACCENT_STUDENT_USER_LOADER} />
      ) : (
        <>
          <Header studentDetails={studentDetails} navigation={navigation} />
          <Body
            navigation={navigation}
            clubFollowing={clubs}
            interestedEvents={interests}
            functionCalls={functionCalls}
          />
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
  },
});

export default StudentUserScreen;
