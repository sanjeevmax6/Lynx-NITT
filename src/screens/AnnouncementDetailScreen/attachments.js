import React from 'react';
import {Text, View, TouchableOpacity, Linking, FlatList} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const DATA = {
  link: ['https://docs.google.com/forms/u/0/'],
};

const Attachments = () => {
  return (
    <View>
      <View style={styles.fragment}>
        <Text style={styles.linkTitle}>Attachments</Text>
        <FlatList
          data={DATA.link}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(item).catch(err =>
                  console.error('Invalid URL', err),
                );
              }}>
              <Text style={styles.url} numberOfLines={1} ellipsizeMode={'tail'}>
                {item}
              </Text>
            </TouchableOpacity>
          )}></FlatList>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  fragment: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: scale(HorizontalPadding),
  },
  linkTitle: {
    fontWeight: 'bold',
    fontSize: '16@s',
  },
  url: {
    color: colors.Primary,
    fontSize: '12@s',
  },
});

export default Attachments;
