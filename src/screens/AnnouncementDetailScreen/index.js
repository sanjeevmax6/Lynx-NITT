import React from 'react';
import {SafeAreaView, Text, View, Animated, ScrollView} from 'react-native';
import ClubAnnounce from './ClubAnnounce';
import Images from './Images';
import {Divider} from 'react-native-paper';
import Announcement from './Announcement';
import Attachments from './attachments';
import Header from './header';
import {ScaledSheet, verticalScale, scale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {HorizontalPadding, HeaderHeight} from '../../utils/UI_CONSTANTS';

const AnnouncementDetailScreen = ({route, navigation}) => {
  const {data} = route.params;
  return (
    <SafeAreaView>
      <Header navigation={navigation} />
      <Images url={data.url} navigation={navigation} />
      <Divider style={styles.divider} />
      <ClubAnnounce
        organizer={data.organizer}
        url={data.organizerUrl}
        time={data.time}
        followers={data.organizerFollower}
      />
      <Divider style={styles.divider} />
      <Announcement description={data.description} />
      <Divider style={styles.divider} />
      <Attachments links={data.links} />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  divider: {
    height: '2@vs',
    backgroundColor: colors.GRAY_MEDIUM,
  },
});
export default AnnouncementDetailScreen;
