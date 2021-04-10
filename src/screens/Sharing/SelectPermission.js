import React, { memo, useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import { t } from 'i18n-js';

import { API, Colors } from '../../configs';
import ViewButtonBottom from '../../commons/ViewButtonBottom';
import StationDevicePermissions from '../../commons/Sharing/StationDevicePermissions';
import Text from '../../commons/Text';
import { axiosGet } from '../../utils/Apis/axios';
import Routes from '../../utils/Route';
import { TESTID } from '../../configs/Constants';

const SelectPermission = memo(({ route }) => {
  const { unit } = route.params;
  const navigation = useNavigation();
  const [dataStations, setDataStations] = useState([]);
  const [readPermissions, setReadPermissions] = useState([]);
  const [controlPermissions, setControlPermissions] = useState([]);

  useEffect(() => {
    (async () => {
      if (!unit) {
        return;
      }

      const { success, data } = await axiosGet(
        API.SHARE.UNIT_PERMISSIONS(unit.id)
      );
      if (success) {
        const stations = data.map((station) => ({
          name: station.name,
          sensors: station.sensors,
        }));
        setDataStations(stations);
      } else {
        setDataStations([]);
      }
    })();
  }, [unit]);

  const addReadConfigs = useCallback(
    (sensorId, values) => {
      const newPermission = { ...readPermissions };
      if (!values.length) {
        delete newPermission[sensorId];
      } else {
        newPermission[sensorId] = values;
      }
      setReadPermissions(newPermission);
    },
    [readPermissions]
  );

  const addActions = useCallback(
    (sensorId, values) => {
      const newPermission = { ...controlPermissions };
      if (!values.length) {
        delete newPermission[sensorId];
      } else {
        newPermission[sensorId] = values;
      }
      setControlPermissions(newPermission);
    },
    [controlPermissions]
  );

  const onSelectDevice = useCallback(
    (sensorId, readPermission, controlPermission) => {
      addReadConfigs(sensorId, readPermission);
      addActions(sensorId, controlPermission);
    },
    [addActions, addReadConfigs]
  );

  const onPressNext = useCallback(() => {
    navigation.navigate(Routes.SharingInviteMembers, {
      unit,
      permissions: { readPermissions, controlPermissions },
    });
  }, [navigation, readPermissions, controlPermissions, unit]);
  return (
    <SafeAreaView style={styles.container}>
      <Text semibold style={styles.title}>
        {t('select_devices')}
      </Text>
      <Text style={styles.subtitle}>{t('sharing_select_devices_hint')}</Text>
      <View style={styles.contentContainer}>
        {dataStations.length > 0 ? (
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {dataStations.map((station) => (
              <StationDevicePermissions
                dataStation={station}
                onselectSensor={onSelectDevice}
                testID={TESTID.STATION_DEVICE_PERMISSIONS}
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.textNodata} testID={TESTID.TEXT_NO_DATA_STATIONS}>
            {t('no_data')}
          </Text>
        )}
        <ViewButtonBottom
          testIDPrefix={TESTID.PREFIX.SHARING_SELECT_PERMISSION}
          leftTitle={t('cancel')}
          onLeftClick={() => navigation.goBack()}
          rightTitle={t('next')}
          rightDisabled={
            isEmpty(readPermissions) && isEmpty(controlPermissions)
          }
          onRightClick={onPressNext}
        />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Gray2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    width: '100%',
    flex: 1,
  },
  title: {
    color: Colors.Gray9,
    fontSize: 20,
    lineHeight: 28,
    marginTop: 8,
    marginBottom: 4,
    marginLeft: 16,
  },
  subtitle: {
    color: Colors.Gray8,
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 16,
    marginBottom: 16,
  },
  box: {
    paddingBottom: 16,
    borderRadius: 20,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
  },
  row: {
    flex: 1,
    paddingVertical: 16,
    borderBottomColor: Colors.Gray4,
    borderBottomWidth: 1,
    marginRight: 24,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
  },
  textNodata: {
    alignSelf: 'center',
  },
});

export default SelectPermission;
