import React, {useState} from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {listItemStyles} from './styles';
import * as colors from '../../utils/colors';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';

import {toggleFollowApi} from '../../apis/followUnfollowApi';
import ImageView from '../../components/ImageView';
import {useToast} from 'react-native-toast-notifications';
import {TOAST_ERROR_MESSAGE} from '../../utils/ERROR_MESSAGES';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';
import {getAllStudentDetails} from './apiCalls';

const ListItem = ({clubItem, goToClub, refreshFlat}) => {
  const [follow, setFollow] = useState(true);
  const [apiCall, setApiCall] = useState(false);
  const imageUrl = API_GET_IMAGE + clubItem.clubId.profilePic;

  const toast = useToast();

  const showToast = () => {
    toast.show(TOAST_ERROR_MESSAGE, {type: 'danger'});
  };

  return (
    <TouchableOpacity
      style={listItemStyles.container}
      onPress={() => goToClub(clubItem)}>
      <View style={listItemStyles.viewStyle}>
        <ImageView
          src={imageUrl}
          style={listItemStyles.imageStyle}
          resizeMode={'center'}
        />
        <Text numberOfLines={2} style={listItemStyles.textStyle}>
          {clubItem.clubId.name}
        </Text>
      </View>
      <View style={listItemStyles.buttonStyles}>
        {/* <Button
          mode={'outlined'}
          disabled={apiCall}
          loading={apiCall}
          color={colors.Tertiary}
          compact={false}
          onPress={() => {
            setApiCall(true);
            toggleFollowApi(
              clubItem.clubId._id,
              () => {
                // getAllStudentDetails(true);
                refreshFlat(true);
                setApiCall(false);
                if (follow) {
                  STUDENT_DETAILS_STORE.removeFollowingClub(clubItem);
                } else {
                  STUDENT_DETAILS_STORE.addFollowingClub(clubItem);
                }
                setFollow(!follow);
              },
              () => {
                showToast();
                setApiCall(false);
              },
            );
          }}>
          {follow ? 'Following' : 'Follow'}
        </Button> */}
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
