import React, {useState} from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {listItemStyles} from './styles';
import * as colors from '../../utils/colors';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';

import {toggleFollowApi} from '../../apis/followUnfollowApi';
import ImageView from '../../components/ImageView';

const ListItem = ({clubItem, goToClub}) => {
  const [Follow, setFollow] = useState(true);
  const [ApiCall, setApiCall] = useState(false);
  const imageUrl = API_GET_IMAGE + clubItem.clubId.profilePic;
  return (
    <TouchableOpacity
      style={listItemStyles.container}
      onPress={() => goToClub(clubItem)}>
      <View style={listItemStyles.viewStyle}>
        <View style={{...listItemStyles.imageStyle, elevation: 1}}>
          <ImageView src={imageUrl} style={listItemStyles.imageStyle} />
        </View>
        <Text numberOfLines={2} style={listItemStyles.textStyle}>
          {clubItem.clubId.name}
        </Text>
      </View>
      <View style={listItemStyles.buttonStyles}>
        <Button
          mode={'outlined'}
          disabled={ApiCall}
          loading={ApiCall}
          color={colors.Tertiary}
          compact={false}
          onPress={() => {
            setApiCall(true);
            toggleFollowApi(
              clubItem._id,
              () => {
                setApiCall(false);
                setFollow(!Follow);
              },
              () => {
                setApiCall(false);
              },
            );
          }}>
          {Follow ? 'Following' : 'Follow'}
        </Button>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
