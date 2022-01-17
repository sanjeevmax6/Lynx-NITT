import React, {useState} from 'react';
import {Dimensions, View, Pressable} from 'react-native';
import {Card, Paragraph, Button, Image, Text} from 'react-native-paper';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import * as colors from '../../utils/colors';
import {USER_STORE} from '../../mobx/USER_STORE';
import * as USER_TYPE from '../../utils/USER_TYPE';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';
import {observer} from 'mobx-react';
import {EVENT_DESCRIPTION_STORE} from '../../mobx/EVENT_DESCRIPTION_STORE';
import {toggleFollowApi} from '../../apis/followUnfollowApi';
import {useToast} from 'react-native-toast-notifications';
import {TOAST_ERROR_MESSAGE} from '../../utils/ERROR_MESSAGES';
import EventStatusTag from './EventStatusTag';

const WIDTH = Dimensions.get('window').width;

const ClubCard = observer(({name, imgID, navigation, clubID}) => {
  const toast = useToast();

  const showToast = () => {
    toast.show(TOAST_ERROR_MESSAGE, {type: 'danger'});
  };
  const [ApiCall, setApiCall] = useState(false);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Pressable
        onPress={() => {
          navigation.push('ClubDescription', {
            ClubId: clubID,
            fromEventScreen: true,
          });
        }}>
        <Card.Cover
          source={{uri: API_GET_IMAGE + imgID.trim()}}
          style={styles.image}
        />
      </Pressable>
      <View style={styles.cardDetails}>
        <Pressable
          onPress={() => {
            navigation.push('ClubDescription', {
              ClubId: clubID,
              fromEventScreen: true,
            });
          }}>
          <Text numberOfLines={2} style={styles.title}>
            {name}
          </Text>
        </Pressable>
        <Text style={styles.followers}>
          {EVENT_DESCRIPTION_STORE.getData.club.followers} FOLLOWERS
        </Text>
      </View>
      {USER_STORE.getUserType === USER_TYPE.STUDENT ? (
        <Button
          mode="outlined"
          disabled={ApiCall}
          loading={ApiCall}
          onPress={() => {
            setApiCall(true);

            toggleFollowApi(
              clubID,
              () => {
                //success callback
                if (EVENT_DESCRIPTION_STORE.getIsFollowingClub) {
                  EVENT_DESCRIPTION_STORE.setDecrementFollower();
                } else {
                  EVENT_DESCRIPTION_STORE.setIncrementFollower();
                }
                EVENT_DESCRIPTION_STORE.setIsFollowingClub(
                  !EVENT_DESCRIPTION_STORE.getIsFollowingClub,
                );
                setApiCall(false);
              },
              () => {
                //failure callback
                showToast();
                setApiCall(false);
              },
            );
          }}
          color={colors.EventDescriptionScreen_Follow}
          labelStyle={{fontSize: scale(10), padding: 0, fontWeight: 'bold'}}
          style={{alignSelf: 'center'}}>
          {EVENT_DESCRIPTION_STORE.getIsFollowingClub ? 'Following' : 'Follow'}
        </Button>
      ) : null}
    </View>
  );
});

export default ClubCard;

const styles = ScaledSheet.create({
  image: {
    marginTop: '5@s',
    width: '80@s',
    marginBottom: '5@s',
    marginRight: '5@s',
    height: '80@s',
    borderRadius: '40@s',
    elevation: 1,
    shadowColor: 'black',
  },
  title: {
    color: colors.EventCard_Title,
    fontSize: '16@s',
    fontWeight: 'bold',
  },
  cardDetails: {
    flexGrow: 1,
    width: 0,
    margin: '5@s',
    marginRight: 0,
    justifyContent: 'center',
    marginRight: '5@s',
  },
  followers: {
    color: colors.Tertiary,
    fontSize: scale(10),
    fontWeight: 'bold',
    marginBottom: '3@vs',
  },
});
