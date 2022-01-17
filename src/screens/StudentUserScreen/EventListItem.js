import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {listItemStyles} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Tertiary} from '../../utils/colors';
import * as colors from '../../utils/colors';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';
import ImageView from '../../components/ImageView';

const ListItem = ({eventItem, goToEvent}) => {
  const imageUrl = API_GET_IMAGE + eventItem.poster;

  return (
    <TouchableOpacity
      style={listItemStyles.container}
      onPress={() => goToEvent(eventItem)}>
      <View style={listItemStyles.viewStyle}>
        <ImageView
          src={imageUrl}
          style={listItemStyles.imageStyle}
          resizeMode={'center'}
        />
        <View style={{flex: 1}}>
          <Text style={listItemStyles.textStyle} numberOfLines={2}>
            {eventItem.title}
          </Text>
          <Text
            style={{
              ...listItemStyles.textStyle,
              fontSize: moderateScale(14),
              fontWeight: 'normal',
              marginTop: verticalScale(2),
            }}>
            {eventItem.clubName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
