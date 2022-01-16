import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {scale} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import ImageView from '../ImageView';

const AnnouncementsCard = ({imageUrl, title, senderName}) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.imageView}>
          <ImageView
            style={styles.clubIcon}
            PlaceholderContent={<ActivityIndicator color={color.Secondary} />}
            src={imageUrl}
            resizeMode={'center'}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.headerText}>{title}</Text>
          <Text style={styles.itemText}>{senderName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AnnouncementsCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(10),
    margin: scale(3),
    padding: scale(5),
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    backgroundColor: color.GRAY_MEDIUM,
  },

  clubIcon: {
    borderRadius: scale(25),
    justifyContent: 'center',
    width: scale(50),
    marginLeft: scale(5),
    height: scale(50),
  },

  headerText: {
    fontSize: scale(12),
    fontWeight: 'bold',
  },

  item: {
    flex: 1,
    marginLeft: scale(13),
    justifyContent: 'center',
    flexDirection: 'column',
  },

  itemText: {
    fontSize: scale(12),
  },

  imageView: {
    justifyContent: 'center',
  },
});
