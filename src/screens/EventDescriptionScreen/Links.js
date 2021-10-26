import React from 'react';

import {Text, View, TouchableOpacity, Linking, Alert} from 'react-native';
import styles from './SharedStyles';
import * as colors from '../../utils/colors';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

const openLink = async url => {
  try {
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: '#453AA4',
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'currentContext',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: 'white',
        secondaryToolbarColor: colors.Secondary,
        navigationBarColor: 'white',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // // Specify full animation resource identifier(package:anim/name)
        // // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        headers: {
          'my-custom-header': 'my custom header value',
        },
      });
      //Alert.alert(JSON.stringify(result));
    } else Linking.openURL(url);
  } catch (error) {
    Alert.alert(error.message);
  }
};

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
                // Linking.openURL(item).catch(err =>
                //   console.error('Invalid URL', err),
                // );
                openLink(item);
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
