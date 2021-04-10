import { createStackNavigator } from '@react-navigation/stack';
import React, { memo } from 'react';

import AddCommonSelectUnit from '../screens/AddCommon/SelectUnit';
import AddSubUnit from '../screens/SubUnit/AddSubUnit';
import Route from '../utils/Route';

const Stack = createStackNavigator();

export const AddSubUnitStack = memo(() => {
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
      <Stack.Screen name={Route.AddSubUnit} component={AddSubUnit} />
    </Stack.Navigator>
  );
});
