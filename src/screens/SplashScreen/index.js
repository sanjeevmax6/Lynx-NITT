import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import * as color from '../../utils/colors';
import * as Animatable from 'react-native-animatable';
import {switchIsLoading} from '../../redux/reducers/splashScreen';
import {useDispatch, useSelector} from 'react-redux';

import store from '../../redux/store';
import {updateToken} from '../../redux/reducers/loginScreen';

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {TabVisibility} from '../../redux/reducers/bottomNav';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const dispatch = useDispatch();

  function onEndNavigate() {
    dispatch(TabVisibility(true));
    dispatch(switchIsLoading(false));
  }
  const getToken = () => {
    AsyncStorage.getItem('user_token').then(value =>
      value != null
        ? dispatch(updateToken(value))
        : dispatch(updateToken(null)),
    );
  };

  let logo = require('../../assests/images/nitt_logo.png');
  const opacityLogo = useRef(new Animated.Value(0)).current;
  const opacityText = useRef(new Animated.Value(0)).current;
  const opacityEmpty = useRef(new Animated.Value(0)).current;
  const opacityEnd = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    getToken();
    Animated.stagger(1000, [
      Animated.timing(opacityEmpty, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacityLogo, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacityText, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacityEnd, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onEndNavigate();
    });
  });

  return (
    <View style={styles.container}>
      <Animatable.View
        style={{
          opacity: opacityEmpty,
          width: scale(0),
          height: verticalScale(0),
        }}></Animatable.View>
      <Animatable.View
        style={{
          marginBottom: verticalScale(10),
          opacity: opacityLogo,
        }}>
        <Image style={styles.image} source={logo}></Image>
      </Animatable.View>
      <Animatable.View
        style={{
          opacity: opacityText,
        }}>
        <Text style={styles.text}>NIT-T APP</Text>
      </Animatable.View>
      <Animatable.View
        style={{
          opacity: opacityEnd,
          width: scale(0),
          height: verticalScale(0),
        }}></Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: color.spashScreenBackground,
    alignItems: 'center',
  },
  text: {
    fontSize: scale(20),
    margin: moderateScale(15),
    lineHeight: verticalScale(30),
    color: color.FontColor,
    textAlign: 'center',
  },
  image: {
    width: moderateScale(150),
    height: moderateScale(150),
  },
});

export default SplashScreen;
