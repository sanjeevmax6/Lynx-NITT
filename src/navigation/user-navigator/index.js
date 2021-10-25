import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UserScreen from '../../screens/UserScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';
import { verticalScale } from 'react-native-size-matters';

const UserStack = createNativeStackNavigator();

function UserNavigator() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="Users"
        component={UserScreen}
        options={{
          headerShown: false,
        }}
      />
      <UserStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </UserStack.Navigator>
  );
}

export default UserNavigator;