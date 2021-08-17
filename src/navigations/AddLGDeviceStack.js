import { createStackNavigator } from '@react-navigation/stack';
import React, { memo } from 'react';

import AddCommonSelectUnit from '../screens/AddCommon/SelectUnit';
import AddLGDevice from '../screens/SyncLGDevice/AddLGDevice';
import Routes from '../utils/Route';

const Stack = createStackNavigator();

export const AddLGDeviceStack = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={Routes.AddCommonSelectUnit}
        component={AddCommonSelectUnit}
      />
      <Stack.Screen name={Routes.AddLGDevice} component={AddLGDevice} />
    </Stack.Navigator>
  );
});
