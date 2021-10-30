import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Button} from 'react-native-paper';
import * as color from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HeaderHeight, HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {TabVisibility} from '../../redux/reducers/bottomNav';
import {useDispatch} from 'react-redux';

const EventsCreationScreenHeader = ({navigation, isValid}) => {
  const dispatch = useDispatch();

  function toggleTab(tabShow) {
    dispatch(TabVisibility(tabShow));
  }

  return (
    <View style={styles.header}>
      <View style={styles.twoButtonLeft}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('', 'Are you sure you want to discard this event?', [
              {
                text: 'DISCARD',
                onPress: () => {
                  toggleTab(true);
                  navigation.goBack();
                },
                style: 'cancel',
              },
              {text: 'KEEP EDITING', onPress: () => console.log('OK Pressed')},
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
      <Text style={styles.headerText}>Create Event</Text>
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
            else {
              //toggleTab(true); To be enabled after implementing save
            }
          }}
          style={styles.button}>
          <Icon
            name="check"
            size={HeaderHeight / 1.6}
            color={color.Green}
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
    backgroundColor: color.WHITE,
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

export default EventsCreationScreenHeader;
