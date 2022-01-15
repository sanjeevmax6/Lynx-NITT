import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import ImageView from '../../components/ImageView';
import {ANNOUNCEMENT_DETAILS_STORE} from '../../mobx/ANNOUNCEMENT_DETAILS_STORE';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {observer} from 'mobx-react';
import {getFormatedDate} from 'react-native-modern-datepicker';
import {getFormattedTime} from '../../utils/helperFunction/getFormattedTime';
import {NO_IMAGE_URL} from '../../utils/API_CONSTANTS';

const CreatorDetails = observer(() => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: scale(HorizontalPadding),
        paddingTop: verticalScale(HorizontalPadding),
        alignItems: 'center',
      }}>
      <ImageView src={NO_IMAGE_URL} style={styles.image} />
      <View style={{marginHorizontal: scale(10)}}>
        <Text>{'NA'}</Text>
        <Text>{'NA'} Followers</Text>
        <Text style={styles.time}>
          {getFormatedDate(ANNOUNCEMENT_DETAILS_STORE.getData.createdAt)} |{' '}
          {getFormattedTime(ANNOUNCEMENT_DETAILS_STORE.getData.createdAt)}
        </Text>
      </View>
    </View>
  );
});

export default CreatorDetails;

const styles = StyleSheet.create({
  image: {
    height: scale(60),
    width: scale(60),
    borderRadius: scale(30),
  },

  time: {
    fontSize: scale(14),
    fontWeight: '500',
  },
});
