import { createStackNavigator } from '@react-navigation/stack';
import React, { memo } from 'react';

import AddLocationMaps from '../screens/AddLocationMaps'; //containers/AddLocationMaps
import Route from '../utils/Route'; // utils/Route

const Stack = createStackNavigator();

export const AddUnitStack = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={Route.AddLocationMaps}
        component={AddLocationMaps}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
});
