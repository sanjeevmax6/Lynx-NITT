import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import ImageView from '../../components/ImageView';
import {ANNOUNCEMENT_DETAILS_STORE} from '../../mobx/ANNOUNCEMENT_DETAILS_STORE';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {observer} from 'mobx-react';
import {getFormatedDate} from 'react-native-modern-datepicker';
import {getFormattedTime} from '../../utils/helperFunction/getFormattedTime';
import {API_GET_IMAGE, NO_IMAGE_URL} from '../../utils/API_CONSTANTS';

const CreatorDetails = observer(({navigation}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: scale(HorizontalPadding),
        paddingTop: verticalScale(HorizontalPadding),
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{...styles.image, elevation: 0}}
        onPress={() => {
          navigation.navigate(
            'ClubDescription',
            {ClubId: ANNOUNCEMENT_DETAILS_STORE.getData.club._id},
            {initial: false},
          );
        }}>
        <ImageView
          src={
            API_GET_IMAGE + ANNOUNCEMENT_DETAILS_STORE.getData.club.profilePic
          }
          style={styles.image}
          resizeMode={'cover'}
        />
      </TouchableOpacity>
      <View style={{marginHorizontal: scale(10)}}>
        <Text numberOfLines={3} style={styles.clubName}>
          {ANNOUNCEMENT_DETAILS_STORE.getData.club.name}
        </Text>

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
    height: scale(70),
    width: scale(70),
    borderRadius: scale(35),
  },

  time: {
    fontSize: scale(14),
    fontWeight: '500',
  },
  clubName: {
    fontSize: scale(16),
    fontWeight: 'bold',
    paddingBottom: verticalScale(6),
  },
});
