/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as color from '../../utils/colors';

const FileItem = ({item, deleteItem}) => {
  return (
    <View style={styles.fileItem}>
      <Text style={styles.fileItemText}>{item.name}</Text>
      <TouchableOpacity
        style={styles.deleteItem}
        onPress={() => deleteItem(item.uri)}>
        <MaterialCommunityIcons name="trash-can" color="red" size={23} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fileItem: {
    flex: 1,
    borderRadius: moderateScale(10),
    backgroundColor: color.GRAY_MEDIUM,
    marginVertical: verticalScale(1),
    marginHorizontal: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileItemText: {
    padding: moderateScale(10),
    fontSize: 14,
  },
  deleteItem: {
    padding: moderateScale(5),
    borderRadius: moderateScale(20),
    right: scale(20),
    position: 'absolute',
    backgroundColor: 'white',
  },
});

export default FileItem;
