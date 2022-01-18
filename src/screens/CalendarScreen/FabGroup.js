import React from 'react';
import {FAB} from 'react-native-paper';
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
                  CALENDAR_NOTICE_STORE.reset();
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
