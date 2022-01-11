import React, {Component} from 'react';
import Navigator from './navigation';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import * as color from './utils/colors';
import {Provider} from 'mobx-react';
import CustomStatusBar from './components/statusBar';

import PushNotification, {Importance} from 'react-native-push-notification';
import firebase from '@react-native-firebase/app';
import {USER_STORE} from '../src/mobx/USER_STORE';

import {ToastProvider} from 'react-native-toast-notifications';
import {scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


class App extends Component {
  componentDidMount() {
    firebase.initializeApp(this);

    PushNotification.createChannel(
      {
        channelId: 'NITTAPP', // (required)
        channelName: 'EventUpdates', // (required)// (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 5, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
        USER_STORE.setFirebaseToken(token.token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        //call below event descrription screen with event id as notification.data.eventId
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,

      requestPermissions: true,
    });
  }

  render() {
    return (
      <Provider>
        <ToastProvider
          placement="top"
          duration={3500}
          animationType="slide-in"
          offset={verticalScale(50)}
          successColor={color.successColor}
          dangerColor={color.dangerColor}
          warningColor={color.warningColor}
          textStyle={{fontSize: scale(14)}}
          warningIcon={<Icon name="alert-triangle" size={25} color={'white'} />}
          successIcon={<Icon name="check" color={'white'} size={25} />}
          dangerIcon={
            <MaterialIcons name="dangerous" size={25} color={'white'} />
          }
          swipeEnabled={true}>
          <CustomStatusBar />
          <Navigator />
        </ToastProvider>
      </Provider>
    );
  }
}

// export default App;
const LightTheme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    primary: color.Primary,
    accent: color.Secondary,
  },
};

export default function Main() {
  return (
    <PaperProvider theme={LightTheme}>
      <App />
    </PaperProvider>
  );
}
