import React from 'react';
import {FAB, Portal} from 'react-native-paper';
import * as colors from '../../utils/colors';
import {USER_STORE} from '../../mobx/USER_STORE';
import * as USER_TYPE from '../../utils/USER_TYPE';
import {CALENDAR_NOTICE_STORE} from '../../mobx/CALENDAR_NOTICE_STORE';

const FabGroup = ({navigation}) => {
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;
  return (
    <FAB.Group
      open={open}
      theme={{
        colors: {
          text: colors.FontColor,
        },
      }}
      icon={open ? 'window-close' : 'plus'}
      color={open ? colors.Tertiary : colors.Accent}
      visible
      actions={
        USER_STORE.getUserType == USER_TYPE.ADMIN
          ? [
              {
                icon: 'calendar',
                label: 'Events',
                color: colors.Tertiary,
                style: {},
                onPress: () => navigation.navigate('CreateEventScreen'),
              },
              {
                icon: 'bullhorn',
                label: 'Announcements',
                color: colors.Tertiary,
                style: {},
                onPress: () => navigation.navigate('CreateAnnouncementScreen'),
              },
              {
                icon: 'calendar',
                label: 'Calendar Notices',
                color: colors.Tertiary,
                style: {},
                onPress: () => {
                  navigation.navigate('CreateCalendarNoticeScreen');
                  CALENDAR_NOTICE_STORE.setError(false);
                  CALENDAR_NOTICE_STORE.setErrorText('');
                  CALENDAR_NOTICE_STORE.setLoading(false);
                  CALENDAR_NOTICE_STORE.setSuccess(false);
                  CALENDAR_NOTICE_STORE.setTitle('');
                  CALENDAR_NOTICE_STORE.setDescription('');
                  CALENDAR_NOTICE_STORE.setStartDate(
                    new Date(new Date().getTime() + 86400000),
                  );
                  CALENDAR_NOTICE_STORE.setEndDate(
                    new Date(new Date().getTime() + 2 * 86400000),
                  );
                  CALENDAR_NOTICE_STORE.setShowStartDatePicker(false);
                  CALENDAR_NOTICE_STORE.setShowEndDatePicker(false);
                  CALENDAR_NOTICE_STORE.setMultiDay(false);
                },
              },
            ]
          : //CLUB USER
            [
              {
                icon: 'calendar',
                label: 'Events',
                color: colors.Tertiary,
                style: {},
                onPress: () => navigation.navigate('CreateEventScreen'),
              },
              {
                icon: 'bullhorn',
                label: 'Announcements',
                color: colors.Tertiary,
                style: {},
                onPress: () => navigation.navigate('CreateAnnouncementScreen'),
              },
            ]
      }
      onStateChange={onStateChange}
      onPress={() => {
        if (open) {
          // do something if the speed dial is open
        }
      }}
    />
  );
};

export default FabGroup;
