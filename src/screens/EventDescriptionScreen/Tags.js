import React from 'react';
import * as colors from '../../utils/colors';
import {Chip} from 'react-native-paper';
import {Text, View} from 'react-native';
import styles from './SharedStyles';
import {scale, verticalScale} from 'react-native-size-matters';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {INTERESTED_EVENTS_PROFILE} from '../../utils/screenNames';

const Tags = ({tags, navigation, route}) => {
  return (
    <View style={{...styles.fragment, backgroundColor: colors.WHITE}}>
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
                  // route.params.fromScreen !== INTERESTED_EVENTS_PROFILE
                  //   ?
                  navigation.navigate('Search', {
                    screen: 'SearchScreen',
                    params: {
                      screen: 'Tags',
                      params: {searchText: item},
                    },
                  });
                  // : null;
                }}
                textStyle={{
                  fontSize: scale(12),
                  color: colors.EventDescriptionScreen_TagText,
                }}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {item.toLowerCase()}
              </Chip>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Tags;
