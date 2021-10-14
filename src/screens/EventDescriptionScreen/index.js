import React from 'react';
import {Text, View, ScrollView, SafeAreaView} from 'react-native';
import {Divider} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import Images from './Images';
import About from './About';
import Tags from './Tags';
import Links from './Links';
import ClubCard from './ClubCard';
import * as colors from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
const EventDescriptionScreen = ({route, navigation}) => {
  const {data} = route.params;
  return (
    <View>
    <SafeAreaView>
      <ScrollView>
        <Images images={data.images} navigation={navigation} />
        <Divider style={styles.divider} />

        <Text style={styles.eventName}>{data.title}</Text>
        <Divider style={styles.divider} />

        <ClubCard
          name={data.organizer.name}
          imgURL={data.organizer.imgURL}
          isFollowing={data.organizer.isFollowing}
          navigation={navigation}
        />
        <Divider style={styles.divider} />

        <About about={data.description} date={data.dates} time={data.time} />
        <Divider style={styles.divider} />
        <Links links={data.links} />
        <Divider style={styles.divider} />
        <Tags tags={data.tags} navigation={navigation} />
      </ScrollView>
      </SafeAreaView>
    </View>
  );
};

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
    height: '2@vs',
    backgroundColor: colors.GRAY_LIGHT,
  },
});
