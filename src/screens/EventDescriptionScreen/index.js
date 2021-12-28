import React, {useEffect} from 'react';
import {Text, View, ScrollView, SafeAreaView} from 'react-native';
import {Divider} from 'react-native-paper';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import Images from './Images';
import About from './About';
import Tags from './Tags';
import Links from './Links';
import ClubCard from './ClubCard';
import Header from './header';
import * as colors from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {EVENT_DESCRIPTION_STORE} from '../../mobx/EVENT_DESCRIPTION_STORE';
import {eventDescriptionAPI} from './eventDescriptionAPI';
import LoaderPage from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';
import {observer} from 'mobx-react';
import {ACCENT_LOTTIE} from '../../utils/LOADING_TYPES';
import moment from 'moment';
import {NO_IMAGE_URL} from '../../utils/API_CONSTANTS';

const EventDescriptionScreen = observer(({route, navigation}) => {
  const {data} = route.params;
  //console.log('Event Description Card' + JSON.stringify(data));
  EVENT_DESCRIPTION_STORE.setID(data.EventId);
  //console.log(EVENT_DESCRIPTION_STORE.getID);

  var DATA;
  //API Call for getting event by EVENT ID
  useEffect(() => {
    eventDescriptionAPI();
  }, []);

  //console.log(EVENT_DESCRIPTION_STORE.getSuccess);
  if (EVENT_DESCRIPTION_STORE.getSuccess) {
    DATA = EVENT_DESCRIPTION_STORE.getData.events;
    //console.log('Data from Event Description index.js:' + JSON.stringify(DATA));
  }

  return (
    <View style={{backgroundColor: colors.EventDescriptionScreen_Back}}>
      <SafeAreaView>
        {EVENT_DESCRIPTION_STORE.getLoading ? (
          <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
        ) : EVENT_DESCRIPTION_STORE.getError ? (
          <ErrorScreen
            errorMessage={EVENT_DESCRIPTION_STORE.getErrorText}
            fn={() => {
              EVENT_DESCRIPTION_STORE.setErrorText('');
              EVENT_DESCRIPTION_STORE.setError(false);
              eventDescriptionAPI();
            }}
          />
        ) : (
          <ScrollView>
            <Images images={DATA.photos} navigation={navigation} />
            <Divider style={styles.divider} />

            <Text style={styles.eventName}>{data.Title}</Text>
            <Divider style={styles.divider} />
            <View style={{marginHorizontal: scale(3)}}>
              <ClubCard
                name={data.Club.clubName}
                // imgURL={data[0].organizer.imgURL}
                imgURL={NO_IMAGE_URL}
                isFollowing={DATA.student_interest}
                followers={DATA.club_followers}
                navigation={navigation}
              />
            </View>
            <Divider style={styles.divider} />

            <About
              about={data.Description}
              startDate={moment(
                new Date(data.startDate).toLocaleString(),
              ).format('DD-MM-YYYY')}
              startTime={moment(
                new Date(data.startDate).toLocaleString(),
              ).format('hh:mm A')}
              endDate={moment(new Date(data.endDate).toLocaleString()).format(
                'DD-MM-YYYY',
              )}
              endTime={moment(new Date(data.endDate).toLocaleString()).format(
                'hh:mm A',
              )}
            />
            <Divider style={styles.divider} />
            <Links links={DATA.links} />
            <Divider style={styles.divider} />
            <Tags tags={DATA.tags} navigation={navigation} />
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
});

export default EventDescriptionScreen;
const styles = ScaledSheet.create({
  eventName: {
    fontSize: '18@s',
    paddingTop: '10@vs',
    paddingBottom: '10@vs',
    paddingHorizontal: HorizontalPadding,
    fontWeight: 'bold',
    backgroundColor: colors.WHITE,

    color: colors.EventDescriptionScreen_Title,
  },
  divider: {
    // marginTop: '10@vs',
    height: '0.5@vs',
    backgroundColor: colors.GRAY_LIGHT,
  },
});
