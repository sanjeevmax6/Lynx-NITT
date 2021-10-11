/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as color from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const FileItem = ({item, deleteItem}) => {
  return (
    <View style={styles.fileItem}>
      <Text style={styles.fileItemText}>{item.name}</Text>
      <TouchableOpacity
        style={styles.deleteItem}
        onPress={() => deleteItem(item.uri)}>
        <MaterialCommunityIcons
          name="trash-can"
          color={color.Accent}
          size={23}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fileItem: {
    flex: 1,
    borderRadius: moderateScale(6),
    backgroundColor: color.Primary,
    marginVertical: verticalScale(1),
    marginHorizontal: scale(HorizontalPadding),
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileItemText: {
    padding: moderateScale(10),
    fontSize: scale(12),
    color: color.WHITE,
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
