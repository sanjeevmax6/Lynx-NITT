import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Divider} from 'react-native-paper';
import {WHITE} from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalContent from '../UserScreen/ModalContent';
import * as color from '../../utils/colors';
import ImageView from '../../components/ImageView';

const StudentUserHeader = ({studentDetails, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalScreen}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={{height: '100%'}} />
          </TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <ModalContent
              ModalVisible={setModalVisible}
              navigation={navigation}
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="menu" size={scale(25)} style={styles.iconStyle} />
      </TouchableOpacity>
      <View style={styles.userStyle}>
        <View style={{...styles.imageStyle, elevation: 1}}>
          <ImageView
            style={styles.imageStyle}
            src={studentDetails.coverPhotoUri}
            resizeMode="cover"
          />
        </View>
        <View style={styles.detailsBorder}>
          <View style={styles.textBorder}>
            <Text
              style={{
                ...styles.textStyle,
                fontWeight: 'bold',
                fontSize: moderateScale(18),
              }}>
              {studentDetails.studentUsername}
            </Text>
          </View>
          {/* <Divider style={styles.divider} /> */}
          <View style={styles.textBorder}>
            <Text style={styles.textStyle}>{studentDetails.studentRno}</Text>
          </View>
          {/* <Divider style={styles.divider} /> */}
          <View style={styles.textBorder}>
            <Text style={styles.textStyle}>{studentDetails.studentDept}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(20),
    backgroundColor: WHITE,
    paddingTop: verticalScale(10),
  },
  userStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: moderateScale(100),
    width: moderateScale(100),
    height: moderateScale(100),
  },
  detailsBorder: {
    flex: 1,
    marginStart: scale(20),
  },
  textBorder: {
    marginVertical: verticalScale(1),
    marginStart: scale(8),
  },
  textStyle: {
    fontSize: moderateScale(16),
  },
  divider: {
    backgroundColor: 'black',
  },
  iconStyle: {
    alignSelf: 'flex-end',
  },
  modalScreen: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    width: '100%',
    bottom: '0%',
    position: 'absolute',
  },
});

export default StudentUserHeader;
