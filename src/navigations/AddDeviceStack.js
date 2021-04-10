import { createStackNavigator } from '@react-navigation/stack';
import React, { memo } from 'react';

import AddCommonSelectUnit from '../screens/AddCommon/SelectUnit';
import AddNewDevice from '../screens/AddNewDevice';
import ConnectDevices from '../screens/AddNewDevice/ConnectDevices';
import ConnectingDevices from '../screens/AddNewDevice/ConnectingDevices';
import ScanSensorQR from '../screens/ScanSensorQR';
import Route from '../utils/Route';

const Stack = createStackNavigator();

export const AddDeviceStack = memo(() => {
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
      <Stack.Screen name={Route.AddNewDevice} component={AddNewDevice} />
      <Stack.Screen name={Route.ScanSensorQR} component={ScanSensorQR} />
      <Stack.Screen
        name={Route.ConnectingDevices}
        component={ConnectingDevices}
      />
      <Stack.Screen name={Route.ConnectDevices} component={ConnectDevices} />
    </Stack.Navigator>
  );
});
