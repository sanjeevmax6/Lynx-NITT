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
import {NO_IMAGE_URL} from '../../utils/API_CONSTANTS';

const AnnouncementDetailScreen = ({route, navigation}) => {
  return (
    <SafeAreaView>
      <Images url={NO_IMAGE_URL} navigation={navigation} />
      <Divider style={styles.divider} />
      <ClubAnnounce
        organizer={'fghj'}
        url={'na'}
        time={'2022-01-13T17:40:06.253Z'}
        followers={152}
      />
      <Divider style={styles.divider} />
      <Announcement description={'NA'} />
      <Divider style={styles.divider} />
      <Attachments links={[]} />
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
