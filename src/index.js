import React, {Component} from 'react';
import Navigator from './navigation';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import * as color from './utils/colors';
import {Provider} from 'mobx-react';
import CustomStatusBar from './components/statusBar';

class App extends Component {
  render() {
    return (
      <Provider>
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
