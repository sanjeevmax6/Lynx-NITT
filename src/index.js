import React, {Component} from 'react';
import Navigator from './navigation';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import * as color from './utils/colors';
import {Provider} from 'mobx-react';
import CustomStatusBar from './components/statusBar';
import {ToastProvider} from 'react-native-toast-notifications';
import {scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class App extends Component {
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
