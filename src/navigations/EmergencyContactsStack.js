import { IconOutline } from '@ant-design/icons-react-native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

import { Colors, Device } from '../configs';
import { EmergencyContactsAddNew } from '../screens/EmergencyContacts/EmergencyContactsAddNew';
import { EmergencyContactsList } from '../screens/EmergencyContacts/EmergencyContactsList';
import { EmergencyContactsSelectContacts } from '../screens/EmergencyContacts/EmergencyContactsSelectContacts';
import Route from '../utils/Route';

const Stack = createStackNavigator();

export const EmergencyContactsStack = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackImage: () => (
          <IconOutline
            name="left"
            size={27}
            color={Colors.Black}
            style={styles.icLeft}
          />
        ),
        headerStyle: {
          backgroundColor: Colors.White,
          elevation: 0,
          borderBottomWidth: Device.isIOS === 'android' ? 1 : 0,
          borderColor: Colors.Gray4,
        },
        headerBackTitle: true,
      }}
    >
      <Stack.Screen
        name={Route.EmergencyContactsList}
        component={EmergencyContactsList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Route.EmergencyContactsAddNew}
        component={EmergencyContactsAddNew}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Route.EmergencyContactsSelectContacts}
        component={EmergencyContactsSelectContacts}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

const styles = StyleSheet.create({
  icLeft: {
    marginLeft: Device.isIOS ? 8 : 0,
  },
});
