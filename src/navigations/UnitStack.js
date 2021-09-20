import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslations } from '../hooks/Common/useTranslations';
import { Colors, Device } from '../configs';
import Route from '../utils/Route';
import ActivityLogScreen from '../screens/ActivityLog';

import AQIGuide from '../screens/AQIGuide';
import DeviceDetail from '../screens/Device/detail';
import SharingMemberList from '../screens/Sharing/MemberList';
import ManageSubUnit from '../screens/SubUnit/ManageSubUnit';
import SelectLocation from '../screens/Unit/SelectLocation';
import ManageUnit from '../screens/Unit/ManageUnit';
import MyAllUnit from '../screens/Unit/MyAllUnit';
import SubUnitDetail from '../screens/SubUnit/Detail';
import UnitDetail from '../screens/Unit/Detail';
import UnitSummary from '../screens/UnitSummary';
import UVIndexGuide from '../screens/UVIndexGuide';
import TDSGuide from '../screens/TDSGuide';
import WaterQualityGuide from '../screens/WaterQualityGuide';
import DeviceInfo from '../screens/DeviceInfo';
import AddNewOneTap from '../screens/AddNewOneTap';
import AddNewScriptAction from '../screens/AddNewScriptAction';
import PlaybackCamera from '../screens/PlayBackCamera';
import AllCamera from '../screens/AllCamera';
import ManageAccessScreen from '../screens/ManageAccess';
import GuestInfo from '../screens/GuestInfo';
import ScriptDetail from '../screens/ScriptDetail';
import EditActionsList from '../screens/EditActionsList';
import SelectDevice from '../screens/AddNewAction/SelectDevice';

import _ from 'lodash';

const Stack = createStackNavigator();

export const UnitStack = memo((props) => {
  const t = useTranslations();
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
        name={Route.UnitDetail}
        component={UnitDetail}
        initialParams={_.get(props, 'route.params', null)}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Route.MyAllUnit}
        component={MyAllUnit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Route.ManageUnit}
        component={ManageUnit}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Route.SelectLocation}
        component={SelectLocation}
        options={{
          headerShown: true,
          headerTitle: t('select_address'),
        }}
      />
      <Stack.Screen
        name={Route.UnitSummary}
        component={UnitSummary}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Route.SubUnitDetail}
        component={SubUnitDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          headerTitle: '',
        }}
        name={Route.ManageSubUnit}
        component={ManageSubUnit}
      />
      <Stack.Screen
        name={Route.DeviceDetail}
        component={DeviceDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Route.UVIndexGuide}
        component={UVIndexGuide}
        options={{
          title: t('UV Index Guide'),
        }}
      />
      <Stack.Screen
        name={Route.TDSGuide}
        component={TDSGuide}
        options={{
          title: t('tds_infomation'),
        }}
      />
      <Stack.Screen
        name={Route.AQIGuide}
        component={AQIGuide}
        options={{
          title: t('AQI Guide'),
        }}
      />
      <Stack.Screen
        name={Route.WaterQualityGuide}
        component={WaterQualityGuide}
        options={{
          title: t('water_quality_guide'),
        }}
      />
      <Stack.Screen
        name={Route.ActivityLog}
        component={ActivityLogScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Route.UnitMemberList}
        component={SharingMemberList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Route.DeviceInfo}
        component={DeviceInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Route.PlaybackCamera}
        component={PlaybackCamera}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Route.AllCamera}
        component={AllCamera}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Route.ManageAccess}
        component={ManageAccessScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Route.GuestInfo}
        component={GuestInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Route.AddNewOneTap}
        component={AddNewOneTap}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Route.ScriptDetail}
        component={ScriptDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Route.EditActionsList}
        component={EditActionsList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Route.AddNewScriptAction}
        component={AddNewScriptAction}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Route.SelectDevice}
        component={SelectDevice}
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
