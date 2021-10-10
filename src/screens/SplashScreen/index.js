import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import * as Animatable from 'react-native-animatable';

import {switchIsLoading} from '../../redux/reducers/splashScreen';
import {useDispatch, useSelector} from 'react-redux';

import store from '../../redux/store';
import {Button} from 'react-native-paper';

import * as Colors from '../../utils/colors';

const SplashScreen = () => {
  const dispatch = useDispatch();

  function onEndNavigate() {
    dispatch(switchIsLoading(false));
  }
  return (
    <Animatable.View
      // delay={5000}
      animation="fadeInUp"
      useNativeDriver={true}
      duration={5000}
      onAnimationEnd={onEndNavigate}
      style={styles.container}>
      <Text> NIT Trichy </Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.StatusBar,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
});

export default SplashScreen;
