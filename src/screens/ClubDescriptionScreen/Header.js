import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {observer} from 'mobx-react';
import * as colors from '../../utils/colors';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';

import {Card, Paragraph, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import ImageColors from 'react-native-image-colors';
import {HorizontalPadding, ICON_SIZE_LARGE} from '../../utils/UI_CONSTANTS';
import {CLUB_DESCRIPTION_STORE} from '../../mobx/CLUB_DESCRIPTION_STORE';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';
import {toggleFollowApi} from '../../apis/followUnfollowApi';

const Header = observer(
  ({
    name,
    followers,
    url,
    email,
    description,
    navigation,
    facebook,
    instagram,
    linkedIn,
    web,
    medium,
  }) => {
    const [coverColor, setCoverColor] = useState('');
    const [ApiCall, setApiCall] = useState(false);

    const openLink = choice => {
      switch (choice) {
        case 1:
          web.length != 0
            ? Linking.openURL(web)
            : Linking.openURL('https://spider.nitt.edu/');
          break;
        case 2:
          instagram.length != 0
            ? Linking.openURL(instagram)
            : Linking.openURL('https://www.instagram.com/');
          break;
        case 3:
          linkedIn.length != 0
            ? Linking.openURL(linkedIn)
            : Linking.openURL('https://www.linkedin.com/');
          break;
        case 4:
          facebook.length != 0
            ? Linking.openURL(facebook)
            : Linking.openURL('https://www.facebook.com/');
          break;
        case 5:
          medium.length != 0
            ? Linking.openURL(medium)
            : Linking.openURL('https://medium.com/');
          break;
        default:
      }
    };

    const getColors = async () => {
      const result = await ImageColors.getColors(url, {
        fallback: colors.primary,
        cache: true,
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

    getColors().then(res => {
      setCoverColor(res.cover);
    });

    return coverColor === colors.Tertiary ? (
      <SafeAreaView>
        <View>
          <Text>LOADING</Text>
        </View>
      </SafeAreaView>
    ) : (
      <View style={{backgroundColor: colors.WHITE}}>
        <View
          style={{
            backgroundColor: coverColor,
            height: verticalScale(81),
          }}></View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ImageScreen', {imgUrl: API_GET_IMAGE + url});
          }}>
          <View style={styles.imageView}>
            <Image
              source={{
                uri: API_GET_IMAGE + url || '../../assests/images/spider.png',
              }}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            paddingTop: verticalScale(12),
            marginHorizontal: scale(HorizontalPadding),
            paddingBottom: verticalScale(10),
          }}>
          <Text style={styles.name}>{name}</Text>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL('mailto:' + email);
            }}>
            <Text style={styles.email}>{email}</Text>
          </TouchableOpacity>

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
                  setApiCall(false);
                  CLUB_DESCRIPTION_STORE.setIsFollowingClub(
                    !CLUB_DESCRIPTION_STORE.getIsFollowingClub,
                  );
                },
                () => {
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
            <TouchableOpacity
              style={styles.iconTouch}
              onPress={() => {
                openLink(1);
              }}>
              <Icon
                style={styles.icon}
                color={colors.ClubDescriptionScreen_ICON}
                name="globe-outline"
                size={moderateScale(ICON_SIZE_LARGE)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconTouch}
              onPress={() => {
                openLink(2);
              }}>
              <Icon
                name="logo-instagram"
                size={moderateScale(ICON_SIZE_LARGE)}
                style={styles.icon}
                color={colors.ClubDescriptionScreen_ICON}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconTouch}
              onPress={() => {
                openLink(3);
              }}>
              <Icon
                name="logo-linkedin"
                size={moderateScale(ICON_SIZE_LARGE)}
                color={colors.ClubDescriptionScreen_ICON}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconTouch}
              onPress={() => {
                openLink(4);
              }}>
              <Icon
                name="logo-facebook"
                size={moderateScale(ICON_SIZE_LARGE)}
                color={colors.ClubDescriptionScreen_ICON}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconTouch}
              onPress={() => {
                openLink(5);
              }}>
              <Entypo
                name="medium"
                size={moderateScale(ICON_SIZE_LARGE)}
                color={colors.ClubDescriptionScreen_ICON}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  },
);

export default Header;

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
  },
  numbers: {
    color: colors.WHITE,
    fontSize: '18@s',
    fontWeight: 'bold',
  },
  name: {
    fontSize: '18@s',
    fontWeight: 'bold',
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
  },
});
