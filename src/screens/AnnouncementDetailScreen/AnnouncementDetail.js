import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {ANNOUNCEMENT_DETAILS_STORE} from '../../mobx/ANNOUNCEMENT_DETAILS_STORE';
import * as colors from '../../utils/colors';
import Links from '../EventDescriptionScreen/Links';
import {observer} from 'mobx-react';
import Documents from './Documents';

const AnnouncementDetail = observer(() => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {ANNOUNCEMENT_DETAILS_STORE.getData.title}
      </Text>
      <Text style={styles.text}>
        {ANNOUNCEMENT_DETAILS_STORE.getData.description}
      </Text>
      {ANNOUNCEMENT_DETAILS_STORE.getData.links.length > 0 ? (
        <Links links={ANNOUNCEMENT_DETAILS_STORE.getData.links} />
      ) : (
        <></>
      )}
      {ANNOUNCEMENT_DETAILS_STORE.getData.documents.length > 0 ? (
        <Documents docs={ANNOUNCEMENT_DETAILS_STORE.getData.documents} />
      ) : (
        <></>
      )}
      <View style={{height: verticalScale(25)}} />
    </View>
  );
});

export default AnnouncementDetail;

const styles = StyleSheet.create({
  card: {
    elevation: 1,
    borderTopRightRadius: scale(10),
    borderTopLeftRadius: scale(10),
    width: '100%',
    backgroundColor: colors.WHITE,
    padding: moderateScale(9),
    marginTop: verticalScale(10),
  },
  text: {
    fontSize: scale(14),
    lineHeight: verticalScale(25),
    fontWeight: '300',
    paddingTop: verticalScale(9),
    paddingBottom: verticalScale(10),
  },
  title: {
    fontSize: scale(18),
    paddingTop: 0,
    fontWeight: 'bold',
    backgroundColor: colors.WHITE,
    marginTop: verticalScale(0),
    color: colors.EventDescriptionScreen_Title,
  },
});
