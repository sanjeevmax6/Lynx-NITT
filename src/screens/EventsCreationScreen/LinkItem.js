/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as color from '../../utils/colors';

const LinkItem = ({item, deleteItem}) => {
  return (
    <View style={styles.linkItem}>
      <Text style={styles.linkItemText}>{item}</Text>
      <TouchableOpacity
        style={styles.deleteItem}
        onPress={() => deleteItem(item)}>
        <MaterialCommunityIcons name="trash-can" color="red" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  linkItem: {
    flex: 1,
    backgroundColor: color.GRAY_MEDIUM,
    marginVertical: moderateScale(1),
    marginHorizontal: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  linkItemText: {
    padding: moderateScale(10),
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  deleteItem: {
    padding: moderateScale(5),
    borderRadius: 20,
    right: scale(20),
    position: 'absolute',
    backgroundColor: 'white',
  },
});

export default LinkItem;
