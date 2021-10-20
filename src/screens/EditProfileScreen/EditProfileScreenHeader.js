import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HeaderHeight} from '../../utils/UI_CONSTANTS';

const EditProfileScreenHeader = ({navigation, isValid}) => {
  return (
    <View style={styles.header}>
      <View style={styles.twoButtonLeft}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('', 'Are you sure you want to discard changes?', [
              {
                text: 'DISCARD',
                onPress: () => navigation.goBack(),
                style: 'cancel',
              },
              {
                text: 'KEEP EDITING',
                onPress: () => console.log('OK Pressed'),
              },
            ]);
          }}
          style={styles.button}>
          <Icon
            name="close"
            size={HeaderHeight / 1.6}
            color={color.Tertiary}
            style={{marginLeft: scale(5)}}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerText}>Edit Profile</Text>
      <View style={styles.twoButtonRight}>
        <TouchableOpacity
          onPress={() => {
            console.log('Create pressed');
            if (!isValid)
              Alert.alert('', 'The text entered exceeds the maximum length', [
                {
                  text: 'KEEP EDITING',
                  onPress: () => console.log('OK Pressed'),
                },
              ]);
          }}
          style={styles.button}>
          <Icon
            name="check"
            size={HeaderHeight / 1.6}
            color="#3e863e"
            style={{marginRight: scale(5)}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: verticalScale(HeaderHeight),
    shadowColor: color.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 6,
    zIndex: 6,
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonTextTheme: {
    fontSize: 16,
    marginLeft: scale(10),
    color: color.WHITE,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  twoButtonLeft: {},
  twoButtonRight: {},
});

export default EditProfileScreenHeader;