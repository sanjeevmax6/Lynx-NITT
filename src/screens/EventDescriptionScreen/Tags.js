import React from 'react';
import * as colors from '../../utils/colors';
import {Chip} from 'react-native-paper';
import {Text, View} from 'react-native';
import styles from './SharedStyles';
import {scale, verticalScale} from 'react-native-size-matters';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const Tags = ({tags, navigation}) => {
  return (
    <View style={{...styles.fragment, backgroundColor: colors.WHITE}}>
      <Text style={styles.title}>Tags</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {tags.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                //backgroundColor: 'red',
                marginBottom: scale(HorizontalPadding),
                marginRight: scale(HorizontalPadding),
                marginLeft: 0,
              }}>
              <Chip
                style={{
                  backgroundColor: colors.EventDescriptionScreen_TagBackGround,
                  marginTop: verticalScale(3),
                }}
                onPress={() => {
                  navigation.navigate('Search', {
                    screen: 'Tags',
                    params: {searchText: item},
                  });
                }}
                textStyle={{
                  fontSize: scale(12),
                  color: colors.EventDescriptionScreen_TagText,
                }}
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
