import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import * as c from '../../utils/colors';

const AcademicSearchCard = ({title, desc}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardDetails}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </View>
  );
};

export default AcademicSearchCard;

const styles = ScaledSheet.create({
  card: {
    marginTop: '5@msr',
    marginBottom: '5@msr',
    display: 'flex',
    flexDirection: 'column',
  },
  cardDetails: {
    flexGrow: 1,
    margin: '5@s',
    justifyContent: 'space-around',
  },
  title: {
    marginBottom: '3@s',
    color: c.Primary,
    fontSize: '20@msr',
    fontWeight: 'bold',
  },
  desc: {},
});