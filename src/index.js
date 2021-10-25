import React, {Component} from 'react';
import Navigator from './navigation';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import * as color from './utils/colors';
import {Provider} from 'react-redux';
import store from './redux/store';
import CustomStatusBar from './components/statusBar';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CustomStatusBar />
        <Navigator />
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
