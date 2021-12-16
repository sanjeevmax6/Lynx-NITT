import React from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

import {listItemStyles} from './styles';
import * as colors from '../../utils/colors';

const ListItem = ({clubItem, goToClub}) => {
  return (
    <TouchableOpacity
      style={listItemStyles.container}
      onPress={() => goToClub(clubItem)}>
      <View style={listItemStyles.viewStyle}>
        <View style={{...listItemStyles.imageStyle, elevation: 1}}>
          <Image
            source={{uri: clubItem.clubIconUrl}}
            style={listItemStyles.imageStyle}
          />
        </View>
        <Text numberOfLines={2} style={listItemStyles.textStyle}>
          {clubItem.clubName}
        </Text>
      </View>
      <View style={listItemStyles.buttonStyles}>
        <Button
          mode={'outlined'}
          color={colors.Tertiary}
          compact={false}
          onPress={() => console.log('unfollow')}>
          UNFOLLOW
        </Button>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
