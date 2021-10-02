import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {HorizontalPadding, ICON_SIZE} from '../../utils/UI_CONSTANTS';

const EventsCard = ({date, time, name, desc, eventImage, organizer}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={{justifyContent: 'center'}}>
        <Image
          source={{uri: eventImage || '../assests/images/spider.png'}}
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
                name="bookmark-o"
                color={colors.EventCard_Bookmark}
                size={scale(ICON_SIZE)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.icon, paddingRight: 0}}
              onPress={() => {}}>
              <Icon
                name="share-alt"
                color={colors.EventCard_ShareIcon}
                size={scale(ICON_SIZE)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventsCard;

const styles = ScaledSheet.create({
  card: {
    marginTop: '5@vs',
    marginBottom: '5@vs',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: scale(HorizontalPadding),
    //backgroundColor: 'red',
  },
  image: {
    marginTop: '5@s',
    width: '100@s',
    marginBottom: '5@s',
    marginRight: '5@s',
    height: '100@s',
    borderRadius: '8@s',
  },
  cardDetails: {
    flexGrow: 1,
    width: 0,
    margin: '5@s',
    marginRight: 0,
    justifyContent: 'space-evenly',
    //backgroundColor: 'red',
  },

  title: {
    marginBottom: '3@vs',
    color: colors.EventCard_Title,
    fontSize: '16@s',
    fontWeight: 'bold',
  },
  desc: {fontSize: '12@s'},
  date: {
    fontWeight: 'bold',
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
