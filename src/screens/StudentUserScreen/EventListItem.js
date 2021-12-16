import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {listItemStyles} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Tertiary} from '../../utils/colors';

const ListItem = ({eventItem, goToEvent}) => {
  return (
    <TouchableOpacity
      style={listItemStyles.container}
      onPress={() => goToEvent(eventItem)}>
      <View style={listItemStyles.viewStyle}>
        <View style={{...listItemStyles.imageStyle, elevation: 1}}>
          <Image
            source={{uri: eventItem.images[0]}}
            style={listItemStyles.imageStyle}
          />
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
            {eventItem.organizer.name}
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

        {/* <Button
          mode={'outlined'}
          color={'crimson'}
          compact={false}
          icon="bookmark"
          onPress={() => console.log('Unlist')}
        /> */}
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
