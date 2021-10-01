import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Linking,
  Image,
  ScrollView,
} from 'react-native';
import {FAB, Text, Button, Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import EventsCard from '../../components/EventsCard';
import {SafeAreaView} from 'react-native-safe-area-context';

const ClubDescription = ({
  clubIcon,
  clubName,
  clubFollowerCount,
  clubDetail,
  clubDescription,
  isFollowing,
  urlLinkedin,
  urlInsta,
  urlWeb,
  urlFb,
  eventList,
}) => {
  const openLink = choice => {
    switch (choice) {
      case 1:
        Linking.openURL(urlWeb);
        break;

      case 2:
        Linking.openURL(urlInsta);
        break;
      case 3:
        Linking.openURL(urlLinkedin);
        break;
      case 4:
        Linking.openURL(urlFb);
        break;
      default:
    }
  };

  const clubIcon1 = clubIcon == '' ? '../../assests/images/user.png' : clubIcon;
  const followText = isFollowing ? 'Following' : 'Follow';
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.card, {borderColor: color.Secondary}]}>
        <View style={styles.cardContent}>
          {clubIcon != '' ? (
            <Image
              style={[styles.image, styles.imageContent]}
              source={{uri: clubIcon}}
            />
          ) : (
            <Image
              style={[styles.image, styles.imageContent]}
              source={require('../../assests/images/user.png')}
            />
          )}
        </View>
      </View>
      <View>
        <View style={[styles.textView]}>
          <Text style={styles.headerText}>{clubName}</Text>
          <Text style={styles.itemDesc}>{clubDescription}</Text>
          <View style={styles.iconStyle}>
            <Icon
              name="people-outline"
              size={moderateScale(17.5)}
              color={color.GRAY_MEDIUM}
            />
            <Text style={styles.itemText}>{clubFollowerCount} followers</Text>
          </View>
        </View>

        <View>
          <Button
            mode="outlined"
            uppercase={false}
            onPress={() => {}}
            labelStyle={styles.moreText}
            style={[isFollowing ? styles.buttonSelect : styles.buttonUnSelect]}>
            {followText}
          </Button>
        </View>
        <View>
          <View style={styles.line} />
          <View style={styles.textView}>
            <Text style={styles.aboutHeader}>About</Text>
            <Text numberOfLines={4} style={[styles.aboutText, styles.header]}>
              {clubDetail}
            </Text>
          </View>
        </View>

        <View style={styles.icon}>
          <TouchableOpacity style={styles.iconTouch} onPress={() => {}}>
            <Icon
              name="globe-outline"
              size={moderateScale(25)}
              onPress={() => {
                openLink(1);
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconTouch} onPress={() => {}}>
            <Icon
              name="logo-instagram"
              size={moderateScale(25)}
              color="purple"
              onPress={() => {
                openLink(2);
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconTouch} onPress={() => {}}>
            <Icon
              name="logo-linkedin"
              size={moderateScale(25)}
              color="lightblue"
              onPress={() => {
                openLink(3);
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconTouch} onPress={() => {}}>
            <Icon
              name="logo-facebook"
              size={moderateScale(25)}
              color="blue"
              onPress={() => {
                openLink(4);
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        <Text style={[styles.aboutHeader, {marginLeft: scale(5)}]}>
          Upcoming Events :
        </Text>

        <View>
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            data={eventList}
            renderItem={({item}) => (
              <EventsCard
                date={item.date}
                time={item.time}
                name={item.name}
                desc={item.desc}
                eventImage={item.eventImage}
                location={item.location}
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ClubDescription;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },

  clubIcon: {
    borderRadius: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: scale(100),
    marginLeft: scale(5),
    height: verticalScale(100),
  },

  textView: {
    justifyContent: 'flex-start',
    marginLeft: scale(5),
    flexDirection: 'column',
    paddingLeft: scale(4),
    paddingRight: scale(25),
  },
  iconStyle: {
    flexDirection: 'row',
    paddingRight: scale(5),
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: scale(15),
  },
  iconTouch: {
    paddingRight: scale(10),
  },

  headerText: {
    fontSize: scale(16),
    fontWeight: 'bold',
  },

  aboutHeader: {
    fontSize: scale(12),
    fontWeight: 'bold',
  },

  itemDesc: {
    fontSize: scale(14),
    color: color.BLACK,
  },
  header: {
    marginTop: verticalScale(7),
  },
  line: {
    borderBottomColor: color.GRAY_MEDIUM,
    paddingTop: verticalScale(6),
    borderBottomWidth: scale(3),
    paddingBottom: verticalScale(2),
  },
  item: {
    flex: 1,
    marginLeft: scale(13),
    justifyContent: 'center',
    flexDirection: 'column',
  },

  itemText: {
    fontSize: scale(13),
    color: color.GRAY_DARK,
  },

  aboutText: {
    fontSize: scale(12),
    paddingTop: verticalScale(0),
    marginTop: verticalScale(1),
    marginBottom: verticalScale(6),
    textAlign: 'justify',
  },

  imageView: {
    marginTop: verticalScale(5),
    flexDirection: 'column',
    marginLeft: scale(5),
  },
  moreText: {
    fontSize: scale(12),
    color: color.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: moderateScale(7),
    color: color.BLACK,
    borderRadius: moderateScale(10),
    width: scale(100),
    flexWrap: 'wrap',
    height: verticalScale(40),
  },
  buttonSelect: {
    marginTop: verticalScale(5),
    height: verticalScale(40),
    width: scale(120),
    marginLeft: scale(5),
    borderWidth: scale(2),
    borderColor: color.Secondary,
    color: color.Secondary,
    backgroundColor: color.WHITE,
  },
  buttonUnSelect: {
    marginTop: verticalScale(5),
    backgroundColor: color.Secondary,
    color: color.BLACK,
    marginLeft: scale(5),
    width: scale(100),
  },
  formContent: {
    flexDirection: 'row',
    marginTop: verticalScale(30),
  },

  card: {
    height: null,
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(2),

    flexDirection: 'column',
    borderTopWidth: verticalScale(70),
  },
  cardContent: {
    flexDirection: 'row',
    marginLeft: scale(10),
  },
  imageContent: {
    marginTop: verticalScale(-50),
  },

  image: {
    width: scale(80),
    height: verticalScale(80),
    borderRadius: moderateScale(40),
  },
});
