import { createStackNavigator } from '@react-navigation/stack';
import React, { memo } from 'react';

import SelectDevice from '../screens/AddNewAction/SelectDevice';
import Route from '../utils/Route';

const Stack = createStackNavigator();

export const AddNewActionStack = memo((props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={Route.SelectDevice}
        component={SelectDevice}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});
