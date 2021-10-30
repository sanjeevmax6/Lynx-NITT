import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from '../../components/Header';
import PageHeader from '../../components/PageHeader';

import UserScreen from '../../screens/UserScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';
import SettingsSceen from '../../screens/SettingsScreen';

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
          animation: 'slide_from_right',
        }}
      />
      <UserStack.Screen
        name="Settings"
        component={SettingsSceen}
        options={{
          headerShown: true,
          header: props => <PageHeader title="SETTINGS" />,
          animation: 'slide_from_right',
        }}
      />
    </UserStack.Navigator>
  );
}

export default UserNavigator;
