import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@ant-design/react-native';
import { t } from 'i18n-js';

import Shared from '../screens/SharedUnit';
import { Colors } from '../configs';
import Routes from '../utils/Route';

const Stack = createStackNavigator();
const SharedStack = memo(() => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Shared}
        component={Shared}
        options={{
          title: t('text_shared_with_me'),
          headerLeft: () => (
            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => navigation.toggleDrawer()}
            >
              <Icon name={'menu'} color={Colors.Black} />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: Colors.Gray2,
          },
        }}
      />
    </Stack.Navigator>
  );
});

export default SharedStack;

const styles = StyleSheet.create({
  btnMenu: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
});
