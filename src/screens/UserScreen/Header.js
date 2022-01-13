import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Platform,
  UIManager,
  Pressable,
} from 'react-native';

import * as colors from '../../utils/colors';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalContent from './ModalContent';
import ImageColors from 'react-native-image-colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {NUMBER_OF_LINES} from '../../utils/UI_CONSTANTS';

const Header = ({name, followers, url, description, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [coverColor, setCoverColor] = useState('');
  const [coverIconColor, setCoverIconColor] = useState(colors.Tertiary);
  const [showMoreText, setShowMoreText] = useState(true);
  const [moreText, setMoreText] = useState('more');
  const [numberOfLines, setNumberOfLines] = useState(NUMBER_OF_LINES);
  const [showingMore, setShowingMore] = useState(false);

  const onShowMorePressed = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMoreText(showingMore ? 'more' : 'less');
    setNumberOfLines(showingMore ? NUMBER_OF_LINES : 100);
    setShowingMore(!showingMore);
  };

  const getColors = async () => {
    const result = await ImageColors.getColors(url, {
      fallback: colors.Primary,
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

  const onTextLayout = useCallback(e => {
    setShowMoreText(e.nativeEvent.lines.length > NUMBER_OF_LINES);
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  return coverColor === colors.Tertiary ? (
    <SafeAreaView>
      <View>
        <Text>LOADING</Text>
      </View>
    </SafeAreaView>
  ) : (
    <View style={{backgroundColor: colors.WHITE}}>
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

      <View style={{backgroundColor: coverColor, height: verticalScale(81)}}>
        <Pressable style={styles.icon} onPress={() => setModalVisible(true)}>
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
        </Pressable>
      </View>
      <View style={styles.imageView}>
        <Image
          source={{uri: url || '../../assests/images/spider.png'}}
          style={styles.image}
        />
      </View>
      <View
        style={{
          paddingTop: verticalScale(12),
          marginHorizontal: scale(HorizontalPadding),
        }}>
        <Text style={styles.name}>{name}</Text>
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{...styles.text, paddingTop: verticalScale(6)}}
            onTextLayout={onTextLayout}
            numberOfLines={numberOfLines}>
            {description}
          </Text>
          {showMoreText && (
            <TouchableOpacity onPress={onShowMorePressed}>
              <Text style={styles.moreText}>{moreText}</Text>
            </TouchableOpacity>
          )}
        </View>

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
  moreText: {
    fontSize: '14@s',
    color: colors.Blue,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  imageView: {
    width: '120@s',
    height: '120@s',
    marginTop: '-67@vs',
    borderRadius: '60@s',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(HorizontalPadding),
    elevation: 1,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  image: {
    width: '120@s',
    height: '120@s',
    borderRadius: '60@s',
    justifyContent: 'center',
    borderColor: colors.Primary,
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
    height: 'auto',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  followers: {
    color: colors.Tertiary,
    paddingVertical: '9@vs',
    fontWeight: 'bold',
  },
  modalView: {
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    width: '100%',
    bottom: '0%',
    position: 'absolute',
  },
});
