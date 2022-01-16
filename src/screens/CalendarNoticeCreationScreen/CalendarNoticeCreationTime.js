import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Dimensions,
  BackHandler,
} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from 'react-native-size-matters';
import moment from 'moment';
import * as color from '../../utils/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Button, TextInput} from 'react-native-paper';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import {SafeAreaView} from 'react-native-safe-area-context';
import {calendarNoticeCreation_DescriptionTitle} from '../../utils/stringConstants';
import {CALENDAR_NOTICE_STORE} from '../../mobx/CALENDAR_NOTICE_STORE';
import {observer} from 'mobx-react';
import {CalendarNoticeCreation} from './CalendarNoticeCreationAPI';
import Error from '../../components/Error';
import LoaderPage from '../../components/LoadingScreen';
import SuccessScreen from '../../components/SuccessScreen';
import {useFocusEffect} from '@react-navigation/native';

const DATE_FORMAT = 'DD-MM-YYYY';
const WIDTH = Dimensions.get('window').width;

const CalendarNoticeCreationTime = observer(
  ({scrollViewRef, callback, navigation}) => {
    const handleAPICALL = () => {
      CalendarNoticeCreation();
    };

    //Handling Notice Creation
    const createNotice = () => {
      handleAPICALL();
    };

    const back = () => {
      callback(calendarNoticeCreation_DescriptionTitle, 2);
      if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
          x: WIDTH * 1,
          animated: true,
        });
      }
    };

    const toggleSwitch = () => {
      CALENDAR_NOTICE_STORE.setMultiDay(!CALENDAR_NOTICE_STORE.getMultiDay);
      //If start date and end date are same when multi day switch is turned on,increase end date by one
      {
        CALENDAR_NOTICE_STORE.getMultiDay
          ? CALENDAR_NOTICE_STORE.getStartDate.getTime() ==
            CALENDAR_NOTICE_STORE.getEndDate.getTime()
            ? CALENDAR_NOTICE_STORE.setEndDate(
                new Date(
                  CALENDAR_NOTICE_STORE.getStartDate.getTime() + 86400000,
                ),
              )
            : null
          : null;
      }
    };

    const onChangeStartDate = newDate => {
      const startDate = newDate || CALENDAR_NOTICE_STORE.getStartDate;
      CALENDAR_NOTICE_STORE.setShowStartDatePicker(false);
      CALENDAR_NOTICE_STORE.setStartDate(startDate);
      //If start date is more than end date, make end date one day more than start date
      {
        CALENDAR_NOTICE_STORE.getStartDate.getTime() >
        CALENDAR_NOTICE_STORE.getEndDate.getTime()
          ? CALENDAR_NOTICE_STORE.setEndDate(
              new Date(startDate.getTime() + 86400000),
            )
          : null;
      }
      //If start date and end date is same, make it a single day event
      {
        CALENDAR_NOTICE_STORE.getStartDate.getTime() ==
        CALENDAR_NOTICE_STORE.getEndDate.getTime()
          ? CALENDAR_NOTICE_STORE.setMultiDay(false)
          : null;
      }
    };

    const onChangeEndDate = newDate => {
      const endDate = newDate || CALENDAR_NOTICE_STORE.getEndDate;
      CALENDAR_NOTICE_STORE.setShowEndDatePicker(false);
      CALENDAR_NOTICE_STORE.setEndDate(endDate);
      //If end date is less than start date, make start date one day less than end date
      {
        CALENDAR_NOTICE_STORE.getEndDate.getTime() <
        CALENDAR_NOTICE_STORE.getStartDate.getTime()
          ? CALENDAR_NOTICE_STORE.setStartDate(
              new Date(endDate.getTime() - 86400000),
            )
          : null;
      }
      //If start date and end date is same, make it a single day event
      {
        CALENDAR_NOTICE_STORE.getStartDate.getTime() ==
        CALENDAR_NOTICE_STORE.getEndDate.getTime()
          ? CALENDAR_NOTICE_STORE.setMultiDay(false)
          : null;
      }
    };
    return (
      <SafeAreaView style={styles.container}>
        {CALENDAR_NOTICE_STORE.getLoading ? (
          <LoaderPage />
        ) : CALENDAR_NOTICE_STORE.getSuccess ? (
          <SuccessScreen
            fn={() => {
              navigation.goBack();
            }}
          />
        ) : (
          <>
            <View style={styles.switchView}>
              <Text style={styles.buttonTextTheme}>
                Multi day calendar notice?{' '}
              </Text>
              <Switch
                trackColor={{false: color.Primary, true: color.Accent}}
                thumbColor={
                  CALENDAR_NOTICE_STORE.getMultiDay ? color.WHITE : color.WHITE
                }
                ios_backgroundColor={color.iosBackgroundColor}
                onValueChange={toggleSwitch}
                value={CALENDAR_NOTICE_STORE.getMultiDay}
              />
            </View>
            <TouchableOpacity
              style={styles.viewScale}
              onPress={() =>
                CALENDAR_NOTICE_STORE.setShowStartDatePicker(true)
              }>
              <TextInput
                disabled={true}
                style={{
                  backgroundColor: color.GRAY_LIGHT,
                  borderTopRightRadius: moderateScale(9),
                  borderTopLeftRadius: moderateScale(9),
                  borderBottomLeftRadius: moderateScale(9),
                  borderBottomRightRadius: moderateScale(9),
                }}
                theme={{
                  colors: {
                    primary: color.BLACK,
                  },
                }}
                left={
                  <TextInput.Icon
                    name="calendar"
                    size={25}
                    color={color.BLACK}
                  />
                }>
                {CALENDAR_NOTICE_STORE.getMultiDay
                  ? 'Notice Start Date : '
                  : 'Notice Date : '}
                {moment(CALENDAR_NOTICE_STORE.getStartDate).format(DATE_FORMAT)}
              </TextInput>
            </TouchableOpacity>
            {CALENDAR_NOTICE_STORE.getMultiDay && (
              <TouchableOpacity
                style={styles.viewScale}
                onPress={() =>
                  CALENDAR_NOTICE_STORE.setShowEndDatePicker(true)
                }>
                <TextInput
                  disabled={true}
                  style={{
                    backgroundColor: color.GRAY_LIGHT,
                    borderTopRightRadius: moderateScale(9),
                    borderTopLeftRadius: moderateScale(9),
                    borderBottomLeftRadius: moderateScale(9),
                    borderBottomRightRadius: moderateScale(9),
                  }}
                  theme={{
                    colors: {
                      primary: color.BLACK,
                    },
                  }}
                  left={
                    <TextInput.Icon
                      name="calendar"
                      size={25}
                      color={color.BLACK}
                    />
                  }>
                  Notice End Date :{' '}
                  {moment(CALENDAR_NOTICE_STORE.getEndDate).format(DATE_FORMAT)}
                </TextInput>
              </TouchableOpacity>
            )}
            {CALENDAR_NOTICE_STORE.getShowStartDatePicker && (
              <DateTimePickerModal
                isVisible={CALENDAR_NOTICE_STORE.getShowStartDatePicker}
                date={CALENDAR_NOTICE_STORE.getStartDate}
                mode="date"
                minimumDate={moment().toDate()}
                onConfirm={onChangeStartDate}
                onCancel={() =>
                  CALENDAR_NOTICE_STORE.setShowStartDatePicker(false)
                }
                //Notice can be created only for start dates from next day
              />
            )}
            {CALENDAR_NOTICE_STORE.getShowEndDatePicker && (
              <DateTimePickerModal
                isVisible={CALENDAR_NOTICE_STORE.getShowEndDatePicker}
                date={CALENDAR_NOTICE_STORE.getEndDate}
                mode="date"
                minimumDate={moment().toDate()}
                onConfirm={onChangeEndDate}
                onCancel={() =>
                  CALENDAR_NOTICE_STORE.setShowEndDatePicker(false)
                }
                //Notice can be created only for end dates from 2 days after
              />
            )}
            {CALENDAR_NOTICE_STORE.getError ? (
              <View style={{marginLeft: scale(HorizontalPadding)}}>
                <Error text={CALENDAR_NOTICE_STORE.getErrorText} />
              </View>
            ) : null}
            {/* Navigation Buttons */}
            <Button
              style={styles.next}
              mode="contained"
              onPress={createNotice}
              labelStyle={{color: color.regNext}}>
              Create Calendar Notice
            </Button>
            <Button
              style={styles.back}
              mode="outline"
              onPress={back}
              labelStyle={{color: color.regAttach}}
              icon="chevron-left">
              Back
            </Button>
          </>
        )}
      </SafeAreaView>
    );
  },
);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(4),
    width: WIDTH,
  },
  viewScale: {
    //paddingHorizontal: scale(2),
    paddingVertical: verticalScale(4),
    marginHorizontal: scale(HorizontalPadding),
  },
  buttonTextTheme: {
    fontSize: scale(14),
    marginLeft: scale(10),
    color: color.WHITE,
  },
  switchView: {
    paddingVertical: verticalScale(8),
    backgroundColor: color.Tertiary,
    borderRadius: moderateScale(9),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(HorizontalPadding),
    marginVertical: verticalScale(2),
  },
  back: {
    position: 'absolute',
    bottom: '20@vs',
    left: '10@vs',
  },
  next: {
    position: 'absolute',
    bottom: '20@vs',
    right: '20@vs',
    backgroundColor: color.regAttach,
  },
});

export default CalendarNoticeCreationTime;
