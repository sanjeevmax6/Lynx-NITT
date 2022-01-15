import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import * as colors from '../../utils/colors';
import {getClubDetails} from './apiCalls';
import {CLUB_USER_STORE} from '../../mobx/CLUB_USER_STORE';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';
import {observer} from 'mobx-react';
import Header from './Header';
import ErrorScreen from '../../components/ErrorScreen';
import LoaderPage from '../../components/LoadingScreen';
import {ACCENT_STUDENT_USER_LOADER} from '../../utils/LOADING_TYPES';
import Body from './Body';
import {deleteEvent} from '../../apis/deleteEvent';
import CustomAlert from '../../components/customAlert';

const UserScreen = observer(({navigation}) => {
  React.useEffect(() => {
    getClubDetails();
  }, []);

  const onDeleteClick = (eventId, eventName) => {
    setModalTitle('Confirmation');
    setModalMessage(`${eventName} will be deleted!`);
    setModalButtons([
      {
        text: 'CANCEL',
        func: () => {},
      },
      {
        text: 'DELETE',
        func: () => {
          console.log(`Deleting event ${eventName}`);
          deleteEvent(eventId, onRefresh, reason => {
            console.log(`Error in deletion: ${reason}`);
          });
        },
      },
    ]);
    setModalVisible(true);
  };

  const onEventClick = eventId => {
    navigation.navigate('EventDescriptionScreen', {eventId});
  };

  const onRefresh = () => {
    CLUB_USER_STORE.setRefresh(true);
    getClubDetails(true);
  };

  const functions = {
    onDeleteClick: onDeleteClick,
    onEventClick: onEventClick,
    onRefresh: onRefresh,
  };

  const listData = {
    upcomingEvents: CLUB_USER_STORE.getUpcomingEvents,
    liveEvents: CLUB_USER_STORE.getLiveEvents,
    pastEvents: CLUB_USER_STORE.getPastEvents,
  };
  const [modalTitle, setModalTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState({});

  return (
    <View style={{backgroundColor: colors.WHITE, flex: 1}}>
      <CustomAlert
        title={modalTitle}
        message={modalMessage}
        startDate={''}
        endDate={''}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        buttons={modalButtons}
      />
      {CLUB_USER_STORE.getIsError ? (
        <ErrorScreen
          errorMessage={CLUB_USER_STORE.getErrorText}
          fn={() => {
            getClubDetails();
          }}
        />
      ) : CLUB_USER_STORE.getIsLoading ? (
        <LoaderPage LoadingAccent={ACCENT_STUDENT_USER_LOADER} />
      ) : (
        <>
          <Header
            name={CLUB_USER_STORE.getName}
            url={API_GET_IMAGE + CLUB_USER_STORE.getProfilePic}
            followers={CLUB_USER_STORE.getFollowerCount}
            description={CLUB_USER_STORE.getDescription}
            navigation={navigation}
          />
          <Body data={listData} functions={functions} />
        </>
      )}
    </View>
  );
});

export default UserScreen;
