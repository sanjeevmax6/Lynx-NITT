import React from 'react';
import {Chip} from 'react-native-paper';
import {Text, View} from 'react-native';
import styles from './SharedStyles';
import {scale, verticalScale} from 'react-native-size-matters';
const Tags = ({tags}) => {
  return (
    <View style={styles.fragment}>
      <Text style={styles.title}>Tags</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {tags.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                margin: scale(5),
              }}>
              <Chip
                style={{height: verticalScale(30)}}
                onPress={() => console.log('Pressed')}
                textStyle={{fontSize: scale(12)}}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {item}
              </Chip>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Tags;
