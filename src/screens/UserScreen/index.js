import React from 'react';
import {View, FlatList} from 'react-native';
import {FAB, Text, Button} from 'react-native-paper';
import {
  scale,
  ScaledSheet,
  s,
  vs,
  ms,
  verticalScale,
} from 'react-native-size-matters';
import RecentEventCard from './RecentEventCard';
import UserInfo from './UserInfo';

const UserScreen = () => {
  const Item = () => <RecentEventCard />;
  return (
    <View style={styles.maincontainer}>
      <View style={styles.userinfo}>
        <UserInfo />
      </View>
      <View style={styles.bottomsec}>
        <Button mode="outlined" onPress={() => console.log('Pressed')}>
          Edit Profile
        </Button>
        <Text
          style={{
            marginTop: verticalScale(20),
            fontSize: scale(20),
            marginBottom: verticalScale(5),
          }}>
          Recent Events
        </Text>
        <FlatList renderItem={Item} data={[{}, {}, {}, {}, {}, {}]} />
        <Button
          mode="text"
          labelStyle={styles.moreLabel}
          style={styles.moreBtn}
          onPress={() => console.log('More')}>
          More Events
        </Button>
      </View>
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: 'column',
  },
  userinfo: {
    flex: 3,
    flexDirection: 'column',
  },
  bottomsec: {
    flex: 6,
    marginHorizontal: '15@s',
  },
  fab: {
    position: 'absolute',
    marginHorizontal: '16@s',
    marginVertical: '16@vs',
    right: 0,
    bottom: 0,
  },
  moreBtn: {
    marginBottom: '5@vs',
  },
  moreLabel: {
    fontSize: '15@ms',
  },
});

export default UserScreen;
