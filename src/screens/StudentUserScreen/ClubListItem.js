import React from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

import {listItemStyles} from './styles';

const ListItem = ({clubItem, goToClub}) => {
  return (
    <TouchableOpacity
      style={listItemStyles.container}
      onPress={() => goToClub(clubItem)}>
      <View style={listItemStyles.viewStyle}>
        <Image
          source={{uri: clubItem.clubIconUrl}}
          style={listItemStyles.imageStyle}
        />
        <Text style={listItemStyles.textStyle}>{clubItem.clubName}</Text>
      </View>
      <View style={listItemStyles.buttonStyles}>
        <Button
          mode={'outlined'}
          color={'crimson'}
          compact={false}
          onPress={() => console.log('unfollow')}>
          UNFOLLOW
        </Button>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
