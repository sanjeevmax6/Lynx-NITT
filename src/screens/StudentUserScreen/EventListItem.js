import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {listItemStyles} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Tertiary} from '../../utils/colors';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';

const ListItem = ({eventItem, goToEvent}) => {
  const imageUrl = API_GET_IMAGE + eventItem.poster;
  return (
    <TouchableOpacity
      style={listItemStyles.container}
      onPress={() => goToEvent(eventItem)}>
      <View style={listItemStyles.viewStyle}>
        <View style={{...listItemStyles.imageStyle, elevation: 1}}>
          <Image source={{uri: imageUrl}} style={listItemStyles.imageStyle} />
        </View>
        <View style={{flex: 1}}>
          <Text style={listItemStyles.textStyle}>{eventItem.title}</Text>
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
      <View style={listItemStyles.buttonStyles}>
        <TouchableOpacity onPress={() => console.log('Unlist')}>
          <Icon
            name="bookmark"
            size={moderateScale(20)}
            style={{marginEnd: scale(10)}}
            color={Tertiary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
