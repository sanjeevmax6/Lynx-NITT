import React from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import {FAB, Text, Button, Avatar} from 'react-native-paper';
import {
  scale,
  ScaledSheet,
  verticalScale,
  moderateScale,
  ms,
} from 'react-native-size-matters';
import RecentEventCard from './RecentEventCard';
import * as color from '../../utils/colors';

const UserScreen = () => {
  const Item = () => <RecentEventCard />;
  const renderTopLayout = () => (
    <View>
      <View style={styles.toprow}>
        <View style={styles.userblk}>
          <Avatar.Image
            size={moderateScale(150)}
            style={styles.profImg}
            source={require('../../assests/images/user.png')}
          />
          <Text
            style={{
              fontWeight: 'bold',
              marginTop: verticalScale(10),
              fontSize: scale(18),
            }}>
            Firstname Lastname
          </Text>
        </View>
        <View style={styles.followers}>
          <View>
            <Text style={{...styles.followTxt, fontSize: moderateScale(20)}}>
              50
            </Text>
            <Text style={styles.followTxt}>Posts</Text>
          </View>
          <View>
            <Text
              style={{
                ...styles.followTxt,
                fontSize: moderateScale(20),
              }}>
              500
            </Text>
            <Text style={styles.followTxt}>Followers</Text>
          </View>
        </View>
      </View>
      <Button
        mode="outlined"
        onPress={() => console.log('Pressed')}
        style={styles.editBtn}>
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
    </View>
  );

  const renderBottomLayout = () => (
    <View>
      <Button
        mode="text"
        labelStyle={styles.moreLabel}
        style={styles.moreBtn}
        onPress={() => console.log('More')}>
        More Events
      </Button>
    </View>
  );
  return (
    <View style={styles.maincontainer}>
      <FlatList
        renderItem={Item}
        data={[{}, {}, {}, {}, {}, {}]}
        ListHeaderComponent={renderTopLayout}
        ListFooterComponent={renderBottomLayout}
      />
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
    marginHorizontal: '15@s',
  },
  userblk: {
    flexDirection: 'column',
  },
  toprow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    marginTop: '25@vs',
  },
  profImg: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: color.WHITE,
  },
  followers: {
    flexDirection: 'column',
    paddingVertical: '10@vs',
    justifyContent: 'space-around',
  },
  followTxt: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: '15@ms',
  },
  editBtn: {
    marginTop: '20@vs',
  },
  moreBtn: {
    marginVertical: '5@vs',
  },
  moreLabel: {
    fontSize: '15@ms',
  },
  fab: {
    position: 'absolute',
    marginVertical: '16@vs',
    right: 0,
    bottom: 0,
  },
});

export default UserScreen;
