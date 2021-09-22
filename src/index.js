import React, {Component} from 'react';
import Navigator from './navigation';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import * as color from './utils/colors';

import {Provider} from 'react-redux';
import store from './redux/store';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export default App;
// const theme = {
//   ...DefaultTheme,

//   colors: {
//     ...DefaultTheme.colors,
//     primary: color.Primary,
//     accent: color.Secondary,
//   },
// };

// export default function Main() {
//   return (
//     <PaperProvider theme={theme}>
//       <App />
//     </PaperProvider>
//   );
// }
