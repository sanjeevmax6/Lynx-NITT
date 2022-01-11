import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import ClubDescription from './ClubDescription';
import ClubLogo from './ClubLogo';
import ClubLinks from './ClubLinks';
import {observer} from 'mobx-react';
import {CLUB_REGISTER_STORE} from '../../mobx/CLUB_REGISTER_STORE';
import LoaderPage from '../../components/LoadingScreen';
import {ACCENT_LOTTIE} from '../../utils/LOADING_TYPES';
import ErrorScreen from '../../components/ErrorScreen';
import SuccessScreen from '../../components/SuccessScreen';

const ClubRegistration = observer(() => {
  const ref = useRef(PagerView);

  const buttonForwardAction = () => {
    console.log(1);

    ref.current.setPage(Page + 1);
  };
  const buttonBackwardAction = () => {
    console.log(0);
    CLUB_REGISTER_STORE.setError(false);
    ref.current.setPage(Page - 1);
  };
  const [Page, setPage] = useState(0);

  return (
    <>
      {CLUB_REGISTER_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
      ) : (
        <>
          {CLUB_REGISTER_STORE.getError ? (
            <ErrorScreen />
          ) : (
            <>
              {CLUB_REGISTER_STORE.getSuccess ? (
                <SuccessScreen />
              ) : (
                <PagerView
                  style={styles.pagerView}
                  initialPage={0}
                  scrollEnabled={false}
                  onPageSelected={event => {
                    setPage(event.nativeEvent.position);
                  }}
                  showPageIndicator={false}
                  ref={ref}>
                  <View key="1">
                    <ClubDescription forwardAction={buttonForwardAction} />
                  </View>
                  <View key="2">
                    <ClubLogo
                      forwardAction={buttonForwardAction}
                      backwardAction={buttonBackwardAction}
                    />
                  </View>
                  <View key="3">
                    <ClubLinks backwardAction={buttonBackwardAction} />
                  </View>
                </PagerView>
              )}
            </>
          )}
        </>
      )}
    </>
  );
});

export default ClubRegistration;

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});
