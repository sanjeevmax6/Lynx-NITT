/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
    backgroundColor: 'tomato',
    margin: moderateScale(5),
    marginHorizontal: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileItemText: {
    padding: moderateScale(20),
    fontSize: 16,
  },
  deleteItem: {
    padding: moderateScale(5),
    borderRadius: 20,
    right: scale(20),
    position: 'absolute',
    backgroundColor: 'white',
  },
});

export default FileItem;
