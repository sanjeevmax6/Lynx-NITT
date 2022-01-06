import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HorizontalPadding, ICON_SIZE} from '../../utils/UI_CONSTANTS';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';

const EventsCard = ({
  date,
  time,
  name,
  desc,
  eventImage,
  organizer,
  isLive = false,
}) => {
  return (
    <View style={styles.card}>
      {isLive ? (
        <View
          style={{
            position: 'absolute',
            paddingHorizontal: scale(3),
            flexDirection: 'row',
            right: scale(9),
            top: verticalScale(1),
            borderRadius: scale(18),
            alignItems: 'center',
          }}>
          <Icon
            name="circle"
            color={colors.EventCard_IsLive}
            size={scale(10)}
          />
          <Text
            style={{
              fontSize: scale(9),
              color: colors.GRAY_DARK,
              fontWeight: 'bold',
            }}>
            {' '}
            LIVE
          </Text>
        </View>
      ) : (
        <></>
      )}

      <View style={{justifyContent: 'center'}}>
        <Image
          source={{
            uri: API_GET_IMAGE + eventImage || '../assests/images/spider.png',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.cardDetails}>
        <Text numberOfLines={2} style={styles.title}>
          {name}
        </Text>
        <Text style={styles.desc} numberOfLines={1} ellipsizeMode={'tail'}>
          {desc}
        </Text>
        <Text numberOfLines={1} style={styles.date}>
          {date} | {time}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text numberOfLines={1} style={styles.organizer}>
            {organizer}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.icon} onPress={() => {}}>
              <Icon
                name="turned-in-not"
                color={colors.EventCard_Bookmark}
                size={scale(ICON_SIZE)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.icon, paddingRight: 0}}
              onPress={() => {}}>
              <Icon
                name="share"
                color={colors.EventCard_ShareIcon}
                size={scale(ICON_SIZE)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventsCard;

const styles = ScaledSheet.create({
  card: {
    marginVertical: '3@vs',
    display: 'flex',
    flexDirection: 'row',
    padding: scale(HorizontalPadding),
    backgroundColor: colors.EventCard_Back,
    borderRadius: '8@s',
    elevation: 1,
  },
  image: {
    width: '100@s',
    marginRight: '5@s',
    height: '100@s',
    borderRadius: '8@s',
  },
  cardDetails: {
    flexGrow: 1,
    width: 0,
    justifyContent: 'space-evenly',
    marginHorizontal: scale(5),
    //backgroundColor: 'red',
  },

  title: {
    marginBottom: '3@vs',
    color: colors.EventCard_Title,
    fontSize: '14@s',
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  desc: {fontSize: '12@s', fontWeight: '500', textAlign: 'justify'},
  date: {
    fontWeight: '500',
    fontSize: '12@s',
    color: colors.EventCard_Date,
  },
  organizer: {
    color: colors.GRAY_DARK,
    fontSize: '12@s',
    flex: 1,
  },
  icon: {
    paddingHorizontal: '10@s',
    paddingBottom: '7@vs',
    alignSelf: 'flex-end',
  },
  link: {
    color: colors.Primary,
    fontWeight: '600',
  },
});
