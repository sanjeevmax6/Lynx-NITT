import React from 'react';
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';
import {listItemStyles} from '../StudentUserScreen/styles';
import * as colors from '../../utils/colors';
import {API_GET_IMAGE} from '../../utils/API_CONSTANTS';
import ImageView from '../../components/ImageView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {toggleSubscriptionApi} from '../../apis/subUnsubClub';
import {useToast} from 'react-native-toast-notifications';
import {TOAST_ERROR_MESSAGE} from '../../utils/ERROR_MESSAGES';
import {scale} from 'react-native-size-matters';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';
import {observer} from 'mobx-react';

const ListItem = observer(({clubItem, goToClub}) => {
  const imageUrl = API_GET_IMAGE + clubItem.clubId.profilePic;
  const [busy, setBusy] = React.useState(false);

  const toast = useToast();

  const onSuccess = () => {
    setBusy(false);
    STUDENT_DETAILS_STORE.toggleClubSubscription(clubItem.clubId._id);
  };

  const onFailure = () => {
    setBusy(false);
    toast.show(TOAST_ERROR_MESSAGE, {type: 'danger'});
  };

  const onBellPress = () => {
    setBusy(true);
    toggleSubscriptionApi(clubItem.clubId._id, onSuccess, onFailure);
  };

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
      <View style={{...listItemStyles.buttonStyles, right: scale(5)}}>
        {busy ? (
          <ActivityIndicator color={colors.Accent} size={28} />
        ) : (
          <TouchableOpacity disabled={busy} onPress={onBellPress}>
            <MaterialCommunityIcons
              name={clubItem.isSubscribed ? 'bell' : 'bell-outline'}
              size={28}
              color={colors.Accent}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
});

export default ListItem;
