import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View, StyleSheet, Dimensions, Keyboard} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {SafeAreaView} from 'react-native-safe-area-context';
import Error from '../../components/Error';
import {calendarNoticeCreation_DescriptionTitle} from '../../utils/stringConstants';
import {CALENDAR_NOTICE_STORE} from '../../mobx/CALENDAR_NOTICE_STORE';
import {observer} from 'mobx-react';

const WIDTH = Dimensions.get('window').width;

const CalendarNoticeCreationTitle = observer(({scrollViewRef, callback}) => {
  //Handling scroll
  const [titleEr, setTitleEr] = useState(0);
  const scroll = () => {
    setTitleEr(0);
    if (!CALENDAR_NOTICE_STORE.getTitle) {
      setTitleEr(1);
      return;
    }

    if (titleLength < 0) {
      setTitleEr(2);
      return;
    }

    callback(calendarNoticeCreation_DescriptionTitle, 2);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH,
        animated: true,
      });
    }
  };

  //Character Count
  const maxTitleLength = 150;
  const [titleLength, setTitleLength] = useState(maxTitleLength);
  const onChangeTitleLength = text => {
    setTitleLength(maxTitleLength - text.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          label="Notice Title"
          style={{
            backgroundColor: color.GRAY_LIGHT,
            borderTopRightRadius: moderateScale(9),
            borderTopLeftRadius: moderateScale(9),
            borderBottomLeftRadius: moderateScale(9),
            borderBottomRightRadius: moderateScale(9),
          }}
          placeholder="Notice Title"
          multiline={true}
          value={CALENDAR_NOTICE_STORE.getTitle}
          theme={{
            colors: {
              primary: color.BLACK,
            },
          }}
          onChangeText={nTitle => {
            CALENDAR_NOTICE_STORE.setTitle(nTitle);
            onChangeTitleLength(nTitle);
          }}
          left={<TextInput.Icon name={'lead-pencil'} color={color.Accent} />}
          right={
            <TextInput.Affix
              text={'/' + titleLength}
              textStyle={{
                color: titleLength < 0 ? color.Tertiary : color.GRAY_DARK,
              }}
            />
          }
        />
        {titleEr == 1 && <Error text="Please fill in the Title" />}
        {titleEr == 2 && <Error text="Exceeds Word Limit" />}
      </View>

      {/* Navigation Buttons */}
      <Button
        style={styles.next}
        mode="contained"
        onPress={scroll}
        labelStyle={{color: color.regNext}}>
        Next
      </Button>
    </SafeAreaView>
  );
});

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
});

export default CalendarNoticeCreationTitle;
