import React, {useRef, useState, useEffect} from 'react';
import {BackHandler, View} from 'react-native';
import {
  moderateScale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import PagerView from 'react-native-pager-view';
import Username from './Username';
import StudentWebmailPassword from './StudentWebmailPassword';
import SetNewPassword from './SetNewPassword';
import ClubEnterOTP from './ClubEnterOTP';

import {observer} from 'mobx-react';
import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';
import SuccessScreen from '../../components/SuccessScreen/index';

const ResetPasswordScreen = observer(({navigation}) => {
  const ref = useRef(PagerView);
  const buttonForwardAction = () => {
    console.log(1);
    ref.current.setPage(Page + 1);
  };
  const buttonBackwardAction = () => {
    ref.current.setPage(Page - 1);
    console.log(0);
  };
  const buttonHomeAction = pg => {
    ref.current.setPage(pg);
    console.log(pg);
  };

  const [Page, setPage] = useState(0);

  //disabling back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <PagerView
      style={{flex: 1}}
      initialPage={0}
      scrollEnabled={false}
      showPageIndicator={false}
      ref={ref}
      onPageSelected={event => {
        setPage(event.nativeEvent.position);
      }}>
      <View style={{flex: 1}} key={1}>
        <Username forward={buttonForwardAction} navigation={navigation} />
      </View>
      {RESET_STORE.getIsStudent ? (
        <>
          <View style={{flex: 1}} key={2}>
            <StudentWebmailPassword
              forwardAction={buttonForwardAction}
              backwardAction={buttonBackwardAction}
              buttonHome={buttonHomeAction}
            />
          </View>
          <View key={3} style={{flex: 1}}>
            <SetNewPassword navigation={navigation} />
          </View>
        </>
      ) : (
        <>
          <View key={2} style={{flex: 1}}>
            <ClubEnterOTP
              forwardAction={buttonForwardAction}
              backwardAction={buttonBackwardAction}
            />
          </View>
          <View key={3} style={{flex: 1}}>
            <SetNewPassword navigation={navigation} />
          </View>
        </>
      )}
    </PagerView>
  );
});

export default ResetPasswordScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.regBackground,
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },
  header: {
    fontSize: '18@s',
    color: colors.FontColor,
    fontWeight: 'bold',
    marginTop: '40@vs',
  },
  title: {
    fontSize: '18@s',
    color: colors.FontColor,
    fontWeight: '500',
    marginTop: '10@vs',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '12@s',
    color: '#555555',
    marginTop: '5@vs',
    textAlign: 'center',
  },
  input: {
    width: '100%',
  },
  loginBtnView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: moderateScale(0),
    paddingTop: verticalScale(9),
  },
});
