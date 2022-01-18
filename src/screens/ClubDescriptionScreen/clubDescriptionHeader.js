import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
  Pressable,
} from 'react-native';
import {observer} from 'mobx-react';
import * as colors from '../../utils/colors';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';

import {Button, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import ImageColors from 'react-native-image-colors';
import {HorizontalPadding, ICON_SIZE_LARGE} from '../../utils/UI_CONSTANTS';
import {CLUB_DESCRIPTION_STORE} from '../../mobx/CLUB_DESCRIPTION_STORE';
import {API_GET_IMAGE, NO_IMAGE_URL} from '../../utils/API_CONSTANTS';
import {toggleFollowApi} from '../../apis/followUnfollowApi';
import LoaderPage from '../../components/LoadingScreen';
import {ACCENT_LOTTIE} from '../../utils/LOADING_TYPES';
import {EVENT_DESCRIPTION_STORE} from '../../mobx/EVENT_DESCRIPTION_STORE';
import {useToast} from 'react-native-toast-notifications';
import {TOAST_ERROR_MESSAGE} from '../../utils/ERROR_MESSAGES';
import ImageView from '../../components/ImageView';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';
import {FOLLOWING_CLUBS_PROFILE} from '../../utils/screenNames';
import {getAllStudentDetails} from '../StudentUserScreen/apiCalls';
import {openLink} from '../../utils/helperFunction/openLink';

const ClubDescriptionHeader = observer(
  ({name, followers, url, email, description, navigation, route}) => {
    const [coverColor, setCoverColor] = useState('');
    const [ApiCall, setApiCall] = useState(false);
    const toast = useToast();

    const showToast = () => {
      toast.show(TOAST_ERROR_MESSAGE, {type: 'danger'});
    };

    const getColors = async URL => {
      const result = await ImageColors.getColors(URL, {
        fallback: colors.Primary,
        cache: false,
        key: 'unique_key',
      });
      switch (result.platform) {
        case 'android':
          return {cover: result.lightVibrant, icon: result.darkVibrant};

        case 'ios':
          return {cover: result.background, icon: result.primary};

        default:
          return {cover: colors.Primary, icon: colors.Secondary};
      }
    };
    useEffect(() => {
      getColors(url ? API_GET_IMAGE + url : NO_IMAGE_URL).then(res => {
        setCoverColor(res.cover);
        if (route.params.fromScreen === FOLLOWING_CLUBS_PROFILE) {
          if (!CLUB_DESCRIPTION_STORE.getIsFollowingClub) {
            route.params.func(true);
          }
        }
      });
    }, [url]);
    console.log(CLUB_DESCRIPTION_STORE.getID);

    return coverColor === colors.Tertiary ? (
      <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
    ) : (
      <View style={{backgroundColor: colors.WHITE}}>
        <View
          style={{
            backgroundColor: coverColor,
            height: verticalScale(81),
          }}></View>
        <Pressable
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('ImageScreen', {imgUrl: API_GET_IMAGE + url});
          }}>
          <View style={styles.imageView}>
            <ImageView
              src={url ? API_GET_IMAGE + url : NO_IMAGE_URL}
              style={styles.image}
              resizeMode={'cover'}
            />
          </View>
        </Pressable>
        <View
          style={{
            paddingTop: verticalScale(12),
            marginHorizontal: scale(HorizontalPadding),
            paddingBottom: verticalScale(10),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                ...styles.name,
                maxWidth: '90%',
                textTransform: 'uppercase',
              }}>
              {name}
            </Text>

            <IconButton
              onPress={() => {
                Linking.openURL('mailto:' + email);
              }}
              size={20}
              color={colors.Tertiary}
              icon={'message-outline'}
            />
          </View>
          <Text style={styles.followers}>{followers} followers</Text>
          <Text
            style={{
              ...styles.text,
              paddingTop: verticalScale(6),
              paddingBottom: verticalScale(10),
            }}>
            {description}
          </Text>
          <Button
            disabled={ApiCall}
            loading={ApiCall}
            onPress={() => {
              setApiCall(true);
              toggleFollowApi(
                CLUB_DESCRIPTION_STORE.getID,
                () => {
                  getAllStudentDetails(true);
                  setApiCall(false);
                  console.log(
                    'from event: ',
                    CLUB_DESCRIPTION_STORE.getFromEventScreen,
                  );

                  if (CLUB_DESCRIPTION_STORE.getIsFollowingClub) {
                    CLUB_DESCRIPTION_STORE.setDecrementFollower();

                    if (CLUB_DESCRIPTION_STORE.getFromEventScreen)
                      EVENT_DESCRIPTION_STORE.setDecrementFollower();
                  } else {
                    CLUB_DESCRIPTION_STORE.setIncrementFollower();

                    if (CLUB_DESCRIPTION_STORE.getFromEventScreen)
                      EVENT_DESCRIPTION_STORE.setIncrementFollower();
                  }
                  if (route.params.fromScreen === FOLLOWING_CLUBS_PROFILE) {
                    if (CLUB_DESCRIPTION_STORE.getIsFollowingClub) {
                      route.params.func(true);
                    } else {
                      route.params.func(false);
                    }
                  }

                  CLUB_DESCRIPTION_STORE.setIsFollowingClub(
                    !CLUB_DESCRIPTION_STORE.getIsFollowingClub,
                  );

                  if (CLUB_DESCRIPTION_STORE.getFromEventScreen)
                    EVENT_DESCRIPTION_STORE.setIsFollowingClub(
                      CLUB_DESCRIPTION_STORE.getIsFollowingClub,
                    );
                },
                () => {
                  showToast();

                  setApiCall(false);
                },
              );
            }}
            mode="outlined"
            color={colors.EventDescriptionScreen_Follow}
            labelStyle={{fontSize: scale(10), padding: 0, fontWeight: 'bold'}}
            style={{alignSelf: 'baseline'}}>
            {CLUB_DESCRIPTION_STORE.getIsFollowingClub ? 'Following' : 'Follow'}
          </Button>

          <View style={styles.icons}>
            {CLUB_DESCRIPTION_STORE.getData.links.website ? (
              <TouchableOpacity
                style={styles.iconTouch}
                onPress={() => {
                  openLink(CLUB_DESCRIPTION_STORE.getData.links.website.trim());
                }}>
                <Icon
                  style={styles.icon}
                  color={colors.ClubDescriptionScreen_ICON}
                  name="logo-chrome"
                  size={moderateScale(ICON_SIZE_LARGE)}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}

            {CLUB_DESCRIPTION_STORE.getData.links.linkedin ? (
              <TouchableOpacity
                style={styles.iconTouch}
                onPress={() => {
                  openLink(
                    CLUB_DESCRIPTION_STORE.getData.links.linkedin.trim(),
                  );
                }}>
                <Icon
                  style={styles.icon}
                  color={colors.ClubDescriptionScreen_ICON}
                  name="logo-linkedin"
                  size={moderateScale(ICON_SIZE_LARGE)}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            {CLUB_DESCRIPTION_STORE.getData.links.instagram ? (
              <TouchableOpacity
                style={styles.iconTouch}
                onPress={() => {
                  openLink(
                    CLUB_DESCRIPTION_STORE.getData.links.instagram.trim(),
                  );
                }}>
                <Icon
                  style={styles.icon}
                  color={colors.ClubDescriptionScreen_ICON}
                  name="logo-instagram"
                  size={moderateScale(ICON_SIZE_LARGE)}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            {CLUB_DESCRIPTION_STORE.getData.links.facebook ? (
              <TouchableOpacity
                style={styles.iconTouch}
                onPress={() => {
                  openLink(
                    CLUB_DESCRIPTION_STORE.getData.links.facebook.trim(),
                  );
                }}>
                <Icon
                  style={styles.icon}
                  color={colors.ClubDescriptionScreen_ICON}
                  name="logo-facebook"
                  size={moderateScale(ICON_SIZE_LARGE)}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            {CLUB_DESCRIPTION_STORE.getData.links.medium ? (
              <TouchableOpacity
                style={styles.iconTouch}
                onPress={() => {
                  openLink(CLUB_DESCRIPTION_STORE.getData.links.medium.trim());
                }}>
                <Entypo
                  name="medium"
                  size={moderateScale(ICON_SIZE_LARGE + 3)}
                  color={colors.ClubDescriptionScreen_ICON}
                  style={styles.icon}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            {CLUB_DESCRIPTION_STORE.getData.links.youtube ? (
              <TouchableOpacity
                style={styles.iconTouch}
                onPress={() => {
                  openLink(CLUB_DESCRIPTION_STORE.getData.links.youtube.trim());
                }}>
                <Entypo
                  name="youtube"
                  size={moderateScale(ICON_SIZE_LARGE + 2)}
                  color={colors.ClubDescriptionScreen_ICON}
                  style={styles.icon}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
    );
  },
);

export default ClubDescriptionHeader;

const styles = ScaledSheet.create({
  text: {
    fontSize: '14@s',
    color: colors.BLACK,
  },
  imageView: {
    width: '120@s',
    height: '120@s',
    marginTop: '-67@vs',
    borderRadius: '60@s',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(HorizontalPadding),
    elevation: 1,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  image: {
    width: '120@s',
    height: '120@s',
    borderRadius: '60@s',
    justifyContent: 'center',
    borderColor: colors.Primary,
    backgroundColor: 'white',
  },
  numbers: {
    color: colors.WHITE,
    fontSize: '18@s',
    fontWeight: 'bold',
  },
  name: {
    fontSize: '18@s',
    fontWeight: '500',
    color: colors.BLACK,
  },
  email: {
    fontSize: '15@s',
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  icon: {
    paddingLeft: '5@s',
  },
  modalScreen: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.57)',
  },
  followers: {
    color: colors.Tertiary,
    paddingTop: '5@vs',
    fontWeight: 'bold',
  },
  modalView: {
    backgroundColor: colors.WHITE,
    height: '200@vs',
    width: '100%',
    bottom: '0%',
    position: 'absolute',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: scale(15),
    paddingTop: '10@vs',
    alignItems: 'center',
  },
});
