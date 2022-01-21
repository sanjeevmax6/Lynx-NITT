import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View, StyleSheet, Dimensions, Keyboard} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {SafeAreaView} from 'react-native-safe-area-context';
import Error from '../../components/Error';
import {
  calendarNoticeCreation_DateTitle,
  calendarNoticeCreation_NoticeTitle,
} from '../../utils/stringConstants';
import {CALENDAR_NOTICE_STORE} from '../../mobx/CALENDAR_NOTICE_STORE';
import {observer} from 'mobx-react';

const WIDTH = Dimensions.get('window').width;

const CalendarNoticeCreationDesc = observer(
  ({scrollViewRef, descInputRef, callback}) => {
    //handling scroll
    const scroll = () => {
      setdescEr(0);
      if (!CALENDAR_NOTICE_STORE.getDescription) {
        setdescEr(1);
        return;
      }
      if (descLength < 0) {
        setdescEr(2);
        return;
      }

      callback(calendarNoticeCreation_DateTitle, 3);
      if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
          x: WIDTH * 2,
          animated: true,
        });
        Keyboard.dismiss();
      }
    };
    const back = () => {
      callback(calendarNoticeCreation_NoticeTitle, 1);
      if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
          x: WIDTH * 0,
          animated: true,
        });
      }
    };

    //char count
    const maxDescLength = 300;
    const [descLength, setDescLength] = useState(maxDescLength);
    const onChangeDescLength = text => {
      setDescLength(maxDescLength - text.length);
    };

    const [descEr, setdescEr] = useState(0);

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.viewScale}>
          <TextInput
            ref={descInputRef}
            underlineColor="transparent"
            style={{
              backgroundColor: color.GRAY_LIGHT,
              borderTopRightRadius: moderateScale(9),
              borderTopLeftRadius: moderateScale(9),
              borderBottomLeftRadius: moderateScale(9),
              borderBottomRightRadius: moderateScale(9),
            }}
            label="Notice Description"
            multiline={true}
            theme={{
              colors: {
                primary: color.BLACK,
              },
            }}
            placeholder="Notice Description"
            value={CALENDAR_NOTICE_STORE.getDescription}
            onChangeText={nDesc => {
              CALENDAR_NOTICE_STORE.setDescription(nDesc);
              onChangeDescLength(nDesc);
            }}
            left={<TextInput.Icon name={'text-subject'} color={color.BLACK} />}
            right={
              <TextInput.Affix
                text={'/' + descLength}
                textStyle={{
                  color: descLength < 0 ? color.Tertiary : color.GRAY_DARK,
                }}
              />
            }
          />
          {descEr == 1 && <Error text="Please fill in the Description" />}
          {descEr == 2 && <Error text="Exceeds Word Limit" />}
        </View>

        {/* Navigation Buttons */}
        <Button
          style={styles.next}
          mode="contained"
          onPress={scroll}
          labelStyle={{color: color.regNext}}>
          Next
        </Button>
        <Button
          style={styles.back}
          mode="outline"
          onPress={back}
          labelStyle={{color: color.regAttach}}
          icon="chevron-left">
          Back
        </Button>
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(4),
    width: WIDTH,
  },
  viewScale: {
    paddingHorizontal: scale(HorizontalPadding),
    paddingVertical: verticalScale(4),
  },
  wordCount: {
    fontSize: scale(10),
    textAlign: 'right',
    paddingHorizontal: scale(HorizontalPadding),
  },
  next: {
    position: 'absolute',
    bottom: verticalScale(20),
    right: verticalScale(20),
    backgroundColor: color.regAttach,
  },
  back: {
    position: 'absolute',
    bottom: verticalScale(20),
    left: verticalScale(10),
  },
});

export default CalendarNoticeCreationDesc;
