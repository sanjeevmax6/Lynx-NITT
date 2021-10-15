import React from 'react';
import {Dimensions, View, TouchableOpacity} from 'react-native';
import {Card, Paragraph, Button, Image, Text} from 'react-native-paper';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import * as colors from '../../utils/colors';
const WIDTH = Dimensions.get('window').width;
const ClubCard = ({
  name,
  imgURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAD1BMVEUJAAAACAkJAAUBCQABAAk/Y8DWAAAA/0lEQVR4nO3QNwEAIBAAsaf414yHW1gSCZlpTrOa2+wmljhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx8vXkAW0liTrVxGJyAAAAAElFTkSuQmCC',
  isFollowing,
  followers = 1008,
  navigation,
}) => {
  return (
    <View style={{flexDirection: 'row', paddingHorizontal: HorizontalPadding}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ClubDescription');
        }}>
        <Card.Cover source={{uri: imgURL}} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.cardDetails}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ClubDescription');
          }}>
          <Text numberOfLines={2} style={styles.title}>
            {name}
          </Text>
        </TouchableOpacity>
        <Text style={styles.followers}>{followers} FOLLOWERS</Text>
        <Button
          mode="outlined"
          color={colors.EventDescriptionScreen_Follow}
          labelStyle={{fontSize: scale(10), padding: 0, fontWeight: 'bold'}}
          style={{alignSelf: 'baseline'}}>
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </View>
    </View>
  );
};

export default ClubCard;

const styles = ScaledSheet.create({
  image: {
    marginTop: '5@s',
    width: '100@s',
    marginBottom: '5@s',
    marginRight: '5@s',
    height: '100@s',
    borderRadius: '8@s',
    elevation: 1,
    shadowColor: 'black',
  },
  title: {
    color: colors.EventCard_Title,
    fontSize: '16@s',
    fontWeight: 'bold',
  },
  cardDetails: {
    flexGrow: 1,
    width: 0,
    margin: '5@s',
    marginRight: 0,
    justifyContent: 'center',
    //backgroundColor: 'red',
  },
  followers: {
    color: colors.Tertiary,
    fontSize: scale(10),
    fontWeight: 'bold',
    marginBottom: '3@vs',
  },
});
