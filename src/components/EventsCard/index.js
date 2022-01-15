import React, {useState, useEffect} from 'react';
import {Text, View, Image, Share, Alert} from 'react-native';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HorizontalPadding, ICON_SIZE} from '../../utils/UI_CONSTANTS';
import {API_GET_IMAGE, NO_IMAGE_URL} from '../../utils/API_CONSTANTS';
import {IconButton} from 'react-native-paper';
import {toggleInterestedApi} from '../../apis/toggleInterested';
import {useToast} from 'react-native-toast-notifications';
import {TOAST_ERROR_MESSAGE} from '../../utils/ERROR_MESSAGES';
import {USER_STORE} from '../../mobx/USER_STORE';
import {STUDENT} from '../../utils/USER_TYPE';
import ImageView from '../ImageView';
import {observer} from 'mobx-react';

const EventsCard = observer(
  ({
    date,
    time,
    name,
    desc,
    eventImage,
    organizer,
    isLive = false,
    wasInterested = false,
    eventId,
    urlId,
  }) => {
    const [interest, setInterest] = useState(false);
    const toast = useToast();

    const showToast = () => {
      toast.show(TOAST_ERROR_MESSAGE, {type: 'danger'});
    };

    useEffect(() => {
      setInterest(wasInterested);
    }, [wasInterested]);

    const [ApiCall, setApiCall] = useState(false);

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

        <View
          style={{
            justifyContent: 'center',
            elevation: 1,
            backgroundColor: colors.Accent,
            ...styles.image,
          }}>
          <ImageView src={API_GET_IMAGE + eventImage} style={styles.image} />
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
            <View
              style={{
                flexDirection: 'row',
                marginTop: verticalScale(0),
              }}>
              {USER_STORE.getUserType === STUDENT ? (
                <IconButton
                  onPress={() => {
                    setApiCall(true);
                    toggleInterestedApi(
                      eventId,
                      () => {
                        setApiCall(false);
                        setInterest(!interest);
                      },
                      () => {
                        showToast();
                        setApiCall(false);
                        //failure
                      },
                    );
                  }}
                  color={colors.EventCard_Bookmark}
                  style={styles.icon}
                  icon={interest ? 'bookmark' : 'bookmark-outline'}
                  disabled={ApiCall}
                />
              ) : (
                <></>
              )}

              <IconButton
                onPress={async () => {
                  try {
                    const result = await Share.share({
                      message: `https://nittapp.spider.nitt.edu/event/${urlId}`,
                      url: `https://nittapp.spider.nitt.edu/event/${urlId}`,
                      title: `${name} by ${organizer}`,
                    });
                    if (result.action === Share.sharedAction) {
                      if (result.activityType) {
                        // shared with activity type of result.activityType
                      } else {
                        // shared
                      }
                    } else if (result.action === Share.dismissedAction) {
                      // dismissed
                    }
                  } catch (error) {
                    Alert.alert(error.message);
                  }
                }}
                color={colors.EventCard_ShareIcon}
                style={{...styles.icon, marginLeft: scale(2)}}
                icon={'share-variant'}
                disabled={false}
              />
            </View>
          </View>
        </View>
      </View>
    );
  },
);

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
    marginHorizontal: '6@s',
    marginBottom: '3@vs',
    alignSelf: 'flex-end',
  },
  link: {
    color: colors.Primary,
    fontWeight: '600',
  },
});
