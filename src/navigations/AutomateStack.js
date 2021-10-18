import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { Icon } from '@ant-design/react-native';

import Routes from '../utils/Route';
import { screenOptions } from './utils';
import { useTranslations } from '../hooks/Common/useTranslations';
import { Colors, Theme } from '../configs';
import Automate from '../screens/Automate';
import MultiUnits from '../screens/Automate/MultiUnits';

const Stack = createStackNavigator();

const AutomateStack = memo(() => {
  const t = useTranslations();
  const navigation = useNavigation();

  const toggleDrawer = useCallback(() => {
    navigation.toggleDrawer();
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        headerShown: true,
        title: t('smart'),
        headerLeft: () => (
          <TouchableOpacity style={Theme.menuIcon} onPress={toggleDrawer}>
            <Icon name={'menu'} color={Colors.Black} />
          </TouchableOpacity>
        ),
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: Colors.Gray2,
        },
      }}
    >
      <Stack.Screen name={Routes.Automate} component={Automate} />
      <Stack.Screen
        name={Routes.MultiUnits}
        component={MultiUnits}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

export default AutomateStack;
