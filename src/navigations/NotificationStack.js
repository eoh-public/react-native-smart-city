import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Routes from '../utils/Route';
import Notification from '../screens/Notification';
import { screenOptions } from './utils';

const Stack = createStackNavigator();

const NotificationStack = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.Notification} component={Notification} />
    </Stack.Navigator>
  );
});

export default NotificationStack;
