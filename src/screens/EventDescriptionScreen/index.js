import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Divider} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import Images from './Images';
import About from './About';
import Tags from './Tags';
import Links from './Links';
import ClubCard from './ClubCard';
import * as colors from '../../utils/colors';

const EventDescriptionScreen = () => {
  const DATA = {
    title: 'SPIDER WEEK',
    about:
      'The Homebrew Bionics is a community that explores the possibilities of developing open-source, affordable prosthetic devices that are rapidly fabricable. If you are someone who would love to contribute, k',
    links: [
      'https://spider.nitt.edu/',
      'https://spider.nitt.edu/projects/',
      'https://spider.nitt.edu/members/',
    ],
    tags: ['Computer Science', 'Machine Learning', 'Neural Network'],
    images: [
      'https://avatars.githubusercontent.com/u/7608907?s=280&v=4',
      'https://spider.nitt.edu/images/team.jpg',
      'https://inductions.spider.nitt.edu/assets/img/logo.png',
    ],
    date: '28/9/2021',
    time: '15:00',
  };

  const Organizer = {
    name: 'Spider R&D',
    imgURL:
      'https://media-exp1.licdn.com/dms/image/C510BAQF2qwmDE5B4UA/company-logo_200_200/0/1544248160311?e=2159024400&v=beta&t=g3fZgTrVPgM5pF_BYGaZW2InTI26WLfsFv4UOe0afew',
    isFollowing: false,
  };

  return (
    <View>
      <ScrollView>
        <Images images={DATA.images} />
        <Text style={styles.eventName}>{DATA.title}</Text>
        <ClubCard
          name={Organizer.name}
          imgURL={Organizer.imgURL}
          isFollowing={Organizer.isFollowing}
        />
        <About about={DATA.about} date={DATA.date} time={DATA.time} />
        <Divider style={styles.divider} />
        <Links links={DATA.links} />
        <Divider style={styles.divider} />
        <Tags tags={DATA.tags} />
      </ScrollView>
    </View>
  );
};

export default EventDescriptionScreen;
const styles = ScaledSheet.create({
  eventName: {
    fontSize: '28@s',
    paddingTop: '40@vs',
    paddingBottom: '20@vs',
    paddingLeft: '8@msr',
    fontWeight: '900',
    color: colors.EventDescriptionScreen_Title,
  },
  divider: {
    marginTop: '10@vs',
    height: '2@vs',
  },
});
