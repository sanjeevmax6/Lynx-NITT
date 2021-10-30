import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HeaderHeight, HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {TabVisibility} from '../../redux/reducers/bottomNav';
import {useDispatch} from 'react-redux';

import {SafeAreaView} from 'react-native-safe-area-context';
const WIDTH = Dimensions.get('window').width;
const EventsCreationScreenHeader = ({navigation, isValid}) => {
  const dispatch = useDispatch();

  function toggleTab(tabShow) {
    dispatch(TabVisibility(tabShow));
  }

  return (
    <SafeAreaView style={styles.header}>
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
      <View style={{marginLeft: scale(5), width: HeaderHeight / 1.6}}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0,
    height: verticalScale(HeaderHeight),
    shadowColor: color.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 6,
    zIndex: 6,
    backgroundColor: color.WHITE,
    width: WIDTH,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    alignSelf: 'center',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  twoButtonLeft: {
    alignSelf: 'flex-start',
    flex: 0,
  },
  twoButtonRight: {},
});

export default EventsCreationScreenHeader;
