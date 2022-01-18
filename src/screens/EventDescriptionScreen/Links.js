import React from 'react';

import {Text, View, TouchableOpacity, Linking, Alert} from 'react-native';
import styles from './SharedStyles';
import * as colors from '../../utils/colors';

import {verticalScale} from 'react-native-size-matters';
import {openLink} from '../../utils/helperFunction/openLink';

const Links = ({links}) => {
  return (
    <View
      style={{
        ...styles.fragment,
        backgroundColor: colors.WHITE,
        paddingTop: verticalScale(10),
      }}>
      <View style={{}}>
        {links.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // Linking.openURL(item).catch(err =>
                //   console.error('Invalid URL', err),
                // );
                openLink(item);
              }}>
              <Text
                numberOfLines={1}
                style={{...styles.url, textAlign: 'center'}}
                ellipsizeMode="tail">
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default Links;
