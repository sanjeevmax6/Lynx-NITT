import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from '../../components/Header';

import UserScreen from '../../screens/UserScreen';
import StudentUserScreen from '../../screens/StudentUserScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';
import SettingsSceen from '../../screens/SettingsScreen';
import EventDescriptionScreen from '../../screens/EventDescriptionScreen';
import EventEditScreen from '../../screens/EventEditScreen';
import ClubDescriptionScreen from '../../screens/ClubDescriptionScreen';
import ImageZoomScreen from '../../screens/ImageZoomScreen';
import EditClubProfileScreen from '../../screens/EditProfileScreen_Club';
import * as color from '../../utils/colors';

import {USER_STORE} from '../../mobx/USER_STORE';
import {STUDENT} from '../../utils/USER_TYPE';
import FeedBackScreen from '../../screens/FeedbackScreen';

const UserStack = createNativeStackNavigator();

function UserNavigator() {
  const isStudent = USER_STORE.getUserType === STUDENT;
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
        component={isStudent ? EditProfileScreen : EditClubProfileScreen}
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
          header: props => <Header title="Settings" props={props} />,
          animation: 'slide_from_right',
        }}
      />
      <UserStack.Screen
        name="ClubDescription"
        component={ClubDescriptionScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
          header: props => <Header props={props} />,
        }}
      />
      <UserStack.Screen
        name="EventDescriptionScreen"
        component={EventDescriptionScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
          header: props => <Header props={props} />,
        }}
      />
      <UserStack.Screen
        name="EventEditScreen"
        component={EventEditScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
          header: props => <Header props={props} />,
        }}
      />
      <UserStack.Screen
        name="ImageScreen"
        children={ImageZoomScreen}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerTransparent: true,
          headerShadowVisible: false,
          title: '',
          headerTintColor: color.WHITE,
        }}
      />
      <UserStack.Screen
        name="FeedBackScreen"
        component={FeedBackScreen}
        options={{
          headerShown: false,
          animation: 'simple_push',
          header: props => <Header props={props} title="Feedback" />,
        }}
      />
    </UserStack.Navigator>
  );
}

export default UserNavigator;
