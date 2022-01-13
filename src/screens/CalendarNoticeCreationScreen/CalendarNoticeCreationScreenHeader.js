import React, {useState} from 'react';
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
import {HeaderHeight} from '../../utils/UI_CONSTANTS';
import CustomAlert from '../../components/customAlert';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {observer} from 'mobx-react';
const WIDTH = Dimensions.get('window').width;

const CalendarNoticeCreationScreenHeader = observer(({navigation, isValid}) => {
  function toggleTab(tabShow) {
    BOTTOM_NAV_STORE.setTabVisibility(tabShow);
  }
  const [modalTitle, setModalTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState({});

  return (
    <SafeAreaView style={styles.header}>
      <CustomAlert
        title={modalTitle}
        message={modalMessage}
        startDate={''}
        endDate={''}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        buttons={modalButtons}
      />
      <View style={styles.twoButtonLeft}>
        <TouchableOpacity
          onPress={() => {
            setModalTitle('Confirmation');
            setModalMessage('Are you sure you want to discard this notice?');
            setModalButtons([
              {
                text: 'DISCARD',
                func: () => {
                  toggleTab(true);
                  navigation.goBack();
                },
              },
              {
                text: 'KEEP EDITING',
                func: () => console.log('OK Pressed'),
              },
            ]);
            setModalVisible(true);
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
      <Text style={styles.headerText}>Create Calendar Notice</Text>
      <View style={{marginLeft: scale(5), width: HeaderHeight / 1.6}}></View>
    </SafeAreaView>
  );
});

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

export default CalendarNoticeCreationScreenHeader;
