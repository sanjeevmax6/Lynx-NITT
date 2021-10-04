import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';

import * as colors from '../../utils/colors';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalContent from './ModalContent';
import ImageColors from 'react-native-image-colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const Header = ({name, followers, url, description}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [coverColor, setCoverColor] = useState('');
  const [coverIconColor, setCoverIconColor] = useState(colors.Tertiary);

  const getColors = async () => {
    const result = await ImageColors.getColors(url, {
      fallback: colors.primary,
      cache: true,
      key: 'unique_key',
    });
    switch (result.platform) {
      case 'android':
        return {cover: result.lightVibrant, icon: result.darkVibrant};

      case 'ios':
        return {cover: result.background, icon: result.primary};

      default:
        return {cover: colors.Primary, icon: colors.Secondary};
    }
  };

  getColors().then(res => {
    setCoverColor(res.cover);
    setCoverIconColor(res.icon);
  });

  return coverColor === colors.Tertiary ? (
    <SafeAreaView>
      <View>
        <Text>LOADING</Text>
      </View>
    </SafeAreaView>
  ) : (
    <View style={{backgroundColor: colors.WHITE}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalScreen}>
          <View style={styles.modalView}>
            <ModalContent />
          </View>
        </View>
      </Modal>

      <View style={{backgroundColor: coverColor, height: verticalScale(81)}}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setModalVisible(true)}>
          <Icon
            name="menu"
            color={coverIconColor}
            size={scale(25)}
            style={{
              alignSelf: 'flex-end',
              paddingRight: scale(HorizontalPadding),
              marginTop: verticalScale(6),
            }}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={{uri: url || '../../assests/images/spider.png'}}
        style={styles.image}
      />
      <View
        style={{
          paddingTop: verticalScale(12),
          marginHorizontal: scale(HorizontalPadding),
        }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={{...styles.text, paddingTop: verticalScale(6)}}>
          {description}
        </Text>
        <Text style={styles.followers}>{followers} followers</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = ScaledSheet.create({
  text: {
    fontSize: '14@s',
    color: colors.BLACK,
  },
  image: {
    width: '120@s',
    height: '120@s',
    borderRadius: '60@s',
    justifyContent: 'center',
    borderColor: colors.Primary,
    borderWidth: '1@vs',
    marginTop: '-67@vs',
    marginLeft: scale(HorizontalPadding),
  },
  numbers: {
    color: colors.WHITE,
    fontSize: '18@s',
    fontWeight: 'bold',
  },
  name: {
    fontSize: '18@s',
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  icon: {
    paddingHorizontal: '10@s',
    paddingRight: 0,
    paddingBottom: '7@vs',
    alignSelf: 'flex-end',
  },
  modalScreen: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.57)',
  },
  followers: {
    color: colors.Tertiary,
    paddingVertical: '9@vs',
    fontWeight: 'bold',
  },
  modalView: {
    backgroundColor: colors.WHITE,
    height: '200@vs',
    width: '100%',
    bottom: '0%',
    position: 'absolute',
  },
});
