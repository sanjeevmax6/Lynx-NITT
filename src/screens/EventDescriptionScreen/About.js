import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import sharedStyles from './SharedStyles';

const About = ({about, startDate, endDate, startTime, endTime}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [numOfLines, setNumOfLines] = useState(0);
  const NO_OF_LINES = 3;

  const onModalToggle = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <View style={{...sharedStyles.fragment, backgroundColor: colors.WHITE}}>
        <Text
          style={{
            fontSize: scale(14),
            lineHeight: verticalScale(25),
            fontWeight: '300',
          }}>
          {about}
        </Text>
        {numOfLines > NO_OF_LINES && (
          <View>
            <TouchableOpacity onPress={onModalToggle}>
              <Text
                style={{
                  paddingVertical: verticalScale(4),
                  fontWeight: 'bold',
                  color: colors.Tertiary,
                  fontSize: scale(12),
                }}>
                See More
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        style={{
          ...sharedStyles.fragment,
          backgroundColor: colors.WHITE,
          paddingTop: 0,
          borderRadius: verticalScale(20),
          borderColor: colors.GRAY_LIGHT,
          borderWidth: 1,
          elevation: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: verticalScale(15),
            paddingHorizontal: scale(15),
          }}>
          <Text style={styles.eventText}>Event Starts</Text>
          <Text style={styles.eventText}>Event Ends</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: verticalScale(6),
            paddingHorizontal: scale(15),
          }}>
          <Text style={styles.eventTime}>{startTime}</Text>
          <Text style={styles.eventTime}>{endTime}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: verticalScale(15),
            paddingHorizontal: scale(15),
          }}>
          <Text style={styles.eventTime}>{startDate}</Text>
          <Text style={styles.eventTime}>{endDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default About;

const styles = ScaledSheet.create({
  eventText: {
    color: colors.GRAY_DARK,
    fontSize: '14@s',
  },
  eventTime: {
    color: colors.BLACK,
    fontSize: '12@s',
  },
});
