import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const cardDimensions = 123;
const SuggestedEventCard = ({
  eventImage = 'https://imagizer.imageshack.com/img922/5549/DWQolC.jpg',
  eventName = 'NA',
  organizer = 'NA',
  isLive = false,
}) => {
  return (
    <View style={styles.card}>
      {isLive ? (
        <View
          style={{
            position: 'absolute',
            elevation: 1,
            right: scale(3),
            top: verticalScale(3),
          }}>
          <Icon
            name="circle"
            color={colors.EventCard_IsLive}
            size={scale(10)}
          />
        </View>
      ) : (
        <></>
      )}

      <Image source={{uri: eventImage}} style={styles.image} />
      <Text numberOfLines={1} style={styles.title}>
        {eventName}
      </Text>
      <Text numberOfLines={1} style={styles.organizer}>
        {organizer}
      </Text>
    </View>
  );
};

export default SuggestedEventCard;

const styles = ScaledSheet.create({
  card: {
    height: scale(cardDimensions + 40),
    width: scale(cardDimensions),
    backgroundColor: colors.EventCard_Back,
    alignItems: 'center',
    marginBottom: '9@vs',
    borderRadius: '8@s',
    elevation: 1,
  },
  image: {
    width: scale(cardDimensions),

    height: scale(cardDimensions),
    borderRadius: '8@s',
  },
  title: {
    color: colors.EventCard_Title,
    fontSize: '14@s',
    fontWeight: 'bold',
    width: '90%',
    textAlign: 'justify',
  },
  organizer: {
    color: colors.GRAY_DARK,
    fontSize: '12@s',
    flex: 1,
    width: '90%',
  },
});
