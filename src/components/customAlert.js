import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Platform,
  Image,
} from 'react-native';
import {verticalScale, scale} from 'react-native-size-matters';
import {FONT} from '../utils/UI_CONSTANTS';

const CustomAlert = props => {
  const [androidDefaults, setAndroidDefaults] = useState({
    container: {
      backgroundColor:
        (props.android &&
          props.android.container &&
          props.android.container.backgroundColor) ||
        '#f2f2f2',
    },
    title: {
      color:
        (props.android && props.android.title && props.android.title.color) ||
        '#000000',
      fontFamily:
        (props.android &&
          props.android.title &&
          props.android.title.fontFamily) ||
        FONT,
      fontSize:
        (props.android &&
          props.android.title &&
          props.android.title.fontSize) ||
        scale(16 + 2),
      fontWeight:
        (props.android &&
          props.android.title &&
          props.android.title.fontWeight) ||
        'bold',
    },
    message: {
      color:
        (props.android &&
          props.android.message &&
          props.android.message.color) ||
        '#000000',
      fontFamily:
        (props.android &&
          props.android.message &&
          props.android.message.fontFamily) ||
        FONT,
      fontSize:
        (props.android &&
          props.android.message &&
          props.android.message.fontSize) ||
        scale(16),
      fontWeight:
        (props.android &&
          props.android.message &&
          props.android.message.fontWeight) ||
        'normal',
      paddingTop: props.title ? null : verticalScale(10),
    },
    button: {
      color: '#ff512f',
      fontFamily: FONT,
      fontSize: scale(16 - 2),
      fontWeight: '500',
      textTransform: 'uppercase',
      backgroundColor: 'transparent',
    },
  });
  const AndroidButtonBox = () => {
    const [buttonLayoutHorizontal, setButtonLayoutHorizontal] = useState(1);
    const buttonProps =
      props.buttons && props.buttons.length > 0 ? props.buttons : [{}];

    return (
      <View
        key="button-box"
        style={[
          styles.androidButtonGroup,
          {
            flexDirection: buttonLayoutHorizontal === 1 ? 'row' : 'column',
          },
        ]}
        onLayout={e => {
          if (e.nativeEvent.layout.height > verticalScale(60))
            setButtonLayoutHorizontal(0);
        }}>
        {buttonProps.map((item, index) => {
          if (index > 2) return null;
          const alignSelfProperty =
            buttonProps.length > 2 &&
            index === 0 &&
            buttonLayoutHorizontal === 1
              ? 'flex-start'
              : 'flex-end';
          let defaultButtonText = 'OK';
          if (buttonProps.length > 2) {
            if (index === 0) defaultButtonText = 'ASK ME LATER';
            else if (index === 1) defaultButtonText = 'CANCEL';
          } else if (buttonProps.length === 2 && index === 0)
            defaultButtonText = 'CANCEL';
          return (
            <View
              style={[
                styles.androidButton,
                index === 0 && buttonLayoutHorizontal === 1 ? {flex: 1} : {},
              ]}>
              <Pressable
                onPress={() => {
                  props.setModalVisible(false);
                  if (item.func && typeof item.func === 'function') item.func();
                }}
                style={[
                  {
                    alignSelf: alignSelfProperty,
                  },
                ]}>
                <View
                  style={[
                    styles.androidButtonInner,
                    {
                      backgroundColor:
                        (item.styles && item.styles.backgroundColor) ||
                        androidDefaults.button.backgroundColor,
                    },
                  ]}>
                  <Text
                    style={{
                      color:
                        (item.styles && item.styles.color) ||
                        androidDefaults.button.color,
                      fontFamily:
                        (item.styles && item.styles.fontFamily) ||
                        androidDefaults.button.fontFamily,
                      fontSize:
                        (item.styles && item.styles.fontSize) ||
                        androidDefaults.button.fontSize,
                      fontWeight:
                        (item.styles && item.styles.fontWeight) ||
                        androidDefaults.button.fontWeight,
                      textTransform:
                        (item.styles && item.styles.textTransform) ||
                        androidDefaults.button.textTransform,
                    }}>
                    {item.text || defaultButtonText}
                  </Text>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <Modal
      key="modal"
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}>
      <Pressable
        style={[
          Platform.OS === 'ios' ? styles.iOSBackdrop : styles.androidBackdrop,
          styles.backdrop,
        ]}
        onPress={() => props.setModalVisible(false)}
      />
      <View style={styles.alertBox}>
        {Platform.OS === 'ios' ? null : (
          <View style={[styles.androidAlertBox, androidDefaults.container]}>
            {props.image ? (
              <Image
                style={{
                  height: scale(60),
                  width: scale(60),
                  marginVertical: verticalScale(10),
                  alignSelf: 'center',
                }}
                source={props.image}></Image>
            ) : null}
            {props.title ? (
              <Text style={[styles.androidTitle, androidDefaults.title]}>
                {props.title}
              </Text>
            ) : null}
            <Text style={[styles.androidMessage2]}>
              From : {props.startDate || ''}
            </Text>
            <Text style={[styles.androidMessage2]}>
              To : {props.endDate || ''}
            </Text>
            <Text style={[styles.androidMessage, androidDefaults.message]}>
              {props.message || ''}
            </Text>
            <AndroidButtonBox />
          </View>
        )}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: scale(10),
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  iOSBackdrop: {
    backgroundColor: '#000000',
    opacity: 0.3,
  },
  androidBackdrop: {
    backgroundColor: '#232f34',
    opacity: 0.4,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  alertBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  androidAlertBox: {
    maxWidth: 300,
    width: '100%',
    margin: scale(48),
    elevation: 24,
    borderRadius: 10,
  },
  androidTitle: {
    margin: scale(24),
    marginBottom: scale(4),
  },
  androidMessage: {
    marginLeft: scale(24),
    marginRight: scale(24),
    marginVertical: verticalScale(10),
  },
  androidMessage2: {
    marginLeft: scale(24),
    marginRight: scale(24),
    fontSize: scale(12),
  },
  androidButtonGroup: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: verticalScale(8),
    marginLeft: scale(24),
  },
  androidButton: {
    marginRight: scale(8),
  },
  androidButtonInner: {
    padding: scale(10),
  },
});
export default CustomAlert;
