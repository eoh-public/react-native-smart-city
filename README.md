# react-native-smart-city

## Getting started

`$ npm install @eohjsc/react-native-smart-city --save`

### Mostly automatic installation

`$ react-native link @eohjsc/react-native-smart-city`

## Usage

Make sure that SmartCity
Example:

```javascript
import SmartCity, {
  AddSubUnitStack,
  EmergencyContactsStack,
  AddMemberStack,
  AddGatewayStack,
  AddDeviceStack,
  UnitStack,
  AddUnitStack,
  SharedStack,
  Explore,
} from '@eohjsc/react-native-smart-city';
import { createStackNavigator } from '@react-navigation/stack';

// TODO: What to do with the module?
const Stack = creatStackNavigation();

const YourStack = () => {
  // Declare yourAuthObject and params
  return (
    <SmartCity auth={yourAuthObject}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={'MainTab'}
            component={MainTab}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={'UnitStack'}
            component={UnitStack}
            initialParams={params}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={'AddGatewayStack'}
            component={AddGatewayStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={'AddDeviceStack'}
            component={AddDeviceStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={'AddMemberStack'}
            component={AddMemberStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={'AddSubUnitStack'}
            component={AddSubUnitStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={'EmergencyContactsStack'}
            component={EmergencyContactsStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SmartCity>
  );
};
const MainTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={'SharedStack'} component={SharedStack} />
      <Tab.Screen name={'Search'} component={Explore} />
    </Tab.Navigator>
  );
};
```
