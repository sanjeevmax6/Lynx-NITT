import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import * as c from '../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const EventsCard = ({date, time, name, desc, eventImage, location}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{uri: eventImage || '../assests/images/spider.png'}}
        style={styles.image}
      />
      <View style={styles.cardDetails}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.desc}>{desc}</Text>
        <Text style={styles.date}>
          {date} | {time}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.location}>{location}</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.icon} onPress={() => {}}>
              <Icon
                name="bookmark-o"
                color={c.iconInActiveColor}
                size={scale(20)}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={() => {}}>
              <Icon
                name="share-alt"
                color={c.iconInActiveColor}
                size={scale(20)}
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
    marginTop: '5@msr',
    marginBottom: '5@msr',
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    margin: '5@s',
    width: '100@s',
    height: '100@s',
    borderRadius: '8@s',
  },
  cardDetails: {
    flexGrow: 1,
    margin: '5@s',
    justifyContent: 'space-around',
  },

  title: {
    marginBottom: '3@s',
    color: c.Primary,
    fontSize: '20@msr',
    fontWeight: 'bold',
  },
  desc: {},
  date: {
    fontWeight: 'bold',
    color: c.Secondary,
  },
  location: {
    color: c.GRAY_DARK,
  },
  icon: {
    paddingHorizontal: '10@s',
    paddingBottom: '10@s',
    alignSelf: 'flex-end',
  },
  link: {
    color: c.Primary,
    fontWeight: '600',
  },
});
