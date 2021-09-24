import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {Button, Card, Paragraph} from 'react-native-paper';
import * as colors from '../utils/colors';

const ClubCard = ({clubImage, clubTitle, type, desc}) => {
  return (
    <SafeAreaView>
      <Card>
        <View style={styles.container}>
          <Card.Cover
            source={{
              uri: clubImage,
            }}
            style={styles.clubImg}
          />
          <Card.Content>
            <Paragraph style={styles.clubName}>{clubTitle}</Paragraph>
          </Card.Content>
          <Card.Content>
            <Paragraph style={styles.type}>{type}</Paragraph>
            <Paragraph style={styles.description}>{desc}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined" color={colors.Primary} style={styles.btn}>
              FOLLOW
            </Button>
          </Card.Actions>
        </View>
      </Card>
    </SafeAreaView>
  );
};

ClubCard.defaultProps = {
  clubTitle: 'SPIDER R&D',
  clubImage:
    'https://media-exp1.licdn.com/dms/image/C510BAQF2qwmDE5B4UA/company-logo_200_200/0/1544248160311?e=2159024400&v=beta&t=g3fZgTrVPgM5pF_BYGaZW2InTI26WLfsFv4UOe0afew',
  type: 'Techinal Club',
  desc: 'Spider, the Research and Development Club of NIT Trichy is a group of people enthusiastic about technology and innovation.',
};

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  clubName: {
    fontSize: '20@msr',
    marginTop: '10@msr',
    textAlign: 'center',
  },
  clubImg: {
    width: '100@msr',
    height: '150@msr',
  },
  type: {
    color: colors.GRAY_DARK,
    margin: '10@msr',
    textAlign: 'center',
  },
  description: {
    fontSize: '15@msr',
    marginBottom: '30@msr',
    textAlign: 'center',
  },
  btn: {
    width: '150@msr',
  },
});

export default ClubCard;
