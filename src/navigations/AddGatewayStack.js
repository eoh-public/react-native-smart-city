import { createStackNavigator } from '@react-navigation/stack';
import React, { memo } from 'react';

import AddNewGateway from '../screens/AddNewGateway';
import ScanChipQR from '../screens/ScanChipQR';
import Route from '../utils/Route';
import ConnectedGateway from '../screens/AddNewGateway/ConnectedGateway';
import ConnectingGateway from '../screens/AddNewGateway/ConnectingGateway';
import SetupGatewayWifi from '../screens/AddNewGateway/SetupGatewayWifi';
import AddCommonSelectSubUnit from '../screens/AddCommon/SelectSubUnit';

const Stack = createStackNavigator();

export const AddGatewayStack = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={Route.SetupGatewayWifi}
        component={SetupGatewayWifi}
      />
      <Stack.Screen name={Route.AddNewGateway} component={AddNewGateway} />
      <Stack.Screen
        name={Route.AddCommonSelectSubUnit}
        component={AddCommonSelectSubUnit}
      />
      <Stack.Screen name={Route.ScanChipQR} component={ScanChipQR} />
      <Stack.Screen
        name={Route.ConnectingGateway}
        component={ConnectingGateway}
      />
      <Stack.Screen
        name={Route.ConnectedGateway}
        component={ConnectedGateway}
      />
    </Stack.Navigator>
  );
});
