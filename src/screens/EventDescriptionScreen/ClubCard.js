import React from 'react';
import {Dimensions, View} from 'react-native';
import {Card, Paragraph, Button} from 'react-native-paper';
import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
const WIDTH = Dimensions.get('window').width;
const ClubCard = ({name, imgURL, isFollowing}) => {
  return (
    <Card style={{marginVertical: verticalScale(10)}}>
      <View style={styles.card}>
        <Card.Cover source={{uri: imgURL}} style={styles.clubImg} />
        <Card.Content>
          <View>
            <Paragraph style={styles.clubtitle}>{name}</Paragraph>
          </View>
        </Card.Content>
        <Card.Actions>
          <View>
            <Button
              mode="outlined"
              color={colors.EventDescriptionScreen_Follow}>
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          </View>
        </Card.Actions>
      </View>
    </Card>
  );
};

export default ClubCard;

const styles = ScaledSheet.create({
  clubImg: {
    width: '100@msr',
    height: '100@msr',
    marginVertical: '5@vsr',
  },
  clubtitle: {
    width: WIDTH * 0.35,
    fontWeight: 'bold',
    fontSize: '14@s',
    marginVertical: '40@vs',
  },
  card: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
