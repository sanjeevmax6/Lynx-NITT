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
  }, []);

  return (
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
