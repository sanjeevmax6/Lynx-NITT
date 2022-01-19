import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HorizontalPadding, ICON_SIZE} from '../../utils/UI_CONSTANTS';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';
import {isLive} from '../../utils/helperFunction/isLive';
import {isComplete} from '../../utils/helperFunction/isComplete';
import ImageView from '../ImageView';
import {Chip} from 'react-native-paper';

const EventSearchCard = ({
  date,
  startTime,
  endTime,
  name,
  desc,
  eventImage,
  organizer,
  tags = [],
}) => {
  const d = new Date(date);
  return (
    <View style={styles.card}>
      {isLive(startTime, endTime) ? (
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
        <>
          {isComplete(endTime) ? (
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
              <Icon name="circle" color={colors.CLOSED} size={scale(10)} />
              <Text
                style={{
                  fontSize: scale(9),
                  color: colors.GRAY_DARK,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}>
                {' '}
                Completed
              </Text>
            </View>
          ) : (
            <>
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
                <Icon name="circle" color={colors.UPCOMING} size={scale(10)} />
                <Text
                  style={{
                    fontSize: scale(9),
                    color: colors.GRAY_DARK,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                  {' '}
                  Upcoming
                </Text>
              </View>
            </>
          )}
        </>
      )}
      <ImageView
        src={API_GET_IMAGE + eventImage}
        style={styles.image}
        resizeMode={'cover'}
      />
      <View style={styles.cardDetails}>
        <Text numberOfLines={2} style={styles.title}>
          {name}
        </Text>
        <Text style={styles.desc} numberOfLines={2} ellipsizeMode={'tail'}>
          {desc}
        </Text>
        <Text numberOfLines={1} style={styles.date}>
          {d.toDateString()}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text numberOfLines={1} style={styles.organizer}>
            {organizer}
          </Text>
        </View>
        <View
          style={{
            marginTop: verticalScale(3),
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {tags.map((val, index) => {
            return (
              <Chip
                key={index}
                style={{
                  backgroundColor: colors.EventDescriptionScreen_TagBackGround,
                  marginRight: scale(3),
                  marginTop: verticalScale(3),
                }}
                textStyle={{
                  fontSize: scale(10),
                  color: colors.EventDescriptionScreen_TagText,
                  fontWeight: '300',
                }}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {val.toLowerCase()}
              </Chip>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default EventSearchCard;

const styles = ScaledSheet.create({
  card: {
    marginVertical: '2@vs',
    display: 'flex',
    flexDirection: 'row',
    padding: scale(HorizontalPadding),
    backgroundColor: colors.EventCard_Back,
    borderRadius: '8@s',
    elevation: 1,
    alignItems: 'center',
  },
  image: {
    width: '90@s',
    marginRight: '5@s',
    height: '90@s',
    borderRadius: '8@s',
    elevation: 0,
    backgroundColor: 'white',
  },
  cardDetails: {
    flexGrow: 1,
    width: 0,
    justifyContent: 'space-evenly',
    marginHorizontal: scale(5),
    //backgroundColor: 'red',
  },

  title: {
    marginBottom: '0@vs',
    color: colors.EventCard_Title,
    fontSize: '14@s',
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  desc: {fontSize: '12@s', fontWeight: '500', textAlign: 'justify'},
  date: {
    fontWeight: '400',
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
