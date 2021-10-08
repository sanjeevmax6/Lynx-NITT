import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

import * as colors from '../../utils/colors';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';

import {Card, Paragraph, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageColors from 'react-native-image-colors';
import {HorizontalPadding, ICON_SIZE_LARGE} from '../../utils/UI_CONSTANTS';

const Header = ({
  name,
  followers,
  url,
  description,
  isFollowing = true,
  navigation,
  facebook = 'https://www.facebook.com/',
  instagram = 'https://www.instagram.com/',
  linkedIn = 'https://www.linkedin.com/',
  web = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
}) => {
  const [coverColor, setCoverColor] = useState('');

  const openLink = choice => {
    switch (choice) {
      case 1:
        Linking.openURL(web);
        break;
      case 2:
        Linking.openURL(instagram);
        break;
      case 3:
        Linking.openURL(linkedIn);
        break;
      case 4:
        Linking.openURL(facebook);
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
          navigation.navigate('ImageScreen', {imgUrl: url});
        }}>
        <Image
          source={{uri: url || '../../assests/images/spider.png'}}
          style={styles.image}
        />
      </TouchableOpacity>
      <View
        style={{
          paddingTop: verticalScale(12),
          marginHorizontal: scale(HorizontalPadding),
          paddingBottom: verticalScale(10),
        }}>
        <Text style={styles.name}>{name}</Text>
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
          mode="outlined"
          color={colors.EventDescriptionScreen_Follow}
          labelStyle={{fontSize: scale(10), padding: 0, fontWeight: 'bold'}}
          style={{alignSelf: 'baseline'}}>
          {isFollowing ? 'Following' : 'Follow'}
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
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = ScaledSheet.create({
  text: {
    fontSize: '14@s',
    color: colors.BLACK,
  },
  image: {
    width: '120@s',
    height: '120@s',
    borderRadius: '60@s',
    justifyContent: 'center',
    borderColor: colors.Primary,
    borderWidth: '1@vs',
    marginTop: '-67@vs',
    marginLeft: scale(HorizontalPadding),
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
    paddingVertical: '0@vs',
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
