import { createStackNavigator } from '@react-navigation/stack';
import React, { memo } from 'react';

import AddCommonSelectUnit from '../screens/AddCommon/SelectUnit';
import SharingSelectPermission from '../screens/Sharing/SelectPermission';
import SharingInviteMembers from '../screens/Sharing/SelectUser';
import Route from '../utils/Route';

const Stack = createStackNavigator();

export const AddMemberStack = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={Route.AddCommonSelectUnit}
        component={AddCommonSelectUnit}
      />
      <Stack.Screen
        name={Route.SharingSelectPermission}
        component={SharingSelectPermission}
      />
      <Stack.Screen
        name={Route.SharingInviteMembers}
        component={SharingInviteMembers}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
});
