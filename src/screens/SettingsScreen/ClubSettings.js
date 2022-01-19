import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const ClubSettings = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Club/Admin settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClubSettings;
