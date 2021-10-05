import React from 'react';

import {Text, View, TouchableOpacity, Linking} from 'react-native';
import styles from './SharedStyles';
import * as colors from '../../utils/colors';

const Links = ({links}) => {
  return (
    <View style={{...styles.fragment, backgroundColor: colors.WHITE}}>
      <Text style={styles.title}>Links</Text>
      <View style={{}}>
        {links.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                Linking.openURL(item).catch(err =>
                  console.error('Invalid URL', err),
                );
              }}>
              <Text style={styles.url} ellipsizeMode="tail" numberOfLines={1}>
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
