import React from 'react';
import {FAB, Portal} from 'react-native-paper';
import * as colors from '../../utils/colors';
const FabGroup = ({navigation}) => {
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;
  return (
    <FAB.Group
      open={open}
      theme={{
        colors: {
          text: colors.Primary,
        },
      }}
      icon={open ? 'calendar-today' : 'plus'}
      actions={[
        {
          icon: 'bullhorn',
          label: 'Announcements',
          color: colors.Tertiary,

          onPress: () => navigation.navigate('CreateAnnouncementScreen'),
        },
        {
          icon: 'calendar',
          label: 'Events',
          color: colors.Tertiary,
          style: {},

          onPress: () => navigation.navigate('CreateEventScreen'),
        },
      ]}
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
