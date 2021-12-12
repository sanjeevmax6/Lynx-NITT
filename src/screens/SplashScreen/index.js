import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import * as color from '../../utils/colors';
import * as Animatable from 'react-native-animatable';

import {useDispatch} from 'react-redux';

import {updateIsStudent, updateToken} from '../../redux/reducers/loginScreen';

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {TabVisibility} from '../../redux/reducers/bottomNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEY_IS_STUDENT, KEY_USER_TOKEN} from '../../utils/API_CONSTANTS';
import {AUTH_NAV_STORE} from '../../mobx/AUTH_NAV_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';

const SplashScreen = () => {
  const dispatch = useDispatch();
  function onEndNavigate() {
    dispatch(TabVisibility(true));
    AUTH_NAV_STORE.setSplashLoading(false);
  }
  const getToken = () => {
    AsyncStorage.getItem(KEY_IS_STUDENT).then(value => {
      if (value != null) {
        if (value == 'true') dispatch(updateIsStudent(true));
        else if (value == 'false') dispatch(updateIsStudent(false));
      } else dispatch(updateToken(null));
    });
    AsyncStorage.getItem(KEY_USER_TOKEN).then(value => {
      if (value != null) {
        dispatch(updateToken(value));
        USER_STORE.setUserToken(value);
      } else {
        dispatch(updateToken(null));
      }
    });
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
