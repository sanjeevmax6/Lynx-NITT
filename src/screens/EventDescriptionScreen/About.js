import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import sharedStyles from './SharedStyles';

const About = ({about, date, time}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [numOfLines, setNumOfLines] = useState(0);
  const NO_OF_LINES = 3;

  const onTextLayout = e => {
    if (numOfLines == 0) setNumOfLines(e.nativeEvent.lines.length);
  };

  const onModalToggle = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalText}>{about}</Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.openButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={sharedStyles.fragment}>
        <Text style={sharedStyles.title}>About</Text>
        <Text
          style={{fontSize: scale(12)}}
          onTextLayout={onTextLayout}
          numberOfLines={
            numOfLines == 0
              ? null
              : numOfLines > NO_OF_LINES
              ? NO_OF_LINES
              : numOfLines
          }>
          {about}
        </Text>
        {numOfLines > NO_OF_LINES && (
          <View>
            <TouchableOpacity onPress={onModalToggle}>
              <Text style={sharedStyles.url}>See More</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={sharedStyles.fragment}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            style={{paddingHorizontal: scale(10)}}
            name="calendar-o"
            color={colors.EventDescriptionScreen_CalendarIcon}
            size={scale(20)}
          />
          <Text style={styles.eventDate}>
            {date} | {time}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default About;

const styles = ScaledSheet.create({
  modalView: {
    marginVertical: scale(12),
    marginHorizontal: scale(8),
    height: (2.3 * Dimensions.get('window').height) / 3,
    backgroundColor: colors.EventDescriptionScreen_ModalView,
    opacity: 0.99,
    borderRadius: scale(20),
    padding: scale(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  modalText: {
    marginBottom: scale(15),
    letterSpacing: 0.7,
    color: 'white',
    fontSize: scale(16),
  },
  openButton: {
    borderRadius: scale(20),
    padding: scale(10),
    elevation: 2,
    backgroundColor: colors.EventDescriptionScreen_Button,
    marginTop: 5,
  },
  textStyle: {
    color: 'white',
    fontSize: scale(15),
    paddingHorizontal: scale(18),
    textAlign: 'center',
  },
  eventDate: {
    fontSize: '14@s',
    marginHorizontal: '10@s',
    fontWeight: 'bold',
  },
});
