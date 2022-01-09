// import React, {useEffect} from 'react';
// import {View, Text, Dimensions, StyleSheet} from 'react-native';
// import LottieView from 'lottie-react-native';
// import lottieFile from '../../res/lottieFiles/loginBackGround.json';
// import {ACCENT_LOTTIE} from '../../utils/LOADING_TYPES';
// import {getStatusBarHeight} from 'react-native-status-bar-height';

// export const SuccessPage = ({buttonHome}) => {
//   const height2 = 737.1;
//   const screenHeight =
//     Dimensions.get('window').height - getStatusBarHeight(true);
//   function getHeight(height) {
//     return Math.floor((height * screenHeight) / height2);
//   }

//   useEffect(() => {
//     timeOutPage();
//   }, []);

//   const timeOutPage = () => {
//     setTimeout(function () {
//       buttonHome();
//     }, 2000);
//   };
//   return (
//     <View style={styles.container}>
//       <LottieView
//         style={{
//           marginTop: getHeight(85),
//         }}
//         resizeMode="contain"
//         source={lottieFile}
//         progress={1}
//         autoPlay
//         loop
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });
