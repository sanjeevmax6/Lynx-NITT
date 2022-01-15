import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Avatar, Title} from 'react-native-paper';
import {moderateScale, scale, ScaledSheet} from 'react-native-size-matters';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import * as colors from '../../utils/colors';
import ImageView from '../../components/ImageView';

const ClubAnnounce = ({
  organizer,
  url = 'https://media-exp1.licdn.com/dms/image/C510BAQF2qwmDE5B4UA/company-logo_200_200/0/1544248160311?e=2159024400&v=beta&t=g3fZgTrVPgM5pF_BYGaZW2InTI26WLfsFv4UOe0afew',
  navigation,
  time,
  followers = 120,
}) => {
  return (
    <View style={styles.container}>
      <ImageView style={styles.poster} src={url} />
      <View style={styles.info}>
        <Text style={styles.title}>{organizer}</Text>
        <Text style={styles.followers}>{followers} followers</Text>
        <Text style={styles.days}>{time}</Text>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginLeft: scale(HorizontalPadding),
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },

  followers: {
    marginLeft: '10@msr',
    fontSize: '12@s',
  },
  days: {
    marginLeft: '10@msr',
    fontSize: '12@s',
  },
  title: {
    marginLeft: '10@msr',
    fontSize: '14@s',
    fontWeight: 'bold',
  },
  poster: {
    height: '60@s',
    width: '60@s',
    borderRadius: '30@s',
    alignSelf: 'center',
  },
});

export default ClubAnnounce;
