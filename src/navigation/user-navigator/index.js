import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from '../../components/Header';
import PageHeader from '../../components/PageHeader';

import UserScreen from '../../screens/UserScreen';
import StudentUserScreen from '../../screens/StudentUserScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';
import SettingsSceen from '../../screens/SettingsScreen';
import EventDescriptionScreen from '../../screens/EventDescriptionScreen';
import ClubDescriptionScreen from '../../screens/ClubDescriptionScreen';

import {useSelector} from 'react-redux';

const UserStack = createNativeStackNavigator();

function UserNavigator() {
  const isStudent = useSelector(state => state.logScreen.login.isStudent);
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="Users"
        component={isStudent ? StudentUserScreen : UserScreen}
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
      <UserStack.Screen
        name="ClubDescription"
        component={ClubDescriptionScreen}
        options={{
          headerShown: true,
          animation: 'slide_from_right',
          header: props => <Header props={props} />,
        }}
      />
      <UserStack.Screen
        name="EventDescription"
        component={EventDescriptionScreen}
        options={{
          headerShown: true,
          animation: 'slide_from_right',
          header: props => <Header props={props} />,
        }}
      />
    </UserStack.Navigator>
  );
}

export default UserNavigator;
