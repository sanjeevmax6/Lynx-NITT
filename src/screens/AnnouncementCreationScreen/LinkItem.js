/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as colors from '../../utils/colors';

const LinkItem = ({item, deleteItem}) => {
  return (
    <View style={styles.linkItem}>
      <Text style={styles.linkItemText}>{item}</Text>
      <TouchableOpacity
        style={styles.deleteItem}
        onPress={() => deleteItem(item)}>
        <MaterialCommunityIcons
          name="trash-can"
          color={colors.CreationScreen_IconTrashCan}
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  linkItem: {
    flex: 1,
    backgroundColor: colors.CreationScreen_LinkItemBg,
    margin: moderateScale(5),
    marginHorizontal: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkItemText: {
    padding: moderateScale(10),
    fontSize: 14,
    color: colors.CreationScreen_LinkItemText,
    textDecorationLine: 'underline',
  },
  deleteItem: {
    padding: moderateScale(5),
    borderRadius: 20,
    right: scale(20),
    position: 'absolute',
    backgroundColor: colors.CreationScreen_DeleteItemBg,
  },
});

export default LinkItem;
