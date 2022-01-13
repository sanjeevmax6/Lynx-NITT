import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import EventEditImages from './EventEditImages';
import EventEditHeader from './EventEditHeader';
import EventEditInput from './EventEditInput';
import EventEditDateTime from './EventEditDateTime';
import EventEditLinks from './EventEditLinks';
import EventEditTags from './EventEditTags';
import {observer} from 'mobx-react';
import {verticalScale} from 'react-native-size-matters';
import {EVENT_EDIT_STORE} from '../../mobx/EVENT_EDIT_STORE';
import {EVENT_DESCRIPTION_STORE} from '../../mobx/EVENT_DESCRIPTION_STORE';
import LoaderPage from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';
import SuccessScreen from '../../components/SuccessScreen';
import {ACCENT_LOTTIE} from '../../utils/LOADING_TYPES';

const EventEditScreen = observer(({navigation}) => {
  React.useEffect(() => {
    const backPress = BackHandler.addEventListener('backPress', onBackPress);

    return () => {
      backPress.remove();
    };
  }, []);

  const onBackPress = () => {
    Alert.alert('', 'Are you sure you want to discard this announcement?', [
      {
        text: 'DISCARD',
        onPress: () => {
          EVENT_EDIT_STORE.clearData();
          navigation.pop();
        },
        style: 'cancel',
      },
      {text: 'KEEP EDITING'},
    ]);
    return true;
  };

  React.useEffect(() => {
    EVENT_EDIT_STORE.setData(EVENT_DESCRIPTION_STORE.getData);
    EVENT_EDIT_STORE.setEventId(EVENT_DESCRIPTION_STORE.getID);
  }, []);

  return (
    <>
      {EVENT_EDIT_STORE.getIsLoading ? (
        <>
          <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
        </>
      ) : (
        <>
          {EVENT_EDIT_STORE.getIsError ? (
            <>
              <ErrorScreen
                errorMessage={EVENT_EDIT_STORE.getErrorText}
                showButton={true}
                fn={() => {
                  EVENT_EDIT_STORE.setIsError(false);
                }}
              />
            </>
          ) : (
            <>
              {EVENT_EDIT_STORE.getIsSuccess ? (
                <>
                  <SuccessScreen
                    fn={() => {
                      EVENT_EDIT_STORE.setSuccess(false);
                      navigation.pop();
                    }}
                  />
                </>
              ) : (
                <>
                  <SafeAreaView style={styles.container}>
                    <EventEditHeader navigation={navigation} />
                    <ScrollView>
                      <EventEditImages navigation={navigation} />
                      <EventEditInput />
                      <EventEditDateTime />
                      <EventEditLinks />
                      <EventEditTags />
                    </ScrollView>
                  </SafeAreaView>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: verticalScale(4),
  },
});

export default EventEditScreen;
