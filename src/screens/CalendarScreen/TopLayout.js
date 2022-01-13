import React, {useState, useRef} from 'react';
import {View, Animated, TouchableOpacity} from 'react-native';
import {Text, IconButton, Divider} from 'react-native-paper';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import moment from 'moment';
import * as colors from '../../utils/colors';
import {CALENDAR_STORE} from '../../mobx/CALENDAR_STORE';
import {Calendar} from 'react-native-calendars';
import {HorizontalPadding, FONT} from '../../utils/UI_CONSTANTS';
import {observer} from 'mobx-react';

const TopLayout = observer(() => {
  const [expanded, setexpanded] = useState(true);
  const maxHeight = verticalScale(400);
  const animation = useRef(new Animated.Value(maxHeight)).current;
  const [icon, setIcon] = useState('arrow-up-drop-circle');
  const [b, setb] = useState(true);
  var height;
  var MarkedDates = {};

  const [selectedDate, setSelectedDate] = useState(
    moment(CALENDAR_STORE.getSelectedDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
  );
  const minDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1),
  ).toLocaleString();
  const maxDate = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1),
  ).toLocaleString();
  const [dateHeader, setDateHeader] = useState(
    moment(CALENDAR_STORE.getSelectedDate, 'DD-MM-YYYY').format(
      'dddd, Do MMMM, YYYY',
    ),
  );

  const onSelectedChange = day => {
    CALENDAR_STORE.setSelectedDate(
      moment(new Date(Date.parse(day.dateString)).toLocaleDateString()).format(
        'DD-MM-YYYY',
      ),
    );
    setSelectedDate(
      moment(CALENDAR_STORE.getSelectedDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
    );
    setDateHeader(
      moment(CALENDAR_STORE.getSelectedDate, 'DD-MM-YYYY').format(
        'dddd, Do MMMM, YYYY',
      ),
    );
  };

  const toggle = () => {
    height = 0;
    setb(false);
    setIcon('arrow-down-drop-circle');
    if (!expanded) {
      height = maxHeight;
      setb(true);
      setIcon('arrow-up-drop-circle');
    }

    Animated.spring(animation, {
      toValue: height,
      useNativeDriver: false,
    }).start();
    setexpanded(!expanded);
  };

  function undefinedCheck(MarkedDates, startDate) {
    try {
      //console.log('TRIED' + temp);
      return MarkedDates[startDate].periods;
    } catch {
      //DONT REMOVE THIS
      //console.log('SUCCESSFULY SKIPPED');
      return [];
    }
  }

  //Marking Events and Notices in Calendar
  var eventDATA = CALENDAR_STORE.getEventData.events;
  var adminEventDATA = CALENDAR_STORE.getAdminEventData.events;

  const markDates = () => {
    if (CALENDAR_STORE.getSuccess) {
      //Marking Notice Lines
      for (var i = 0; i < adminEventDATA.length; i++) {
        var notices = adminEventDATA[i].data;
        for (var j = 0; j < notices.length; j++) {
          var noticeStartDate = moment(
            new Date(notices[j].startDate).toLocaleDateString(),
          ).format('YYYY-MM-DD');
          //Limiting Maximum No.of Lines per day to 3 and if more than 3, adding a line to indicate more notices.
          if (undefinedCheck(MarkedDates, noticeStartDate).length < 3) {
            MarkedDates[noticeStartDate] = {
              ...MarkedDates[noticeStartDate],
              periods: [
                ...undefinedCheck(MarkedDates, noticeStartDate),
                {
                  startingDay: true,
                  endingDay: true,
                  color: colors.CalendarScreen_CalendarNoticeMarking,
                },
              ],
            };
          } else if (undefinedCheck(MarkedDates, noticeStartDate).length == 3) {
            MarkedDates[noticeStartDate] = {
              ...MarkedDates[noticeStartDate],
              periods: [
                ...undefinedCheck(MarkedDates, noticeStartDate),
                {
                  startingDay: true,
                  endingDay: true,
                  color: colors.CalendarScreen_CalendarExcessMarking,
                },
              ],
            };
          }
        }
      }
      //Marking Event Lines
      for (var i = 0; i < eventDATA.length; i++) {
        var events = eventDATA[i].data;
        for (var j = 0; j < events.length; j++) {
          var eventStartDate = moment(
            new Date(events[j].startDate).toLocaleDateString(),
          ).format('YYYY-MM-DD');
          //Limiting Maximum No.of Lines per day to 3 and if more than 3, adding a line to indicate more events.
          if (undefinedCheck(MarkedDates, eventStartDate).length < 3) {
            MarkedDates[eventStartDate] = {
              ...MarkedDates[eventStartDate],
              periods: [
                ...undefinedCheck(MarkedDates, eventStartDate),
                {
                  startingDay: true,
                  endingDay: true,
                  color: colors.CalendarScreen_CalendarEventMarking,
                },
              ],
            };
          } else if (undefinedCheck(MarkedDates, eventStartDate).length == 3) {
            MarkedDates[eventStartDate] = {
              ...MarkedDates[eventStartDate],
              periods: [
                ...undefinedCheck(MarkedDates, eventStartDate),
                {
                  startingDay: true,
                  endingDay: true,
                  color: colors.CalendarScreen_CalendarExcessMarking,
                },
              ],
            };
          }
        }
      }
      return MarkedDates;
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.dateLayout} onPress={toggle}>
        <Text style={styles.dateText}>{dateHeader}</Text>
        <IconButton icon={icon} size={scale(16)} color={colors.Tertiary} />
      </TouchableOpacity>
      <Divider style={{height: 0.3}} />
      <Animated.View
        style={[
          {
            height: animation,
            backgroundColor: colors.CalenderScreen_backgroundColor,
          },
        ]}>
        <View
          onLayout={event => {
            //console.log(event.nativeEvent.layout.height);
            height = event.nativeEvent.layout.height;
            Animated.spring(animation, {
              toValue: height,
              useNativeDriver: false,
            }).start();
          }}>
          {b && (
            <Calendar
              style={{
                marginTop: verticalScale(-1.5 * HorizontalPadding),
                marginBottom: verticalScale(HorizontalPadding / 2),
              }}
              current={selectedDate}
              minDate={minDate}
              maxDate={maxDate}
              onDayPress={day => {
                onSelectedChange(day);
              }}
              hideExtraDays={true}
              firstDay={1}
              showWeekNumbers={true}
              enableSwipeMonths={true}
              markingType="multi-period"
              markedDates={{
                ...markDates(),
                [selectedDate]: {
                  ...MarkedDates[selectedDate],
                  selected: true,
                  selectedColor: colors.CalenderScreen_selectedBackgroundColor,
                },
              }}
              theme={{
                arrowColor: colors.CalenderScreen_arrowColor,

                textDayFontFamily: FONT,
                textDayFontSize: scale(14),

                textSectionTitleColor: colors.CalendarScreen_dayHeaderTextColor,
                textDayHeaderFontSize: scale(13),

                textMonthFontFamily: FONT,
                textMonthFontSize: scale(16),

                todayTextColor: colors.CalenderScreen_todayTextColor,

                selectedDayBackgroundColor:
                  colors.CalenderScreen_selectedBackgroundColor,
                selectedDayTextColor: colors.CalenderScreen_selectedTextColor,
                'stylesheet.calendar.header': {
                  dayTextAtIndex5: {
                    color: colors.CalendarScreen_satSunHeaderTextColor,
                  },
                  dayTextAtIndex6: {
                    color: colors.CalendarScreen_satSunHeaderTextColor,
                  },
                },
                'stylesheet.calendar.main': {
                  week: {
                    marginVertical: verticalScale(2),
                    flexDirection: 'row',
                    justifyContent: 'center',
                  },
                },
              }}
            />
          )}
        </View>
      </Animated.View>
      <Divider
        style={{height: 1, marginBottom: verticalScale(HorizontalPadding / 2)}}
      />
    </View>
  );
});

const styles = ScaledSheet.create({
  dateLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.Primary,
    paddingVertical: verticalScale(10),
  },
  dateText: {
    fontSize: '18@s',
    marginLeft: '12@s',
    fontWeight: 'bold',
  },
});

export default TopLayout;
