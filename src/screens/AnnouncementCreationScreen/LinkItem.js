/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as colors from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const LinkItem = ({item, deleteItem}) => {
  return (
    <View style={styles.linkItem}>
      <Text style={styles.linkItemText}>{item}</Text>
      <TouchableOpacity
        style={styles.deleteItem}
        onPress={() => deleteItem(item)}>
        <MaterialCommunityIcons
          name="trash-can"
          color={colors.Tertiary}
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
    marginVertical: moderateScale(1),
    marginHorizontal: scale(HorizontalPadding),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  linkItemText: {
    padding: moderateScale(10),
    fontSize: scale(14),
    color: colors.CreationScreen_LinkItemText,
    fontWeight: '500',
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
